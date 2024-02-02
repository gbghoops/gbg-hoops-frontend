import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

export interface RecommendedProgramCardProps {
    id: number;
    renderIndex?: number;
    slug: string;
    video: string;
    programTitle: string;
    isVisible?: boolean;
    isLastItem?: boolean;
}

const RecommendedProgramCard = (props: RecommendedProgramCardProps) => {
    const { video, programTitle, isLastItem, isVisible, slug } = props;
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
                router.push(`/program/program-details/${slug}`);
            }}
        >
            {/* Video */}
            <View position="relative" width={wn(220)} height={wn(220)}>
                <View
                    position="absolute"
                    top={0}
                    left={0}
                    zIndex={0}
                    width={"100%"}
                    height={"100%"}
                    backgroundColor={"$surface_primary"}
                />
                <Video
                    ref={programVideo}
                    isMuted
                    source={{
                        uri: `https:${video}`,
                    }}
                    resizeMode={ResizeMode.COVER}
                    style={styles.VideoBackground}
                />
            </View>
            <View mt="$10">
                <Text color={"$gold"} fontFamily={"$heading"} fontSize="$16">
                    {programTitle}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    VideoBackground: {
        width: "100%",
        height: "100%",
    },
});

export default RecommendedProgramCard;
