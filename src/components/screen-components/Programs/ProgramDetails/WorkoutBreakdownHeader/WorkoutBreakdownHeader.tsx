import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
} from "@expo/vector-icons";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { possibleDays, Program } from "@src/context/ProgramsContext/types";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS,
    ResizeMode,
    Video,
} from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "tamagui";

interface WorkoutBreakdownProps {
    onInfoPress: () => void;
}

const WorkoutBreakdownHeader = ({ onInfoPress }: WorkoutBreakdownProps) => {
    const { programs } = usePrograms();
    const [teaserVideoPlaying, setTeaserVideoPlaying] = useState(false);
    const { slug } = useLocalSearchParams();

    const VideoRef = useRef<Video>(null);

    const currentProgram = programs.find((program) => program.slug === slug);

    if (!currentProgram) {
        return null;
    }

    useEffect(() => {
        if (teaserVideoPlaying) {
            Audio.setAudioModeAsync({
                interruptionModeIOS: InterruptionModeIOS.DuckOthers,
                interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
            });
        }
    }, [teaserVideoPlaying]);

    useEffect(() => {
        return () => {
            Audio.setAudioModeAsync({
                interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
                interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
            });
        };
    }, []);

    const { weeks, days, levels, workout_Duration } =
        getProgramSummary(currentProgram);

    return (
        <View backgroundColor={"$surface_background"} pointerEvents="box-none">
            <View
                fd="row"
                jc="space-between"
                ai="center"
                px={"$20"}
                pointerEvents="box-none"
            >
                <Text
                    fontFamily={"$heading"}
                    fontSize={"$34"}
                    pointerEvents="box-none"
                >
                    {currentProgram?.name}
                </Text>
                <View
                    animation="medium"
                    pointerEvents="box-none"
                    pressStyle={{
                        opacity: 0.75,
                        scale: 0.9,
                    }}
                >
                    <Octicons name="heart" size={wn(30)} color={colors.gold} />
                </View>
            </View>
            <View mt="$20" px={"$20"} pointerEvents="box-none">
                <View
                    height={wn(230)}
                    position="relative"
                    animation={"slider"}
                    opacity={1}
                    pointerEvents="box-none"
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
                        pointerEvents="box-none"
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
                            pointerEvents="box-none"
                            opacity={teaserVideoPlaying ? 0 : 0.5}
                        />

                        {!teaserVideoPlaying ? (
                            <Text
                                textTransform="uppercase"
                                fontFamily={"$heading"}
                                color={"$white"}
                                fontSize={"$24"}
                                pointerEvents="box-none"
                            >
                                Play Instructional Video
                            </Text>
                        ) : null}
                    </View>
                    <Video
                        ref={VideoRef}
                        shouldPlay={teaserVideoPlaying}
                        isLooping
                        resizeMode={ResizeMode.COVER}
                        pointerEvents="box-none"
                        source={{
                            uri: `https:${currentProgram?.teaser}`,
                        }}
                        style={styles.TeaserVideo}
                    />
                </View>
            </View>
            <View mt="$15" px={"$20"} pointerEvents="none">
                <Text fontFamily={"$body"} fontSize={"$16"} lineHeight={wn(20)}>
                    {currentProgram?.description}
                </Text>
            </View>
            <View mt={"$15"} px={"$20"} pointerEvents="none">
                <View
                    backgroundColor={"$surface_primary"}
                    p={"$10"}
                    fd="row"
                    flexWrap="wrap"
                >
                    {/* Weeks */}
                    <View px={"$15"} py={"$10"} w="50%" fd="row" ai="center">
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
                    <View px={"$15"} py={"$10"} w="50%" fd="row" ai="center">
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
                    <View px={"$15"} py={"$10"} w="50%" fd="row" ai="center">
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
                    <View px={"$15"} py={"$10"} w="50%" fd="row" ai="center">
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
            <View
                flexDirection="row"
                ai="center"
                backgroundColor={"$surface_background"}
                py={"$15"}
                px={"$20"}
            >
                <Text
                    fontSize={"$24"}
                    fontFamily={"$heading"}
                    mt={wn(2)}
                    pointerEvents="none"
                >
                    Workout Breakdown
                </Text>

                <View
                    ml="$10"
                    onPress={onInfoPress}
                    pointerEvents="box-none"
                    pressStyle={{
                        opacity: 0.75,
                        scale: 0.9,
                    }}
                >
                    <Octicons
                        name="info"
                        size={wn(20)}
                        color={colors.gold}
                        onPress={onInfoPress}
                    />
                </View>
            </View>
        </View>
    );
};

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

const styles = StyleSheet.create({
    TeaserVideo: {
        width: "100%",
        height: "100%",
        zIndex: 0,
    },

    tabBarStyle: {
        backgroundColor: colors.surface_background,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(164, 164, 164, 0.4)",
        shadowColor: "rgba(0, 0, 0, 0)",
    },
    tabsStyle: {
        backgroundColor: colors.surface_background,
        minWidth: wn(90),
        marginVertical: 0,
        height: wn(45),
        color: colors.white,
    },
    labelStyle: {
        color: colors.white,
        fontFamily: "acumin_pro_bold",
    },
    indicatorStyle: {
        backgroundColor: colors.gold,
        height: wn(3),
        color: "rgba(255, 255, 255, 0.5)",
    },
});

export default WorkoutBreakdownHeader;
