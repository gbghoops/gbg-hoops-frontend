import { useRef } from "react";
import { StyleSheet } from "react-native";
import { FlashList } from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "@src/components/button/Button";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { LockedProgram, Program } from "@src/context/ProgramsContext/types";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

export const AllProgramsTab = () => {
    const { programs } = usePrograms();
    const { bottom } = useSafeAreaInsets();

    if (!programs) return <EmptyPrograms />;

    return (
        <FlashList
            data={[...programs]}
            numColumns={2}
            estimatedItemSize={wn(220)}
            contentContainerStyle={{
                paddingBottom: bottom + wn(100),
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) =>
                `${"is_locked" in item ? item.id : item.contentful_id}-${index}`
            }
            ListHeaderComponent={() => (
                <View fd="row" jc="flex-end" px={"$20"}>
                    <Button text={`Filter`} secondary_transparent />
                </View>
            )}
            ListHeaderComponentStyle={{
                marginVertical: wn(10),
            }}
            renderItem={({ item: program }) => (
                <ProgramCard program={program} />
            )}
        />
    );
};

interface ProgramCard {
    program: Program | LockedProgram;
}
const ProgramCard = ({ program }: ProgramCard) => {
    const { slug, name, teaser } = program;
    const router = useRouter();
    const programVideo = useRef<Video>(null);
    const is_locked = "is_locked" in program;
    return (
        <View
            f={1}
            px="$10"
            pb="$10"
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
            <View position="relative" width={"100%"} height={wn(220)}>
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
                <Video
                    ref={programVideo}
                    isMuted
                    source={{
                        uri: `https:${teaser}`,
                    }}
                    resizeMode={ResizeMode.COVER}
                    style={styles.VideoBackground}
                />
            </View>
            <View mt="$10">
                <Text color={"$gold"} fontFamily={"$heading"} fontSize="$16">
                    {name}
                </Text>
            </View>
        </View>
    );
};

const EmptyPrograms = () => {
    return (
        <View jc="center" ai="center" f={1} mx="$20">
            <Text
                fontFamily={"$acuminProBold"}
                fontSize="$24"
                textAlign="center"
            >
                No programs available at this moment, please try again later.
            </Text>
            <Text
                fontFamily={"$acuminProRegular"}
                fontSize="$20"
                textAlign="center"
                mt="$10"
            >
                If this issue persists, please contact support.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    VideoBackground: {
        width: "100%",
        height: "100%",
    },
});
