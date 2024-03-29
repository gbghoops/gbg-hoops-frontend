import { useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import convertToProxyURL from "react-native-video-cache";
import { Octicons } from "@expo/vector-icons";
import CompletedTag from "@src/components/completed-tag/CompletedTag";
import { Program } from "@src/context/ProgramsContext/types";
import getProgramDayInfo from "@src/context/ProgramsContext/utils/getProgramDayInfo";
import { useUser } from "@src/context/UserContext/user-context";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

import DaySelectSheet from "./DaySelectSheet";
interface ActiveProgramCardProps {
    program: Program;
}

const ActiveProgramCard = ({ program }: ActiveProgramCardProps) => {
    const { name, progress, weeks, teaser } = program;
    const { push } = useRouter();
    const { user } = useUser();
    const [isDaySelectSheetVisible, setIsDaySelectSheetVisible] =
        useState(false);

    if (!progress) return null;

    const currentWeek = progress.week_completed + 1;
    const currentDay = progress.day_completed + 1;

    // Get workout day information
    const weekData = weeks[currentWeek - 1];

    const dayData = getProgramDayInfo({ week: weekData, day: currentDay });

    const dayTitle = dayData?.dayData?.exercises[0].title ?? "";

    const onProgramPress = () => {
        return push(
            progress.completed_at
                ? `/program/completed-program-details/${program.slug}`
                : `/program/workout-details/${program.slug}`,
        );
    };

    const onProgramLongPress = () => {
        if (!user?.isPrivilegedUser) return;

        // display day and week select sheet
        setIsDaySelectSheetVisible(true);
    };

    const programWeekLength = weeks.length;

    return (
        <View
            backgroundColor="$surface_primary"
            w="100%"
            fd="row"
            mb="$20"
            pressStyle={{
                opacity: 0.85,
                scale: 0.995,
            }}
            onPress={onProgramPress}
            onLongPress={onProgramLongPress}
        >
            {/* Teaser Container */}
            <View w="$120" h="$130">
                <Video
                    shouldPlay={false}
                    isLooping
                    resizeMode={ResizeMode.COVER}
                    source={{
                        uri: convertToProxyURL(`https:${teaser}`),
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
                <View fd="row" ai="center">
                    <Text
                        fontSize={"$18"}
                        fontFamily={"$acuminProSemibold"}
                    >{`Day ${currentDay}`}</Text>
                    {progress.completed_at ? (
                        <View ml="$10">
                            <CompletedTag />
                        </View>
                    ) : null}
                </View>

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
            <DaySelectSheet
                isVisible={isDaySelectSheetVisible}
                setIsVisible={setIsDaySelectSheetVisible}
                currentDay={currentDay}
                currentWeek={currentWeek}
                maxWeek={programWeekLength}
                maxDay={5}
                programSlug={program.slug}
            />
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
