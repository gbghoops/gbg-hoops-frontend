import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { StyledImage } from "@src/components/styled-components";
import {
    ActivityWithPhase,
    CompletedExercisesData,
} from "@src/context/ProgramsContext/types";
import { colors } from "@src/styles/theme/colors";
import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS,
    ResizeMode,
    Video,
} from "expo-av";
import slugify from "slugify";
import { Stack, Text, View, XStack, YStack } from "tamagui";

import AdjustWeightSheet from "../AdjustWeightSheet/AdjustWeightSheet";

import AdjustWeight from "./components/AdjustWeight";
import ExerciseMobilityProgressBar from "./components/ExerciseMobilityProgressBar";
import ExerciseRepProgressBar from "./components/ExerciseRepProgressBar";
import ExerciseTimerProgressBar from "./components/ExerciseTimerProgressBar";
import InstructionVideoButton from "./components/InstructionVideoButton";
import NoTimerProgressIndicator from "./components/NoTimerProgressIndicator";
import SetsCounter from "./components/SetsCounter";
import SlideIndicators from "./components/SlideIndicators";
import SoundButton from "./components/SoundButton";

interface ExerciseSlideProps {
    exercise: ActivityWithPhase;
    nextExercise: ActivityWithPhase;
    index: number;
    totalSlides: number;
    dayTitle: string;
    activeProgramDay: number;
    activeProgramWeek: number;
    currentSlidePosition: number;
    onExerciseCompleted: (exercise: CompletedExercisesData) => void;
    onPrevPressed?: () => void;
    onNextPressed?: () => void;
    onCompleteWorkout: () => Promise<void>;
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
    onExerciseCompleted,
    onCompleteWorkout,
    onNextPressed,
    onPrevPressed,
    activeProgramDay,
    activeProgramWeek,
}: ExerciseSlideProps) => {
    const totalExerciseDuration =
        exercise.type === "timer" ? exercise.seconds_hold : 0;

    const isRestSlide = !exercise.type;

    const isCurrentSlide = currentSlidePosition === currentIndex;

    const [exercisePlaying, setExercisePlaying] = useState(false);
    const [queueExercisePlaying, setQueueExercisePlaying] = useState(false);
    const [exerciseReadyCount, setExerciseReadyCount] = useState(1);
    const [exerciseCompleted, setExerciseCompleted] = useState(false);
    const [windowSize, setWindowSize] = useState(Dimensions.get("window"));
    const [currentWeight, setCurrentWeight] = useState(5);
    const [showWeightAdjust, setShowWeightAdjust] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [restTimer] = useState(30); // <-- Time in seconds.

    const VideoRef = useRef<Video>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    // This is very important. We need to load only a few ExerciseSlides at a time to save device memory.
    const isActiveSlide = indexIsActive(currentSlidePosition, currentIndex);

    useLayoutEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window }) => {
                return setWindowSize(window);
            },
        );

        if (isRestSlide) {
            setExercisePlaying(true);
        }

        return () => subscription.remove();
    }, []);

    const completeExercisePayload = useMemo<CompletedExercisesData>(() => {
        return {
            exercise_id: exercise.contentful_id,
            weight: exercise.include_weights ? currentWeight : 0,
            week: activeProgramWeek ?? 1,
            day: activeProgramDay ?? 2,
        };
    }, [currentWeight]);

    useEffect(() => {
        if (exercisePlaying && exercise.type === "no_timer") {
            setExerciseCompleted(true);
        }
    }, [exercisePlaying]);

    useEffect(() => {
        if (!isRestSlide) {
            setExercisePlaying(false);
            setQueueExercisePlaying(false);
        }
    }, [isCurrentSlide]);

    useEffect(() => {
        if (!isActiveSlide) {
            setExercisePlaying(false);
        }
    }, [isActiveSlide]);

    // Reset exercise completed state whenever playing state changes..
    useEffect(() => {
        if (!exercisePlaying) {
            Audio.setAudioModeAsync({
                interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
            });
            return;
        }

        Audio.setAudioModeAsync({
            interruptionModeIOS: InterruptionModeIOS.DuckOthers,
            interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        });

        setExerciseCompleted(false);
    }, [exercisePlaying]);

    useEffect(() => {
        if (exercisePlaying || !queueExercisePlaying) {
            setExercisePlaying(false);
            setExerciseReadyCount(isRestSlide ? 0 : 1);

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

        if (exercise.type !== "no_timer") {
            // setExercisePlaying(false);
            setQueueExercisePlaying(false);
        }
        return (
            onExerciseCompleted && onExerciseCompleted(completeExercisePayload)
        );
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
                        {isRestSlide ? `Rest` : exercise.name}
                    </Text>
                </Stack>
                {/* COLUMN WRAPPER, Detects Screen orientation. */}
                <View f={1} fd={isLandScape ? "row" : "column"}>
                    {/* Col 1 */}
                    <View f={isLandScape ? 1.75 : 0}>
                        {/* Video Container */}
                        {isRestSlide ? (
                            <View
                                mt={isLandScape ? "0%" : "$10"}
                                height={isLandScape ? "100%" : 230}
                                position="relative"
                            >
                                <View
                                    f={1}
                                    jc="center"
                                    ai="center"
                                    backgroundColor={"$surface_accent"}
                                >
                                    <Text
                                        color="$black"
                                        fontSize={"$24"}
                                        textTransform="uppercase"
                                        fontFamily={"$heading"}
                                    >
                                        AD Space
                                    </Text>
                                </View>
                            </View>
                        ) : (
                            <View
                                mt={isLandScape ? "0%" : "$10"}
                                height={isLandScape ? "100%" : 230}
                                position="relative"
                                animation={"slider"}
                                opacity={1}
                                backgroundColor={"$surface_primary"}
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
                                        if (!videoLoaded) return;

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
                                            {!videoLoaded
                                                ? `Loading...`
                                                : `Tap or press play to start`}
                                        </Text>
                                    ) : null}
                                </View>
                                <Video
                                    ref={VideoRef}
                                    shouldPlay={exercisePlaying}
                                    isLooping
                                    resizeMode={ResizeMode.COVER}
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
                                >
                                    <View
                                        w="100%"
                                        h="100%"
                                        jc="center"
                                        ai="center"
                                        backgroundColor="$surface_primary"
                                    >
                                        <ActivityIndicator
                                            size="small"
                                            color={colors.gold}
                                        />
                                    </View>
                                </Video>
                            </View>
                        )}
                    </View>

                    {/* Col 2 */}
                    <View
                        f={1}
                        px={isLandScape ? "$15" : undefined}
                        maxWidth={isLandScape ? "$350" : "auto"}
                    >
                        {/* Details */}
                        {!isRestSlide ? (
                            <YStack w={"100%"} mt={isLandScape ? "0%" : "$20"}>
                                <XStack
                                    justifyContent={
                                        isLandScape
                                            ? "space-between"
                                            : "flex-start"
                                    }
                                >
                                    <View f={isLandScape ? 1 : 0}>
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
                        ) : null}

                        {!isRestSlide ? (
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
                                        subBlockTitle={
                                            exercise.execution_mode ?? ""
                                        }
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
                        <View
                            mt={
                                isLandScape
                                    ? isRestSlide
                                        ? "0%"
                                        : "$5"
                                    : "$15"
                            }
                        >
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
                                ) : exercise.type === "no_timer" ? (
                                    <NoTimerProgressIndicator
                                        isPlaying={exercisePlaying}
                                        isLandscape={isLandScape}
                                        onMarkCompleted={() => {
                                            setExerciseCompleted(true);
                                        }}
                                    />
                                ) : null
                            ) : (
                                <View mt={isLandScape ? "0%" : "$5"}>
                                    <ExerciseTimerProgressBar
                                        duration={restTimer}
                                        isPlaying={exercisePlaying}
                                        isLandscape={isLandScape}
                                        onTimerCompleted={() => {
                                            setExerciseCompleted(true);
                                            return (
                                                onNextPressed && onNextPressed()
                                            );
                                        }}
                                    />
                                    {nextExercise ? (
                                        <View
                                            mt={isLandScape ? "$10" : "$20"}
                                            p={isLandScape ? "$10" : "$20"}
                                            backgroundColor={"$surface_primary"}
                                            justifyContent={
                                                isLandScape
                                                    ? "flex-start"
                                                    : "center"
                                            }
                                            alignItems="center"
                                            flexDirection={
                                                isLandScape ? "row" : "column"
                                            }
                                        >
                                            <View
                                                w={"$90"}
                                                h={"$90"}
                                                mt="auto"
                                                backgroundColor={
                                                    "$surface_background"
                                                }
                                            >
                                                <StyledImage
                                                    source={{
                                                        uri: `https:${nextExercise?.thumbnail}`,
                                                    }}
                                                    style={styles.tumbnail}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                            <View
                                                mt={isLandScape ? "0%" : "$10"}
                                                ml={isLandScape ? "$10" : "0%"}
                                                justifyContent={
                                                    isLandScape
                                                        ? "flex-start"
                                                        : "center"
                                                }
                                                alignItems={
                                                    isLandScape
                                                        ? "flex-start"
                                                        : "center"
                                                }
                                            >
                                                <Text
                                                    fontFamily={"$heading"}
                                                    fontSize={"$20"}
                                                >
                                                    Get Ready for the Next
                                                    Exercise
                                                </Text>
                                                <Text
                                                    fontFamily={"$heading"}
                                                    fontSize={"$14"}
                                                    mt={"$5"}
                                                >
                                                    {`(${nextExercise?.name})`}
                                                </Text>
                                            </View>
                                        </View>
                                    ) : null}
                                </View>
                            )}
                        </View>

                        <YStack mt="auto" py={"$10"}>
                            {/* Controls */}
                            <XStack justifyContent="space-between" mb={"$16"}>
                                {/* Prev */}
                                <View
                                    width={
                                        nextExercise?.type
                                            ? isLandScape
                                                ? "$105"
                                                : "$125"
                                            : isLandScape
                                              ? "$60"
                                              : "$80"
                                    }
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
                                <View alignSelf="flex-end" ml="auto" mr="auto">
                                    <View
                                        width={isLandScape ? "$40" : "$56"}
                                        height={isLandScape ? "$40" : "$56"}
                                        borderRadius={100}
                                        backgroundColor={"$gold"}
                                        justifyContent="center"
                                        alignItems="center"
                                        animation={"fast"}
                                        pressStyle={{
                                            opacity: 0.65,
                                            scale: 0.98,
                                        }}
                                        opacity={videoLoaded ? 1 : 0.5}
                                        onPress={() => {
                                            if (!videoLoaded) return;

                                            isRestSlide
                                                ? setExercisePlaying(
                                                      !exercisePlaying,
                                                  )
                                                : setQueueExercisePlaying(
                                                      !queueExercisePlaying,
                                                  );
                                        }}
                                    >
                                        <View
                                            width={isLandScape ? "$24" : "$36"}
                                            height={isLandScape ? "$24" : "$36"}
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            {exercisePlaying ||
                                            queueExercisePlaying ? (
                                                <StyledImage
                                                    source={require("@assets/icon/pause.png")}
                                                    style={styles.styledImage}
                                                />
                                            ) : (
                                                <StyledImage
                                                    source={require("@assets/icon/play.png")}
                                                    style={styles.styledImage}
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
                                        if (!nextExercise) {
                                            return (
                                                onCompleteWorkout &&
                                                onCompleteWorkout()
                                            );
                                        }

                                        return onNextPressed && onNextPressed();
                                    }}
                                >
                                    <View
                                        width={isLandScape ? "$60" : "$80"}
                                        alignContent="flex-end"
                                        justifyContent="flex-end"
                                        alignSelf="flex-end"
                                    >
                                        <Text
                                            textAlign="right"
                                            fontFamily={"$acuminProSemibold"}
                                            fontSize="$14"
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
                                                width={
                                                    isLandScape ? "$8" : "$12"
                                                }
                                                height={
                                                    isLandScape ? "$8" : "$12"
                                                }
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
                                            backgroundColor={"$surface_primary"}
                                        >
                                            <StyledImage
                                                source={{
                                                    uri: `https:${nextExercise?.thumbnail}`,
                                                }}
                                                style={styles.tumbnail}
                                                resizeMode="cover"
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
    styledImage: {
        width: "100%",
        height: "100%",
    },
});

export default React.memo(ExerciseSlide);
