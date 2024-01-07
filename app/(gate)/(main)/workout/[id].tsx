import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Stack as RouterStack } from "expo-router";
import { AnimatePresence, Stack } from "tamagui";

export default function WorkoutScreen() {
    const [showReadyScreen, setShowReadyScreen] = useState(true);
    const [showRotateScreen, setShowRotateScreen] = useState(false);
    const [currentSlidePosition, setCurrentSlidePosition] = useState<number[]>([
        0,
    ]);
    const { width } = Dimensions.get("window");
    const { bottom } = useSafeAreaInsets();
    const slideRef = useRef<FlashList<Exercise | RestBlock>>(null);

    useEffect(() => {
        setTimeout(() => {
            setShowReadyScreen(false);
            setShowRotateScreen(true);
        }, 3000);
    }, []);

    useEffect(() => {
        if (showRotateScreen) {
            setTimeout(() => {
                setShowRotateScreen(false);
            }, 3000);
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
            pb={bottom + wn(20)}
        >
            <RouterStack.Screen
                options={{
                    header: () => <WorkoutHeader />,
                }}
            />
            <AnimatePresence>
                {showReadyScreen ? <ReadyScreen key={"ready-screen"} /> : null}
                {showRotateScreen ? (
                    <RotateDeviceModal
                        key={"rotate-device-screen"}
                        isVisible={showRotateScreen}
                    />
                ) : null}
            </AnimatePresence>
            {/* Main */}
            <Stack f={1}>
                <FlashList
                    ref={slideRef}
                    estimatedItemSize={width}
                    keyExtractor={(item, index) => index.toString()}
                    data={flattenedExerciseData}
                    horizontal
                    scrollEnabled={false}
                    snapToAlignment="start"
                    snapToInterval={width}
                    decelerationRate={"normal"}
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 40,
                        minimumViewTime: 10,
                    }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
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
                    )}
                />
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
