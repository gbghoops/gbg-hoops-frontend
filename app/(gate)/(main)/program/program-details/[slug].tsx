import { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {
    MaterialTabBar,
    MaterialTabItem,
} from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
} from "@expo/vector-icons";
import Button from "@src/components/button/Button";
import LegendSheet from "@src/components/screen-components/Programs/ProgramDetails/LegendSheet";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { Program } from "@src/context/ProgramsContext/types";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { ResizeMode, Video } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    H5,
    ScrollView,
    Separator,
    SizableText,
    TabsContentProps,
    Text,
    View,
} from "tamagui";
import { Tabs } from "tamagui";

export default function ProgramDetails() {
    const router = useRouter();
    const { bottom } = useSafeAreaInsets();
    const [showLegendSheet, setShowLegendSheet] = useState(false);
    const { slug } = useLocalSearchParams();

    return (
        <View f={1} position="relative" bc={"$surface_background"} pt={"$20"}>
            {/* Workout Breakdown */}
            <View>
                {/* Header */}

                <ScrollView
                    contentContainerStyle={
                        contentContainerStyles({ bottom }).contentContainerStyle
                    }
                >
                    <WorkoutBreakdownHeader
                        onInfoPress={() => setShowLegendSheet(true)}
                    />
                    <View h="100%">
                        <Tabs
                            defaultValue="tab1"
                            orientation="horizontal"
                            flexDirection="column"
                            width={"100%"}
                            height={150}
                            borderRadius="$4"
                            borderWidth="$0.25"
                            overflow="hidden"
                            borderColor="$borderColor"
                        >
                            <ScrollView
                                horizontal
                                pagingEnabled
                                style={{
                                    width: "100%",
                                    borderWidth: 1,
                                    borderColor: "red",
                                }}
                            >
                                <Tabs.List
                                    separator={<Separator vertical />}
                                    disablePassBorderRadius="bottom"
                                    aria-label="Manage your account"
                                    width={"100%"}
                                    height={wn(50)}
                                    borderWidth={1}
                                    borderColor="red"
                                >
                                    <Tabs.Tab
                                        value="tab1"
                                        f={1}
                                        minWidth={wn(80)}
                                        height={"100%"}
                                    >
                                        <Text fontFamily="$body">Profile</Text>
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        value="tab2"
                                        f={1}
                                        minWidth={wn(100)}
                                    >
                                        <Text fontFamily="$body">
                                            Connections
                                        </Text>
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        value="tab3"
                                        f={1}
                                        minWidth={wn(100)}
                                    >
                                        <Text fontFamily="$body">
                                            Notifications
                                        </Text>
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        value="tab4"
                                        f={1}
                                        minWidth={wn(100)}
                                    >
                                        <Text fontFamily="$body">
                                            Notifications
                                        </Text>
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        value="tab4"
                                        f={1}
                                        minWidth={wn(100)}
                                    >
                                        <Text fontFamily="$body">
                                            Notifications
                                        </Text>
                                    </Tabs.Tab>
                                </Tabs.List>
                            </ScrollView>

                            <Separator />
                            <TabsContent value="tab1">
                                <H5>Profile</H5>
                            </TabsContent>

                            <TabsContent value="tab2">
                                <H5>Connections</H5>
                            </TabsContent>

                            <TabsContent value="tab3">
                                <H5>Notifications</H5>
                            </TabsContent>
                        </Tabs>
                    </View>
                </ScrollView>
            </View>

            <View
                position="absolute"
                zIndex={10}
                bottom={bottom ? bottom + wn(20) : wn(50)}
                mx={"$20"}
                width={"100%"}
            >
                <Button
                    text="Add Program"
                    onPress={() => {
                        return router.replace(
                            `/program/workout-details/${slug}`,
                        );
                    }}
                    fullWidth
                />
            </View>
            <LegendSheet
                sheetOpen={showLegendSheet}
                setSheetOpen={setShowLegendSheet}
            />
        </View>
    );
}

const TabsContent = (props: TabsContentProps) => {
    return (
        <Tabs.Content
            backgroundColor="$background"
            key="tab3"
            padding="$2"
            alignItems="center"
            justifyContent="center"
            flex={1}
            borderColor="$background"
            borderRadius="$2"
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderWidth="$2"
            {...props}
        >
            {props.children}
        </Tabs.Content>
    );
};

interface WorkoutBreakdownProps {
    onInfoPress: () => void;
}
const WorkoutBreakdownHeader = ({ onInfoPress }: WorkoutBreakdownProps) => {
    const { programs, activeDay, activeWeek } = usePrograms();
    const [teaserVideoPlaying, setTeaserVideoPlaying] = useState(false);
    const { slug } = useLocalSearchParams();

    const VideoRef = useRef<Video>(null);

    const currentProgram = programs.find((program) => program.slug === slug);

    if (!currentProgram) {
        return null;
    }

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
            flexGrow: 1,
        },
    });

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
