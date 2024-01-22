import { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { useIsFocused } from "@react-navigation/native";
import ConfirmWorkoutExit from "@src/components/screen-components/Workout/ConfirmWorkoutExit/ConfirmWorkoutExit";
import ReadyScreen from "@src/components/screen-components/Workout/ExerciseSlide/components/ReadyScreen";
import RotateDeviceModal from "@src/components/screen-components/Workout/ExerciseSlide/components/RotateDeviceModal";
import ExerciseSlide from "@src/components/screen-components/Workout/ExerciseSlide/ExerciseSlide";
import { WorkoutHeader } from "@src/components/stack-header/WorkoutScreenHeader";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { ActivityWithPhase } from "@src/context/ProgramsContext/types";
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
    const [workoutExitConfirmed, setWorkoutExitConfirmed] = useState(false);
    const { programs } = usePrograms();
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

    useEffect(() => {
        if (workoutExitConfirmed) {
            router.canGoBack() ? router.back() : router.replace("/home");
        }
    }, [workoutExitConfirmed]);

    if (!id || id.length === 0) {
        return null;
    }

    const programSlug = id[0];
    const activeWeek = Number(id[1]);
    const activeDay = Number(id[2]);

    const currentProgram = programs.find(
        (program) => program.slug === programSlug,
    );

    if (!currentProgram || !activeWeek || !activeDay) {
        return null;
    }

    const weekData = currentProgram?.weeks[activeWeek - 1];

    const { dayData } = getProgramDayInfo({ week: weekData, day: activeDay });

    const dayActivities = dayData.exercises.reduce<ActivityWithPhase[]>(
        (acc, exercise) =>
            exercise.activities
                .map((activity) => ({ ...activity, phase: exercise.phase }))
                .concat(acc),
        [],
    );

    const flattenedActivities = flattenActivitiesBySet(dayActivities);

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
                                setShowWorkoutExitConfirm(true);
                            }}
                        />
                    ),
                    gestureEnabled: false,
                }}
            />
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
                                scrollEnabled={false}
                                ref={slideRef}
                                initialPage={0}
                                offscreenPageLimit={1}
                            >
                                {isFocused &&
                                    flattenedActivities.map((item, index) => (
                                        <ExerciseSlide
                                            key={index}
                                            index={index}
                                            exercise={item}
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
                            confirmExit={(state) => {
                                setWorkoutExitConfirmed(state);
                            }}
                            open={showWorkoutExitConfirm}
                            onOpenStateChange={(isOpen) => {
                                setShowWorkoutExitConfirm(isOpen);
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
        </Stack>
    );
}

const flattenActivitiesBySet = (activities: ActivityWithPhase[]) => {
    const res = activities.reduce<ActivityWithPhase[]>((acc, item) => {
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

    return res;
};
