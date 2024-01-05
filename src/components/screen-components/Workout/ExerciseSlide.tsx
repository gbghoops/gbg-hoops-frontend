import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
    Exercise,
    RestBlock,
} from "@src/components/screen-components/Programs/WorkoutDetails/RenderExerciseList/exercise-data";
import { StyledImage } from "@src/components/styled-components";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { ResizeMode, Video } from "expo-av";
import { Stack, Text, View, XStack, YStack } from "tamagui";

import ExerciseProgressBar from "./ExerciseProgressBar";
import SlideIndicators from "./SlideIndicators";

interface ExerciseSlideProps {
    exercise: Exercise | RestBlock;
    nextExercise: Exercise | RestBlock;
    index: number;
    totalSlides: number;
    currentSlidePositions: number[];
    onPrevPressed?: () => void;
    onNextPressed?: () => void;
}

const ExerciseSlide = ({
    exercise,
    nextExercise,
    index: currentIndex,
    currentSlidePositions,
    totalSlides,
    onNextPressed,
    onPrevPressed,
}: ExerciseSlideProps) => {
    const { width } = Dimensions.get("window");
    const [exercisePlaying, setExercisePlaying] = useState(false);

    const isNextSlide = currentIndex === currentSlidePositions[0] + 1;
    const isPrevSlide =
        currentIndex ===
        currentSlidePositions[currentSlidePositions.length - 1] - 1;

    const isVisible = currentSlidePositions.includes(currentIndex);

    useEffect(() => {
        if (!isVisible) {
            setExercisePlaying(false);
        }
    }, [isVisible]);

    return (
        <View key={exercise.block_id} px="$20" width={width} f={1}>
            <YStack>
                {/* Exercise Header */}
                <XStack jc="space-between" ai={"center"}>
                    <View>
                        <Text fontSize={"$16"} fontFamily={"$body"}>
                            Single Leg Stability: Hip Hinge
                        </Text>
                    </View>
                    <View>
                        {/* Parent block title tag. */}
                        {exercise.type === "exercise" &&
                        exercise.parentBlockTitle ? (
                            <View
                                width="auto"
                                backgroundColor="$gold_hot"
                                ai="center"
                                justifyContent="center"
                                p={"$4"}
                                pt={"$5"}
                            >
                                <Text
                                    fontFamily={"$acuminProBold"}
                                    textTransform="uppercase"
                                    color="$text_secondary"
                                    fontSize={"$12"}
                                >
                                    {exercise.parentBlockTitle}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </XStack>
                <Stack mt="$10" height={"$52"} jc="center">
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$24"}
                        textOverflow="ellipsis"
                    >
                        {exercise.type === "rest"
                            ? `Rest`
                            : exercise.exerciseName}
                    </Text>
                </Stack>
                {/* Video Container */}
                <View
                    mt="$10"
                    height={wn(230)}
                    position="relative"
                    animation={"slider"}
                    transform={
                        isNextSlide
                            ? [{ translateX: -wn(30) }]
                            : isPrevSlide
                              ? [{ translateX: wn(30) }]
                              : [{ translateX: 0 }]
                    }
                >
                    {/* Controls Mask */}
                    <View
                        position="absolute"
                        top={0}
                        left={0}
                        width={"100%"}
                        height={"100%"}
                        zIndex={1}
                        justifyContent="center"
                        alignItems="center"
                        onPress={() => {
                            setExercisePlaying(!exercisePlaying);
                        }}
                    >
                        {/* Mask */}
                        <View
                            position="absolute"
                            top={0}
                            left={0}
                            width={"100%"}
                            height={"100%"}
                            backgroundColor={"$surface_primary"}
                            animation={"medium"}
                            opacity={exercisePlaying ? 0 : 0.5}
                        />

                        {!exercisePlaying ? (
                            <Text
                                textTransform="uppercase"
                                fontFamily={"$heading"}
                                color={"$white"}
                                fontSize={"$24"}
                            >
                                Tap or press play to start
                            </Text>
                        ) : null}
                    </View>
                    <Video
                        shouldPlay={exercisePlaying}
                        isLooping
                        resizeMode={ResizeMode.COVER}
                        source={require("@assets/programs/videos/db-rdl-stretch.mp4")}
                        style={styles.ExerciseVideo}
                    />
                </View>
            </YStack>
            {/* ---------------------------- */}
            {/* Details */}
            <YStack mt="$20">
                <XStack>
                    <InstructionVideoButton />
                    <View ml={"$10"}>
                        <SoundButton />
                    </View>
                </XStack>
            </YStack>
            {exercise.type === "exercise" ? (
                <YStack mt="$10" py="$10">
                    <View>
                        <SetsCounter
                            totalSetCount={exercise.setsCount}
                            totalRepsCount={exercise.reps ?? 0}
                            subBlockTitle={exercise.subBlockTitle ?? ""}
                        />
                    </View>
                    {exercise.setsType === "reps" ? (
                        <View mt={"$20"}>
                            <AdjustWeight
                                onPress={() => {}}
                                currentWeight={5}
                                weightUnit="lbs"
                            />
                        </View>
                    ) : null}
                </YStack>
            ) : null}
            <View mt="$15">
                <ExerciseProgressBar
                    type="time"
                    duration={60}
                    currentProgress={10}
                />
            </View>

            <YStack mt="auto" py={"$10"}>
                {/* Controls */}
                <XStack justifyContent="space-between" mb={"$16"}>
                    {/* Prev */}
                    <View
                        width={
                            nextExercise?.type === "exercise" ? "$125" : "$80"
                        }
                        animation={"medium"}
                        pressStyle={{
                            opacity: 0.95,
                            scale: 0.98,
                        }}
                        onPress={onPrevPressed}
                    >
                        {currentIndex > 0 ? (
                            <XStack mt="auto" alignItems="center">
                                <View width={"$12"} height={"$12"} mr="$5">
                                    <StyledImage
                                        source={require("@assets/icon/arrow_back.png")}
                                        style={styles.indicatorIcons}
                                    />
                                </View>
                                <Text
                                    fontSize={"$16"}
                                    fontFamily={"$acuminProRegular"}
                                    color="$text_accent"
                                    mt={2}
                                >
                                    Back
                                </Text>
                            </XStack>
                        ) : null}
                    </View>
                    {/* Play / Pause */}
                    <View alignSelf="center" ml="auto" mr="auto">
                        <View
                            width={"$56"}
                            height={"$56"}
                            borderRadius={100}
                            backgroundColor={"$gold"}
                            justifyContent="center"
                            alignItems="center"
                            animation={"medium"}
                            pressStyle={{
                                opacity: 0.9,
                                scale: 0.98,
                            }}
                            onPress={() => {
                                setExercisePlaying(!exercisePlaying);
                            }}
                        >
                            <View
                                width="$36"
                                height="$36"
                                justifyContent="center"
                                alignItems="center"
                            >
                                {exercisePlaying ? (
                                    <StyledImage
                                        source={require("@assets/icon/pause.png")}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                ) : (
                                    <StyledImage
                                        source={require("@assets/icon/play.png")}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Next */}
                    <XStack
                        animation={"medium"}
                        pressStyle={{
                            opacity: 0.95,
                            scale: 0.98,
                        }}
                        onPress={onNextPressed}
                    >
                        <View
                            width={"$80"}
                            alignContent="flex-end"
                            justifyContent="flex-end"
                            alignSelf="flex-end"
                        >
                            <Text
                                textAlign="right"
                                fontFamily={"$acuminProSemibold"}
                                fontSize={"$14"}
                                textOverflow="ellipsis"
                                numberOfLines={3}
                            >
                                {!nextExercise
                                    ? "End of Workout"
                                    : nextExercise.type === "exercise"
                                      ? nextExercise.exerciseName
                                      : "Rest"}
                            </Text>
                            {/* Indicator */}
                            <XStack alignItems="center" ml="auto">
                                <Text
                                    fontSize={"$16"}
                                    fontFamily={"$acuminProRegular"}
                                    color="$text_accent"
                                    mt={2}
                                >
                                    {!nextExercise ? "Complete" : "Next"}
                                </Text>
                                <View width={"$12"} height={"$12"} ml="$5">
                                    <StyledImage
                                        source={require("@assets/icon/arrow_forward.png")}
                                        style={styles.indicatorIcons}
                                    />
                                </View>
                            </XStack>
                        </View>
                        {/* Thumbnail Holder */}
                        {nextExercise?.type === "exercise" ? (
                            <View w={"$40"} h={"$54"} ml={"$5"} mt="auto">
                                <StyledImage
                                    source={require("@assets/programs/next-exercise-thumbnail.png")}
                                    style={styles.tumbnail}
                                />
                            </View>
                        ) : null}
                    </XStack>
                </XStack>
                {/* Indicators */}
                <View>
                    <SlideIndicators
                        totalSlides={totalSlides}
                        currentSlideIndex={currentIndex}
                    />
                </View>
            </YStack>
        </View>
    );
};

interface SetsCounterProps {
    totalSetCount: number;
    totalRepsCount: number;
    subBlockTitle?: string;
}
const SetsCounter = ({
    totalRepsCount,
    totalSetCount,
    subBlockTitle,
}: SetsCounterProps) => {
    return (
        <View
            fd="row"
            px="$16"
            py="$8"
            jc="space-between"
            ai="center"
            h={"$40"}
            backgroundColor={"$surface_primary"}
        >
            <View f={1} flexDirection="row">
                <View px="$10">
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$20"}
                    >{`${totalSetCount} Set${
                        totalSetCount > 1 ? "s" : ""
                    }`}</Text>
                </View>
                {totalRepsCount ? (
                    <View
                        borderLeftWidth={0.5}
                        px={"$10"}
                        borderLeftColor={"$border_primary"}
                    >
                        <Text
                            fontFamily={"$heading"}
                            fontSize={"$20"}
                        >{`${totalRepsCount} Rep${
                            totalSetCount > 1 ? "s" : ""
                        }`}</Text>
                    </View>
                ) : null}
            </View>
            <View>
                {/* Parent block title tag. */}
                {subBlockTitle ? (
                    <View
                        width="auto"
                        backgroundColor="$gold"
                        ai="center"
                        justifyContent="center"
                        p={"$4"}
                        pt={"$5"}
                    >
                        <Text
                            fontFamily={"$acuminProBold"}
                            textTransform="uppercase"
                            color="$text_secondary"
                            fontSize={"$12"}
                        >
                            Superset
                        </Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

interface AdjustWeightProps {
    currentWeight: number;
    weightUnit: "kg" | "lbs";
    onPress: () => void;
}
const AdjustWeight = ({
    onPress,
    weightUnit = "lbs",
    currentWeight = 5,
}: AdjustWeightProps) => {
    return (
        <View
            fd="row"
            px="$16"
            py="$8"
            jc="space-between"
            ai="center"
            animation={"medium"}
            flexDirection="row"
            pressStyle={{
                opacity: 0.95,
                scale: 0.98,
            }}
            onPress={onPress}
            backgroundColor={"$surface_primary"}
        >
            <View>
                <Text
                    fontFamily={"$heading"}
                    fontSize={"$20"}
                >{`${currentWeight} ${weightUnit}`}</Text>
            </View>
            <View width={"$24"} height={"$24"}>
                <StyledImage
                    source={require("@assets/icon/edit.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>
        </View>
    );
};

const SoundButton = () => {
    return (
        <View
            borderWidth={1}
            borderColor="$gold"
            jc="center"
            ai={"center"}
            p={"$10"}
            animation={"medium"}
            pressStyle={{
                opacity: 0.95,
                scale: 0.98,
            }}
        >
            <View width={"$24"} height={"$24"}>
                <StyledImage
                    source={require("@assets/icon/sound.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>
        </View>
    );
};
const InstructionVideoButton = () => {
    return (
        <View
            fd="row"
            borderWidth={1}
            borderColor="$gold"
            p={"$10"}
            jc="center"
            ai={"center"}
            animation={"medium"}
            pressStyle={{
                opacity: 0.95,
                scale: 0.98,
            }}
        >
            <View width={"$24"} height={"$24"}>
                <StyledImage
                    source={require("@assets/icon/whistle.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>
            <Text
                textTransform="uppercase"
                fontFamily={"$heading"}
                fontSize={"$16"}
                ml="$10"
            >
                See Instructional Video
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    ExerciseVideo: {
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
    indicatorIcons: {
        width: "100%",
        height: "100%",
    },
    tumbnail: {
        width: "100%",
        height: "100%",
    },
});

export default ExerciseSlide;
