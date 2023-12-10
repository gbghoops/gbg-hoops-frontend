import { useEffect, useRef } from "react";
import { ImageURISource } from "react-native";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { AVPlaybackSource, ResizeMode, Video } from "expo-av";
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

    useEffect(() => {
        if (isVisible) {
            programVideo.current?.playAsync();
        } else {
            programVideo.current?.stopAsync();
        }
    }, [isVisible]);
    return (
        <View
            pl={wn(20)}
            pr={isLastItem ? wn(20) : null}
            animation={"medium"}
            pressStyle={{
                opacity: 0.85,
                scale: 0.995,
            }}
        >
            {/* Image */}
            <View width={wn(220)} height={wn(220)} position="relative">
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
            <View mt={wn(10)}>
                <Text color={"$gold"} fontFamily={"$heading"} fontSize={wn(16)}>
                    {programTitle}
                </Text>
            </View>
        </View>
    );
};

export default RecommendedProgramCard;
