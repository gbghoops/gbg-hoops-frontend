import { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
} from "@expo/vector-icons";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { Program } from "@src/context/ProgramsContext/types";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { ResizeMode, Video } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "tamagui";

export default function ProgramDetails() {
    const { slug } = useLocalSearchParams();
    const { bottom } = useSafeAreaInsets();
    const { programs } = usePrograms();
    const [teaserVideoPlaying, setTeaserVideoPlaying] = useState(false);
    const VideoRef = useRef<Video>(null);

    const currentProgram = programs.find((program) => program.slug === slug);

    if (!currentProgram) {
        return null;
    }

    const { weeks, days, levels, workout_Duration } =
        getProgramSummary(currentProgram);

    return (
        <View f={1} bc={"$surface_background"} pt={"$20"} px={"$20"}>
            <ScrollView
                f={1}
                contentContainerStyle={
                    contentContainerStyles({ bottom: bottom + wn(120) })
                        .contentContainerStyle
                }
            >
                <View fd="row" jc="space-between" ai="center">
                    <Text fontFamily={"$heading"} fontSize={"$34"}>
                        {currentProgram?.name}
                    </Text>
                    <View
                        animation="medium"
                        pressStyle={{
                            opacity: 0.75,
                            scale: 0.9,
                        }}
                    >
                        <Octicons
                            name="heart"
                            size={wn(30)}
                            color={colors.gold}
                        />
                    </View>
                </View>
                <View mt="$20">
                    <View
                        height={wn(230)}
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
                                setTeaserVideoPlaying(!teaserVideoPlaying);
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
                                opacity={teaserVideoPlaying ? 0 : 0.5}
                            />

                            {!teaserVideoPlaying ? (
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
                            shouldPlay={teaserVideoPlaying}
                            isLooping
                            resizeMode={ResizeMode.COVER}
                            source={{
                                uri: `https:${currentProgram?.teaser}`,
                            }}
                            style={styles.TeaserVideo}
                        />
                    </View>
                </View>
                <View mt="$15">
                    <Text
                        fontFamily={"$body"}
                        fontSize={"$16"}
                        lineHeight={wn(20)}
                    >
                        {currentProgram?.description}
                    </Text>
                </View>
                <View mt={"$15"}>
                    <View
                        backgroundColor={"$surface_primary"}
                        p={"$10"}
                        fd="row"
                        flexWrap="wrap"
                    >
                        {/* Weeks */}
                        <View
                            px={"$15"}
                            py={"$10"}
                            w="50%"
                            fd="row"
                            ai="center"
                        >
                            <View mr={"$10"}>
                                <Octicons
                                    name="calendar"
                                    color={colors.surface_accent}
                                    size={wn(20)}
                                />
                            </View>
                            <Text
                                fontSize={"$16"}
                                fontFamily={"$acuminProSemibold"}
                                mt="$2"
                            >{`${weeks} Week${weeks > 1 ? "s" : ""}`}</Text>
                        </View>
                        {/* Days */}
                        <View
                            px={"$15"}
                            py={"$10"}
                            w="50%"
                            fd="row"
                            ai="center"
                        >
                            <View mr={"$10"}>
                                <MaterialCommunityIcons
                                    name="calendar-month-outline"
                                    color={colors.surface_accent}
                                    size={wn(25)}
                                />
                            </View>
                            <Text
                                fontSize={"$16"}
                                mt="$2"
                                fontFamily={"$acuminProSemibold"}
                            >{`${days} Day${days > 1 ? "s" : ""} a week`}</Text>
                        </View>
                        {/* Levels */}
                        <View
                            px={"$15"}
                            py={"$10"}
                            w="50%"
                            fd="row"
                            ai="center"
                        >
                            <View mr={"$10"}>
                                <MaterialIcons
                                    name="bar-chart"
                                    color={colors.surface_accent}
                                    size={wn(25)}
                                />
                            </View>
                            <Text
                                fontSize={"$16"}
                                mt="$2"
                                fontFamily={"$acuminProSemibold"}
                            >{`${levels}`}</Text>
                        </View>
                        {/* Workout Duration */}
                        <View
                            px={"$15"}
                            py={"$10"}
                            w="50%"
                            fd="row"
                            ai="center"
                        >
                            <View mr={"$10"}>
                                <Octicons
                                    name="clock"
                                    color={colors.surface_accent}
                                    size={wn(22)}
                                />
                            </View>
                            <Text
                                fontSize={"$16"}
                                mt="$2"
                                fontFamily={"$acuminProSemibold"}
                            >{`${workout_Duration} minute workouts`}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const possibleDays = ["day_1", "day_2", "day_3", "day_4", "day_5"];

const getProgramSummary = (program: Program) => {
    const weeks = program.weeks.length;

    const days = Object.keys(program.weeks[0]).filter((day) =>
        possibleDays.includes(day),
    ).length;

    const levels = "All Levels";

    const workout_Duration = 20;

    return {
        weeks,
        days,
        levels,
        workout_Duration,
    };
};

interface stylesProps {
    bottom: number;
}

const contentContainerStyles = ({ bottom }: stylesProps) =>
    StyleSheet.create({
        contentContainerStyle: {
            paddingBottom: bottom + wn(120),
        },
    });

const styles = StyleSheet.create({
    TeaserVideo: {
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
});
