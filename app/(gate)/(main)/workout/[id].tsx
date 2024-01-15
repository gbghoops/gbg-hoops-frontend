import { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import DemoExerciseData, {
    Exercise,
    ExerciseData,
    RestBlock,
} from "@src/components/screen-components/Programs/WorkoutDetails/RenderExerciseList/exercise-data";
import ConfirmWorkoutExit from "@src/components/screen-components/Workout/ConfirmWorkoutExit/ConfirmWorkoutExit";
import ReadyScreen from "@src/components/screen-components/Workout/ExerciseSlide/components/ReadyScreen";
import RotateDeviceModal from "@src/components/screen-components/Workout/ExerciseSlide/components/RotateDeviceModal";
import ExerciseSlide from "@src/components/screen-components/Workout/ExerciseSlide/ExerciseSlide";
import { WorkoutHeader } from "@src/components/stack-header/WorkoutScreenHeader";
import { Stack as RouterStack, useRouter } from "expo-router";
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
    const [currentSlidePosition, setCurrentSlidePosition] = useState<number[]>([
        0,
    ]);
    // Todo: Consider adding global workout pause state when this is true.
    const [showWorkoutExitConfirm, setShowWorkoutExitConfirm] = useState(false);
    const [workoutExitConfirmed, setWorkoutExitConfirmed] = useState(false);

    const slideRef = useRef<PagerView>(null);

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setShowReadyScreen(false);
            setShowRotateScreen(true);
        }, 3000);
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

    const flattenedExerciseData = flattenExerciseData(DemoExerciseData);
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
                }}
            />
            <AnimatePresence>
                {showReadyScreen ? <ReadyScreen key={"ready-screen"} /> : null}

                <RotateDeviceModal
                    key={"rotate-device-screen"}
                    isVisible={showRotateScreen}
                />
            </AnimatePresence>
            {/* Main */}
            <Stack f={1} width={"100%"}>
                <PagerView
                    style={{ flex: 1 }}
                    scrollEnabled={false}
                    ref={slideRef}
                >
                    {flattenedExerciseData.map((item, index) => (
                        <ExerciseSlide
                            key={index}
                            index={index}
                            exercise={item}
                            nextExercise={flattenedExerciseData[index + 1]}
                            currentSlidePositions={currentSlidePosition}
                            totalSlides={flattenedExerciseData.length}
                            onPrevPressed={() => {
                                setCurrentSlidePosition([index - 1]);
                                slideRef.current?.setPage(index - 1);
                            }}
                            onNextPressed={() => {
                                const isLastSlide =
                                    index + 1 === flattenedExerciseData.length;

                                // todo: add logic to handle last slide.
                                if (isLastSlide) {
                                    return;
                                }
                                setCurrentSlidePosition([index + 1]);
                                slideRef.current?.setPage(index + 1);
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
        </Stack>
    );
}

const flattenExerciseData = (
    data: ExerciseData[],
): (Exercise | RestBlock)[] => {
    const exerciseData = data.map((exerciseData) => {
        return exerciseData.subBlock.map((subBlock) => {
            return subBlock.exercises.map((exercise) => {
                return exercise;
            });
        });
    });

    const flattenedExerciseData = exerciseData.flat(2);

    return flattenedExerciseData;
};
