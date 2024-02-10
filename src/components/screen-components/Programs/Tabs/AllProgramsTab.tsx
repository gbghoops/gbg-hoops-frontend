import { useRef } from "react";
import { StyleSheet } from "react-native";
import { FlashList } from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { Program } from "@src/context/ProgramsContext/types";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

export const AllProgramsTab = () => {
    const { programs } = usePrograms();
    const { bottom } = useSafeAreaInsets();

    if (!programs) return null;

    return (
        <FlashList
            data={[...programs]}
            numColumns={2}
            estimatedItemSize={wn(220)}
            contentContainerStyle={{
                paddingBottom: bottom + wn(100),
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.contentful_id}-${index}`}
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
    program: Program;
}
const ProgramCard = ({ program }: ProgramCard) => {
    const { slug, name, teaser } = program;
    const router = useRouter();
    const programVideo = useRef<Video>(null);
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

const styles = StyleSheet.create({
    VideoBackground: {
        width: "100%",
        height: "100%",
    },
});
