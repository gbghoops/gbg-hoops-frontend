import { useRef } from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

const NewestProgramCard = () => {
    const { programs } = usePrograms();
    const { push } = useRouter();

    // TODO: Add proper logic to get Newest program
    const newestProgram = programs[programs.length - 1];

    const isProgramLocked = newestProgram && "is_locked" in newestProgram;

    if (!newestProgram) return null;

    const programVideo = useRef<Video>(null);

    const video = newestProgram.teaser;

    return (
        <View>
            {/* Heading */}
            <View fd={"row"} ai={"center"} pb={"$10"}>
                <Text
                    ff={"$heading"}
                    fontSize={"$24"}
                    textTransform="uppercase"
                >
                    Newest Program
                </Text>
            </View>
            <View
                onPress={() => {
                    push(`/program/program-details/${newestProgram.slug}`);
                }}
                animation="medium"
                pressStyle={{
                    opacity: 0.85,
                    scale: 0.995,
                }}
            >
                {/* Image */}
                <View position="relative" width={"100%"} height="$200">
                    {isProgramLocked ? (
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
                {/* Title */}
                <View jc={"space-between"} fd={"row"} ai={"center"} mt="$15">
                    <Text
                        fontFamily={"$heading"}
                        fontSize="$20"
                        color={"$gold"}
                    >
                        {newestProgram.name}
                    </Text>
                </View>
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

export default NewestProgramCard;
