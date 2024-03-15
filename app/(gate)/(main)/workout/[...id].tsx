import { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { useIsFocused } from "@react-navigation/native";
import PageError from "@src/components/screen-components/PageError/PageError";
import ConfirmWorkoutExit from "@src/components/screen-components/Workout/ConfirmWorkoutExit/ConfirmWorkoutExit";
import ReadyScreen from "@src/components/screen-components/Workout/ExerciseSlide/components/ReadyScreen";
import RotateDeviceModal from "@src/components/screen-components/Workout/ExerciseSlide/components/RotateDeviceModal";
import WorkoutCompleteLoading from "@src/components/screen-components/Workout/ExerciseSlide/components/WorkoutCompleteLoading";
import ExerciseSlide from "@src/components/screen-components/Workout/ExerciseSlide/ExerciseSlide";
import { WorkoutHeader } from "@src/components/stack-header/WorkoutScreenHeader";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import {
    ActivityWithPhase,
    CompletedExercisesData,
    ExerciseExecutionSide,
} from "@src/context/ProgramsContext/types";
import getProgramDayInfo from "@src/context/ProgramsContext/utils/getProgramDayInfo";
import {
    Stack as RouterStack,
    useLocalSearchParams,
    useRouter,
} from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { AnimatePresence, Stack } from "tamagui";

async function lockScreenOrientation() {
    await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
    );
}

async function unlockScreenOrientation() {
    await ScreenOrientation.unlockAsync();
}

export default function WorkoutScreen() {
    const [showReadyScreen, setShowReadyScreen] = useState(true);
    const [showRotateScreen, setShowRotateScreen] = useState(false);
    const [currentSlidePosition, setCurrentSlidePosition] = useState<number>(0);
    // Todo: Consider adding global workout pause state when this is true.
    const [showWorkoutExitConfirm, setShowWorkoutExitConfirm] = useState(false);
    const [completedExercises, setCompletedExercises] = useState<
        CompletedExercisesData[]
    >([]);
    const [backButtonPressed, setBackButtonPressed] = useState(false);

    const [confirmExitHeading, setConfirmExitHeading] = useState<string>("");
    const [confirmExitMessage, setConfirmExitMessage] = useState<string>("");
    const [isCompletingWorkout, setIsCompletingWorkout] = useState(false);

    const { programs, onWorkoutComplete, refetchPrograms } = usePrograms();
    const isFocused = useIsFocused();

    const { id } = useLocalSearchParams();

    const slideRef = useRef<PagerView>(null);

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setShowReadyScreen(false);
            setShowRotateScreen(true);
        }, 1000);
    }, []);

    useEffect(() => {
        if (!showReadyScreen) {
            setTimeout(() => {
                unlockScreenOrientation();
            }, 400);
        }
        return () => {
            lockScreenOrientation();
        };
    }, [showReadyScreen]);

    // Listen to changes in showRotateScreen state.

    useEffect(() => {
        if (showRotateScreen) {
            setTimeout(() => {
                setShowRotateScreen(false);
            }, 2000);
        }
    }, [showRotateScreen]);

    if (!id || id.length === 0) {
        return <PageError returnPath="/programs" />;
    }

    const programSlug = id[0];
    const activeWeek = Number(id[1]);
    const activeDay = Number(id[2]);

    const currentProgram = programs.find(
        (program) => program.slug === programSlug,
    );

    const isProgramLocked = currentProgram && "is_locked" in currentProgram;

    if (!currentProgram || isProgramLocked || !activeWeek || !activeDay) {
        return <PageError returnPath="/programs" />;
    }

    const weekData = currentProgram.weeks[activeWeek - 1];

    const isFinalWeek = !currentProgram.weeks[activeWeek];

    const dayInfo = getProgramDayInfo({ week: weekData, day: activeDay });

    if (!dayInfo || !dayInfo.dayData || !dayInfo.dayData.exercises) {
        return <PageError returnPath="/programs" />;
    }

    const dayData = dayInfo.dayData;

    const dayActivities = dayData.exercises.reduce<ActivityWithPhase[]>(
        (acc, exercise) => {
            if (!exercise.activities) {
                return acc;
            }

            const activities = exercise.activities.map((activity) => ({
                ...activity,
                phase: exercise.phase,
                execution_mode: exercise.type,
            }));

            return [...acc, ...activities];
        },
        [],
    );

    const flattenedActivities =
        flattenActivitiesBySetsAndLaterality(dayActivities);

    const activeExercises = flattenedActivities
        .filter((a) => a.type)
        .reduce((acc, activity) => {
            // remove duplicate exercises by contentful_id
            if (acc.find((a) => a.contentful_id === activity.contentful_id)) {
                return acc;
            }

            return [...acc, activity];
        }, [] as ActivityWithPhase[]);

    const onExerciseComplete = (
        completedExerciseData: CompletedExercisesData,
    ) => {
        return setCompletedExercises((prev) => {
            // remove exercise if already completed
            const completedWithoutCurrentExercises = prev.filter(
                (p) => p.exercise_id !== completedExerciseData.exercise_id,
            );

            return [...completedWithoutCurrentExercises, completedExerciseData];
        });
    };

    const performWorkoutComplete = async () => {
        const isLastDay = !getProgramDayInfo({
            week: weekData,
            day: activeDay + 1,
        })?.dayData;

        try {
            setIsCompletingWorkout(true);

            const weekCompleted = isLastDay
                ? !isFinalWeek
                    ? activeWeek
                    : 0
                : activeWeek - 1;

            const dayCompleted = !isLastDay ? activeDay : 0;

            const completed_at =
                isLastDay && isFinalWeek ? Date.now().toString() : undefined;

            await onWorkoutComplete({
                weekCompleted,
                dayCompleted,
                completed_at,
                exercisesCompleted: completedExercises,
                programId: currentProgram.contentful_id,
            });

            await refetchPrograms();
        } catch (e) {
            setConfirmExitHeading("Error");
            setConfirmExitMessage(
                `An error occurred while trying to complete the workout. Please try again.`,
            );

            return setShowWorkoutExitConfirm(true);
        } finally {
            setIsCompletingWorkout(false);
            setShowWorkoutExitConfirm(false);
        }
    };

    const handleWorkoutComplete = async () => {
        if (completedExercises.length < activeExercises.length) {
            setConfirmExitHeading("Workout Incomplete");
            setConfirmExitMessage(
                `Are you sure you want to exit? \nYou still have some exercises left to complete.`,
            );

            return setShowWorkoutExitConfirm(true);
        }

        return await performWorkoutComplete().then(() => {
            return router.replace("/programs");
        });
    };

    const confirmWorkoutExit = async (state: boolean) => {
        if (state) {
            if (!backButtonPressed) {
                // We're exiting the workout with incomplete exercises.
                return await performWorkoutComplete().then(() => {
                    setShowWorkoutExitConfirm(false);
                    return router.replace("/programs");
                });
            }

            setShowWorkoutExitConfirm(false);
            return router.canGoBack()
                ? router.back()
                : router.replace("/programs");
        }
    };

    return (
        <Stack
            f={1}
            jc="center"
            ai="center"
            position="relative"
            bg="$surface_background"
        >
            <RouterStack.Screen
                options={{
                    header: () => (
                        <WorkoutHeader
                            onBackPressed={() => {
                                setBackButtonPressed(true);
                                setShowWorkoutExitConfirm(true);
                            }}
                        />
                    ),
                    gestureEnabled: false,
                }}
            />
            <WorkoutCompleteLoading isVisible={isCompletingWorkout} />
            <AnimatePresence>
                {showReadyScreen ? (
                    <ReadyScreen key={"ready-screen"} />
                ) : (
                    <>
                        {/* Main */}
                        <RotateDeviceModal
                            key={"rotate-device-screen"}
                            isVisible={showRotateScreen}
                        />
                        <Stack f={1} width={"100%"}>
                            <PagerView
                                style={{ flex: 1 }}
                                scrollEnabled={true}
                                ref={slideRef}
                                initialPage={0}
                                offscreenPageLimit={1}
                                onPageScroll={(e) => {
                                    setCurrentSlidePosition(
                                        e.nativeEvent.position,
                                    );
                                }}
                            >
                                {isFocused &&
                                    flattenedActivities.map((item, index) => (
                                        <ExerciseSlide
                                            key={index}
                                            index={index}
                                            exercise={item}
                                            activeProgramDay={activeDay}
                                            activeProgramWeek={activeWeek}
                                            dayTitle={
                                                dayData.exercises[0].title
                                            }
                                            nextExercise={
                                                flattenedActivities[index + 1]
                                            }
                                            currentSlidePosition={
                                                currentSlidePosition
                                            }
                                            totalSlides={
                                                flattenedActivities.length
                                            }
                                            onExerciseCompleted={
                                                onExerciseComplete
                                            }
                                            onCompleteWorkout={
                                                handleWorkoutComplete
                                            }
                                            onPrevPressed={() => {
                                                if (index === 0) {
                                                    return;
                                                }

                                                setCurrentSlidePosition(
                                                    currentSlidePosition - 1,
                                                );

                                                slideRef.current?.setPage(
                                                    index - 1,
                                                );
                                            }}
                                            onNextPressed={() => {
                                                const isLastSlide =
                                                    index + 1 ===
                                                    flattenedActivities.length;

                                                // todo: add logic to handle last slide.
                                                if (isLastSlide) {
                                                    return;
                                                }
                                                setCurrentSlidePosition(
                                                    currentSlidePosition + 1,
                                                );

                                                slideRef.current?.setPage(
                                                    index + 1,
                                                );
                                            }}
                                        />
                                    ))}
                            </PagerView>
                        </Stack>
                        <ConfirmWorkoutExit
                            confirmExit={confirmWorkoutExit}
                            messageHeading={confirmExitHeading}
                            message={confirmExitMessage}
                            open={showWorkoutExitConfirm}
                            onOpenStateChange={(isOpen) => {
                                if (!isOpen) {
                                    setConfirmExitHeading("");
                                    setConfirmExitMessage("");
                                    setBackButtonPressed(false);
                                }

                                setShowWorkoutExitConfirm(isOpen);
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
        </Stack>
    );
}

const flattenActivitiesBySetsAndLaterality = (
    activities: ActivityWithPhase[],
) => {
    if (!activities.length) return [];

    const bySet = activities.reduce<ActivityWithPhase[]>((acc, item) => {
        if (item.sets > 1) {
            const sets = Array.from({ length: item.sets }, (_, index) => ({
                ...item,
                name: `${item.name} - Set ${index + 1}`,
                sets: 1,
            }));
            return acc.concat(sets);
        }
        return acc.concat(item);
    }, []);

    const res = bySet.reduce<ActivityWithPhase[]>((acc, item) => {
        if (item.uni_lateral) {
            const sets = ["left", "right"].map((side) => ({
                ...item,
                name: `${item.name}`,
                execution_side: side as ExerciseExecutionSide,
                uni_lateral: false,
            }));

            return acc.concat(sets);
        }
        return acc.concat(item);
    }, []);

    return res;
};
