import { ActivityIndicator, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Program } from "@src/context/ProgramsContext/types";
import getProgramDayInfo from "@src/context/ProgramsContext/utils/getProgramDayInfo";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";
interface ActiveProgramCardProps {
    program: Program;
}

const ActiveProgramCard = ({ program }: ActiveProgramCardProps) => {
    const { name, progress, weeks, teaser } = program;
    const { push } = useRouter();

    if (!progress) return null;

    const currentWeek = progress.week_completed + 1;
    const currentDay = progress.day_completed + 1;

    // Get workout day information
    const weekData = weeks[currentWeek - 1];

    const dayData = getProgramDayInfo({ week: weekData, day: currentDay });

    const dayTitle = dayData?.dayData?.exercises[0].title ?? "";

    const onProgramPress = () => {
        return push(`/program/workout-details/${program.slug}`);
    };

    return (
        <View
            backgroundColor="$surface_primary"
            w="100%"
            fd="row"
            mb="$20"
            animation={"fast"}
            pressStyle={{
                opacity: 0.85,
                scale: 0.995,
            }}
            onPress={onProgramPress}
        >
            {/* Teaser Container */}
            <View w="$120" h="$120">
                <Video
                    shouldPlay={false}
                    isLooping
                    resizeMode={ResizeMode.COVER}
                    source={{
                        uri: `https:${teaser}`,
                    }}
                    style={styles.TeaserVideo}
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
            <View p="$15" jc="center" f={1}>
                <Text
                    fontSize={"$18"}
                    fontFamily={"$acuminProSemibold"}
                >{`Day ${currentDay}`}</Text>

                {dayTitle ? (
                    <Text
                        fontSize={"$20"}
                        fontFamily={"$acuminProBold"}
                        mt="$10"
                        numberOfLines={2}
                        textOverflow="ellipsis"
                        textTransform="uppercase"
                        borderWidth={1}
                        borderColor="red"
                    >
                        {dayTitle}
                    </Text>
                ) : null}
                <Text
                    fontSize={"$14"}
                    fontFamily={"$acuminProRegular"}
                    mt="$10"
                >
                    {name}
                </Text>
            </View>
            <View jc="center" ai="center" px="$20" ml="auto">
                <Octicons
                    name="arrow-right"
                    color={colors.gold}
                    size={wn(26)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    TeaserVideo: {
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
});

export default ActiveProgramCard;
