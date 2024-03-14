import { useRef } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import convertToProxyURL from "react-native-video-cache";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CompletedTag from "@src/components/completed-tag/CompletedTag";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

export interface RecommendedProgramCardProps {
    id: number;
    renderIndex?: number;
    slug: string;
    video: string;
    is_locked: boolean;
    programTitle: string;
    isCompleted: boolean;
    isVisible?: boolean;
    isLastItem?: boolean;
}

const RecommendedProgramCard = (props: RecommendedProgramCardProps) => {
    const {
        video,
        programTitle,
        isLastItem,
        isVisible,
        slug,
        isCompleted = false,
        is_locked = false,
    } = props;
    const programVideo = useRef<Video>(null);

    const router = useRouter();

    if (isVisible) {
        programVideo.current?.playAsync();
    } else {
        programVideo.current?.stopAsync();
    }

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
                    isCompleted
                        ? `/program/completed-program-details/${slug}`
                        : `/program/program-details/${slug}`,
                );
            }}
        >
            {/* Video */}
            <View position="relative" width={wn(220)} height={wn(220)}>
                {is_locked ? (
                    <View
                        position="absolute"
                        top={0}
                        left={0}
                        zIndex={1}
                        jc="center"
                        ai="center"
                        width={"100%"}
                        height={"100%"}
                        backgroundColor={"$surface_primary_transparent"}
                    >
                        <View width="$24" height="$24">
                            <MaterialCommunityIcons
                                name="lock-outline"
                                color="white"
                                size={24}
                            />
                        </View>
                    </View>
                ) : null}

                {isCompleted ? (
                    <View
                        position="absolute"
                        top={0}
                        left={0}
                        zIndex={1}
                        width={"100%"}
                        height={"100%"}
                        p="$10"
                    >
                        <View w="$85">
                            <CompletedTag />
                        </View>
                    </View>
                ) : null}

                <Video
                    ref={programVideo}
                    isMuted
                    source={{
                        uri: convertToProxyURL(`https:${video}`),
                    }}
                    resizeMode={ResizeMode.COVER}
                    style={styles.VideoBackground}
                >
                    <View
                        w="100%"
                        h="100%"
                        jc="center"
                        ai="center"
                        backgroundColor="$surface_primary"
                    >
                        <ActivityIndicator size="small" color={colors.gold} />
                    </View>
                </Video>
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
