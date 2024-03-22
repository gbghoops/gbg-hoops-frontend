import { useRef, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import convertToProxyURL from "react-native-video-cache";
import InstructionVideoButton from "@src/components/screen-components/Workout/ExerciseSlide/components/InstructionVideoButton";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";
import { ResizeMode, Video } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { Text, View, YStack } from "tamagui";

const fetchExerciseDetails = async (exercise_id: string) => {
    const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL ?? "";
    try {
        const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
        const res = await fetch(
            `${backend_url}/content/exercise?id=${exercise_id}`,
            { method: "GET", headers: { Authorization: `Bearer ${idToken}` } },
        );

        if (!res.ok) {
            throw new Error("Failed to fetch exercise details");
        }

        const data = await res.json();
        return data.exercise;
    } catch (e) {
        throw new Error("Failed to fetch exercise details");
    }
};
export default function ExerciseDetails() {
    const { exercise_id } = useLocalSearchParams();
    const {
        data: Exercise,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["exercise-details", exercise_id],
        queryFn: () => fetchExerciseDetails(exercise_id as string),
    });

    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);

    const VideoRef = useRef<Video>(null);

    if (error) {
        return null;
    }

    return (
        <YStack f={1}>
            {isLoading ? (
                <View f={1} jc={"center"} ai="center" height={"100%"}>
                    <ActivityIndicator size="large" color={colors.gold} />
                </View>
            ) : (
                <View mx={"$20"}>
                    <Text fontFamily={"$heading"} fontSize={"$24"}>
                        {Exercise.name}
                    </Text>
                    <View mt="$10">
                        <View
                            height={wn(230)}
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

                                    setVideoPlaying(!videoPlaying);
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
                                    opacity={videoPlaying ? 0 : 0.5}
                                />

                                {!videoPlaying ? (
                                    <Text
                                        textTransform="uppercase"
                                        fontFamily={"$heading"}
                                        color={"$white"}
                                        fontSize={"$24"}
                                    >
                                        {!videoLoaded
                                            ? `Loading...`
                                            : `Tap or Press to Play`}
                                    </Text>
                                ) : null}
                            </View>
                            <Video
                                ref={VideoRef}
                                shouldPlay={videoPlaying}
                                isLooping
                                resizeMode={ResizeMode.COVER}
                                positionMillis={!videoPlaying ? 0 : undefined}
                                source={{
                                    uri: convertToProxyURL(
                                        `https:${Exercise.video}`,
                                    ),
                                }}
                                style={styles.ExerciseVideo}
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
                    </View>
                    <View mt="$10" height={"$40"} width={wn(220)}>
                        <InstructionVideoButton
                            onPress={() => {
                                setVideoPlaying(false);

                                videoLoaded &&
                                    VideoRef.current?.presentFullscreenPlayer();
                            }}
                        />
                    </View>
                </View>
            )}
        </YStack>
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
