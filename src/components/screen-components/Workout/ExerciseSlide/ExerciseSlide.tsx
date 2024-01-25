import { useEffect, useLayoutEffect, useRef, useState } from "react";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { StyledImage } from "@src/components/styled-components";
import { ActivityWithPhase } from "@src/context/ProgramsContext/types";
import { ResizeMode, Video } from "expo-av";
import slugify from "slugify";
import { Stack, Text, View, XStack, YStack } from "tamagui";

import AdjustWeightSheet from "../AdjustWeightSheet/AdjustWeightSheet";

import AdjustWeight from "./components/AdjustWeight";
import ExerciseMobilityProgressBar from "./components/ExerciseMobilityProgressBar";
import ExerciseRepProgressBar from "./components/ExerciseRepProgressBar";
import ExerciseTimerProgressBar from "./components/ExerciseTimerProgressBar";
import InstructionVideoButton from "./components/InstructionVideoButton";
import SetsCounter from "./components/SetsCounter";
import SlideIndicators from "./components/SlideIndicators";
import SoundButton from "./components/SoundButton";

interface ExerciseSlideProps {
    exercise: ActivityWithPhase;
    nextExercise: ActivityWithPhase;
    index: number;
    totalSlides: number;
    dayTitle: string;
    currentSlidePosition: number;
    onPrevPressed?: () => void;
    onNextPressed?: () => void;
}

// Okay, gotta be smart about this component. It's size could really affect the performance of
// Literally the most important function of the entire app...
const ExerciseSlide = ({
    exercise,
    nextExercise,
    index: currentIndex,
    currentSlidePosition,
    totalSlides,
    dayTitle,
    onNextPressed,
    onPrevPressed,
}: ExerciseSlideProps) => {
    const totalExerciseDuration =
        exercise.type === "timer" ? exercise.seconds_hold : 0;

    const [exercisePlaying, setExercisePlaying] = useState(false);
    const [queueExercisePlaying, setQueueExercisePlaying] = useState(false);
    const [exerciseReadyCount, setExerciseReadyCount] = useState(3);
    const [exerciseCompleted, setExerciseCompleted] = useState(false);
    const [windowSize, setWindowSize] = useState(Dimensions.get("window"));
    const [currentWeight, setCurrentWeight] = useState(5);
    const [showWeightAdjust, setShowWeightAdjust] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);

    const VideoRef = useRef<Video>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const isActiveSlide = indexIsActive(currentSlidePosition, currentIndex);

    useLayoutEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window }) => {
                return setWindowSize(window);
            },
        );

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        if (!isActiveSlide) {
            setExercisePlaying(false);
        }
    }, [isActiveSlide]);

    // Reset exercise completed state whenever playing state changes..
    useEffect(() => {
        if (!exercisePlaying) {
            return;
        }

        setExerciseCompleted(false);
    }, [exercisePlaying]);

    useEffect(() => {
        if (exercisePlaying || !queueExercisePlaying) {
            setExercisePlaying(false);
            setExerciseReadyCount(3);

            return;
        }

        const timer = setInterval(() => {
            setExerciseReadyCount((count) => (count <= 0 ? 0 : count - 1));
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [queueExercisePlaying]);

    useEffect(() => {
        if (exerciseReadyCount === 0) {
            return setExercisePlaying(true);
        }

        return;
    }, [exerciseReadyCount]);

    useEffect(() => {
        if (!exerciseCompleted) {
            return;
        }

        setExercisePlaying(false);
        setQueueExercisePlaying(false);

        return;
    }, [exerciseCompleted]);

    const isLandScape = windowSize.width > windowSize.height;

    if (!isActiveSlide) {
        return <View key={currentIndex}></View>;
    }

    const slugified_name = slugify(`${exercise.name}-${currentIndex}`, {
        lower: true,
    });

    return (
        <View
            key={slugified_name}
            pl="$20"
            pr={isLandScape ? "0%" : "$20"}
            flex={1}
            width={"100%"}
        >
            <YStack f={1}>
                {/* Exercise Header */}
                <XStack jc="space-between" ai={"center"}>
                    <View>
                        <Text fontSize={"$16"} fontFamily={"$body"}>
                            {dayTitle}
                        </Text>
                    </View>
                    <View pr={isLandScape ? "$15" : "0%"}>
                        {/* Parent block title tag. */}
                        {exercise.phase ? (
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
                                    {exercise.phase}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </XStack>
                <Stack mt="$10" jc="center" mb="$5">
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$24"}
                        textOverflow="ellipsis"
                        numberOfLines={1}
                    >
                        {!exercise.type ? `Rest` : exercise.name}
                    </Text>
                </Stack>
                {/* COLUMN WRAPPER, Detects Screen orientation. */}
                <View f={1} fd={isLandScape ? "row" : "column"}>
                    {/* Col 1 */}
                    <View f={isLandScape ? 1 : 0}>
                        {/* Video Container */}
                        <View
                            mt={isLandScape ? "0%" : "$10"}
                            height={isLandScape ? "100%" : 230}
                            position="relative"
                            animation={"slider"}
                            opacity={1}
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
                                    setQueueExercisePlaying(
                                        !queueExercisePlaying,
                                    );
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
                                    animation={"fast"}
                                    opacity={exercisePlaying ? 0 : 0.5}
                                />

                                {queueExercisePlaying ? (
                                    exerciseReadyCount ? (
                                        <View jc="center" ai="center">
                                            <Text
                                                fontFamily={"$heading"}
                                                fontSize={"$24"}
                                            >
                                                Ready?
                                            </Text>
                                            <Text
                                                fontFamily={"$heading"}
                                                fontSize={"$40"}
                                            >
                                                {exerciseReadyCount}
                                            </Text>
                                        </View>
                                    ) : null
                                ) : !exercisePlaying ? (
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
                                ref={VideoRef}
                                shouldPlay={exercisePlaying}
                                isLooping
                                resizeMode={ResizeMode.CONTAIN}
                                positionMillis={
                                    exerciseCompleted ? 0 : undefined
                                }
                                source={{
                                    uri: `https:${exercise.video}`,
                                }}
                                style={styles.ExerciseVideo}
                                isMuted={isVideoMuted}
                                onLoad={() => {
                                    setVideoLoaded(true);
                                }}
                            />
                        </View>
                    </View>

                    {/* Col 2 */}
                    <View f={1} px={isLandScape ? "$15" : undefined}>
                        {/* Details */}
                        <YStack mt={isLandScape ? "0%" : "$20"}>
                            <XStack>
                                <View>
                                    <InstructionVideoButton
                                        onPress={() => {
                                            setExercisePlaying(false);
                                            setQueueExercisePlaying(false);

                                            videoLoaded &&
                                                VideoRef.current?.presentFullscreenPlayer();
                                        }}
                                    />
                                </View>
                                <View ml={"$10"}>
                                    <SoundButton
                                        isMuted={isVideoMuted}
                                        onMuteStateChange={(state) => {
                                            setIsVideoMuted(state);
                                        }}
                                    />
                                </View>
                            </XStack>
                        </YStack>
                        {exercise.type ? (
                            <Stack
                                mt={isLandScape ? "$5" : "$10"}
                                py="$10"
                                flexDirection={isLandScape ? "row" : "column"}
                            >
                                <View
                                    f={isLandScape ? 1 : undefined}
                                    pr={
                                        isLandScape && exercise.type === "tempo"
                                            ? "$4"
                                            : "0%"
                                    }
                                >
                                    <SetsCounter
                                        isLandScape={isLandScape}
                                        totalSetCount={exercise.sets ?? 0}
                                        totalRepsCount={exercise.reps ?? 0}
                                        subBlockTitle={exercise.phase ?? ""}
                                    />
                                </View>
                                {exercise.type === "tempo" &&
                                exercise.include_weights ? (
                                    <View
                                        f={isLandScape ? 1 : undefined}
                                        mt={isLandScape ? "0%" : "$20"}
                                        pl={isLandScape ? "$4" : "0%"}
                                    >
                                        <AdjustWeight
                                            onPress={() => {
                                                setShowWeightAdjust(
                                                    !showWeightAdjust,
                                                );
                                            }}
                                            currentWeight={currentWeight}
                                            weightUnit="lbs"
                                        />
                                    </View>
                                ) : null}
                            </Stack>
                        ) : null}

                        {/* TIMERS */}
                        <View mt={isLandScape ? "$5" : "$15"}>
                            {exercise.type ? (
                                exercise.type === "timer" ? (
                                    <ExerciseTimerProgressBar
                                        duration={totalExerciseDuration}
                                        isPlaying={exercisePlaying}
                                        isLandscape={isLandScape}
                                        onTimerCompleted={() => {
                                            setExerciseCompleted(true);

                                            return;
                                        }}
                                    />
                                ) : exercise.type === "tempo" ? (
                                    <ExerciseRepProgressBar
                                        isPlaying={exercisePlaying}
                                        reps={exercise.reps ?? 0}
                                        isLandscape={isLandScape}
                                        seconds_up={exercise.seconds_up ?? 1}
                                        seconds_down={
                                            exercise.seconds_down ?? 1
                                        }
                                        seconds_hold={
                                            exercise.seconds_hold ?? 1
                                        }
                                        onRepsCompleted={() => {
                                            setExerciseCompleted(true);

                                            return;
                                        }}
                                    />
                                ) : exercise.type === "mobility" ? (
                                    <ExerciseMobilityProgressBar
                                        seconds_hold={
                                            exercise.seconds_hold ?? 1
                                        }
                                        seconds_release={
                                            exercise.seconds_release ?? 1
                                        }
                                        isPlaying={exercisePlaying}
                                        onTimerCompleted={() => {
                                            setExerciseCompleted(true);
                                            return;
                                        }}
                                        isLandscape={isLandScape}
                                    />
                                ) : null
                            ) : null}
                        </View>

                        <YStack mt="auto" py={"$10"}>
                            {/* Controls */}
                            <XStack justifyContent="space-between" mb={"$16"}>
                                {/* Prev */}
                                <View
                                    width={nextExercise?.type ? "$125" : "$80"}
                                    animation={"fast"}
                                    pressStyle={{
                                        opacity: 0.55,
                                        scale: 0.94,
                                    }}
                                    onPress={() => {
                                        setExercisePlaying(false);
                                        setQueueExercisePlaying(false);

                                        currentIndex > 0 &&
                                            onPrevPressed &&
                                            onPrevPressed();
                                    }}
                                >
                                    {currentIndex > 0 ? (
                                        <XStack mt="auto" alignItems="center">
                                            <View
                                                width={"$12"}
                                                height={"$12"}
                                                mr="$5"
                                            >
                                                <StyledImage
                                                    source={require("@assets/icon/arrow_back.png")}
                                                    style={
                                                        styles.indicatorIcons
                                                    }
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
                                        animation={"fast"}
                                        pressStyle={{
                                            opacity: 0.65,
                                            scale: 0.98,
                                        }}
                                        onPress={() => {
                                            setQueueExercisePlaying(
                                                !queueExercisePlaying,
                                            );
                                        }}
                                    >
                                        <View
                                            width="$36"
                                            height="$36"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            {exercisePlaying ||
                                            queueExercisePlaying ? (
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
                                    animation={"fast"}
                                    pressStyle={{
                                        opacity: 0.55,
                                        scale: 0.94,
                                    }}
                                    onPress={() => {
                                        setExercisePlaying(false);
                                        setQueueExercisePlaying(false);

                                        onNextPressed && onNextPressed();
                                    }}
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
                                                : nextExercise.type
                                                  ? nextExercise.name
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
                                                {!nextExercise
                                                    ? "Complete"
                                                    : "Next"}
                                            </Text>
                                            <View
                                                width={"$12"}
                                                height={"$12"}
                                                ml="$5"
                                            >
                                                <StyledImage
                                                    source={require("@assets/icon/arrow_forward.png")}
                                                    style={
                                                        styles.indicatorIcons
                                                    }
                                                />
                                            </View>
                                        </XStack>
                                    </View>
                                    {/* Thumbnail Holder */}
                                    {nextExercise?.type ? (
                                        <View
                                            w={"$40"}
                                            h={"$54"}
                                            ml={"$5"}
                                            mt="auto"
                                        >
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
                </View>
            </YStack>
            {/* <FullscreenVideoModal
                open={showFullscreenVideo}
                videoSource={require("@assets/programs/videos/db-rdl-stretch.mp4")}
                isLandScape={isLandScape}
                onClose={() => {
                    setShowFullscreenVideo(false);
                }}
            /> */}
            <AdjustWeightSheet
                open={showWeightAdjust}
                currentWeight={currentWeight}
                onOpenStateChange={(open) => {
                    setShowWeightAdjust(open);
                }}
                onWeightChange={(weight) => {
                    setCurrentWeight(weight);
                }}
            />
            {/* ---------------------------- */}
        </View>
    );
};

export function indexIsActive(currentIndex: number, myIndex: number) {
    return (
        currentIndex == myIndex ||
        currentIndex - 1 == myIndex ||
        currentIndex + 1 == myIndex
    );
}

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

export default React.memo(ExerciseSlide);
