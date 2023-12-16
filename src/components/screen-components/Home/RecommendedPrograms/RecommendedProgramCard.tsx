import { useEffect, useRef } from "react";
import { ImageURISource } from "react-native";
import { AVPlaybackSource, ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

export interface RecommendedProgramCardProps {
    id: number;
    renderIndex?: number;
    poster: ImageURISource;
    video: AVPlaybackSource;
    programTitle: string;
    isVisible?: boolean;
    isLastItem?: boolean;
}

const RecommendedProgramCard = (props: RecommendedProgramCardProps) => {
    const { poster, video, programTitle, isLastItem, isVisible } = props;
    const programVideo = useRef<Video>(null);

    const router = useRouter();

    useEffect(() => {
        if (isVisible) {
            programVideo.current?.playAsync();
        } else {
            programVideo.current?.stopAsync();
        }
    }, [isVisible]);
    return (
        <View
            pl="$20"
            pr={isLastItem ? "$20" : null}
            animation={"medium"}
            pressStyle={{
                opacity: 0.85,
                scale: 0.995,
            }}
            onPress={() => {
                router.push(
                    "/program/workout-details/basketball-strength-level-1",
                );
            }}
        >
            {/* Image */}
            <View width="$220" height="$220" position="relative">
                <View f={1}>
                    <Video
                        ref={programVideo}
                        isMuted
                        source={video}
                        usePoster={true}
                        posterSource={poster}
                        posterStyle={{
                            width: "100%",
                            height: "100%",
                        }}
                        resizeMode={ResizeMode.COVER}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </View>
            </View>
            <View mt="$10">
                <Text color={"$gold"} fontFamily={"$heading"} fontSize="$16">
                    {programTitle}
                </Text>
            </View>
        </View>
    );
};

export default RecommendedProgramCard;
