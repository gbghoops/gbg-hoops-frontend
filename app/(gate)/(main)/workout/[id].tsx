import { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { FlashList } from "@shopify/flash-list";
import DemoExerciseData, {
    Exercise,
    ExerciseData,
    RestBlock,
} from "@src/components/screen-components/Programs/WorkoutDetails/RenderExerciseList/exercise-data";
import ExerciseSlide from "@src/components/screen-components/Workout/ExerciseSlide";
import ReadyScreen from "@src/components/screen-components/Workout/ReadyScreen";
import RotateDeviceModal from "@src/components/screen-components/Workout/RotateDeviceModal";
import { WorkoutHeader } from "@src/components/stack-header/WorkoutScreenHeader";
import { Stack as RouterStack } from "expo-router";
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

    const slideRef = useRef<FlashList<Exercise | RestBlock>>(null);

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
                    header: () => <WorkoutHeader />,
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
                <PagerView style={{ flex: 1 }}>
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
                                slideRef.current?.scrollToIndex({
                                    index: index - 1,
                                    animated: true,
                                });
                            }}
                            onNextPressed={() => {
                                const isLastSlide =
                                    index + 1 === flattenedExerciseData.length;

                                // todo: add logic to handle last slide.
                                if (isLastSlide) {
                                    return;
                                }

                                setCurrentSlidePosition([index + 1]);
                                slideRef.current?.scrollToIndex({
                                    index: index + 1,
                                    animated: true,
                                });
                            }}
                        />
                    ))}
                </PagerView>
            </Stack>
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
