import { useEffect, useState } from "react";
import { View as RNView } from "react-native";
import Animated from "react-native-reanimated";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { ProgramDay, ProgramWeek } from "@src/context/ProgramsContext/types";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useLocalSearchParams } from "expo-router";
import slugify from "slugify";
import {
    AnimatePresence,
    H5,
    ScrollView,
    StackProps,
    styled,
    TabLayout,
    Tabs,
    TabsTabProps,
    Text,
    View,
    YStack,
} from "tamagui";

interface ProgramWeekWithSlug extends ProgramWeek {
    slug: string;
}
export const WorkoutBreakdownTabs = () => {
    const { programs } = usePrograms();
    const { slug } = useLocalSearchParams();
    const [tabState, setTabState] = useState<{
        currentTab: string;
        /**
         * Layout of the Tab user might intend to select (hovering / focusing)
         */
        intentAt: TabLayout | null;
        /**
         * Layout of the Tab user selected
         */
        activeAt: TabLayout | null;
        /**
         * Used to get the direction of activation for animating the active indicator
         */
        prevActiveAt: TabLayout | null;
    }>({
        activeAt: null,
        currentTab: "",
        intentAt: null,
        prevActiveAt: null,
    });

    const setCurrentTab = (currentTab: string) =>
        setTabState({ ...tabState, currentTab });
    const setIntentIndicator = (intentAt: TabLayout) =>
        setTabState({ ...tabState, intentAt });
    const setActiveIndicator = (activeAt: TabLayout) =>
        setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt });
    const { activeAt, intentAt, prevActiveAt, currentTab } = tabState;

    const currentProgram = programs.find((program) => program.slug === slug);

    useEffect(() => {
        if (!currentProgram) return;

        const week1 = currentProgram?.weeks[0];
        const week1Slug = slugify(week1.name, { lower: true });
        setCurrentTab(week1Slug);
    }, [currentProgram]);

    if (!currentProgram) return null;

    const weeks = currentProgram?.weeks;

    const slugifiedWeeks: ProgramWeekWithSlug[] = weeks.map((week) => {
        return {
            ...week,
            slug: slugify(week.name, { lower: true }),
        };
    });

    const direction = (() => {
        if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
            return 0;
        }
        return activeAt.x > prevActiveAt.x ? -1 : 1;
    })();

    const enterVariant =
        direction === 1
            ? "isLeft"
            : direction === -1
              ? "isRight"
              : "defaultFade";
    const exitVariant =
        direction === 1
            ? "isRight"
            : direction === -1
              ? "isLeft"
              : "defaultFade";

    const handleOnInteraction: TabsTabProps["onInteraction"] = (
        type,
        layout,
    ) => {
        if (!layout) return;

        if (type === "select") {
            setActiveIndicator(layout);
        } else {
            setIntentIndicator(layout);
        }
    };

    const getDaysData = (weekId: string) => {
        const week = slugifiedWeeks.find((week) => week.slug === weekId);
        if (!week) return null;

        return week;
    };

    const weekData = getDaysData(currentTab);

    return (
        <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            orientation="horizontal"
            height={150}
            flexDirection="column"
            activationMode="manual"
            padding={0}
        >
            <YStack>
                <AnimatePresence>
                    {intentAt && (
                        <TabsRovingIndicator
                            width={intentAt.width}
                            height="$2"
                            x={intentAt.x}
                            bottom={1}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {activeAt && (
                        <TabsRovingIndicator
                            active
                            width={activeAt.width}
                            height="$2"
                            x={activeAt.x}
                            bottom={1}
                        />
                    )}
                </AnimatePresence>
                <Tabs.List
                    disablePassBorderRadius
                    paddingBottom="$1.5"
                    backgroundColor="transparent"
                    height={50}
                    borderBottomWidth={1}
                    borderBottomColor="$border_primary"
                    borderRadius={0}
                >
                    <ScrollView horizontal pagingEnabled>
                        {slugifiedWeeks.map((week) => (
                            <Tabs.Tab
                                key={week.slug}
                                padding="$5"
                                value={week.slug}
                                f={1}
                                h={"100%"}
                                borderRadius={0}
                                w={wn(100)}
                                backgroundColor={"$transparent"}
                                onInteraction={handleOnInteraction}
                            >
                                <Text fontFamily={"$heading"} fontSize={"$14"}>
                                    {week.name}
                                </Text>
                            </Tabs.Tab>
                        ))}
                    </ScrollView>
                </Tabs.List>
            </YStack>

            <AnimatePresence
                exitBeforeEnter
                enterVariant={enterVariant}
                exitVariant={exitVariant}
            >
                <AnimatedYStack
                    key={currentTab}
                    animation="100ms"
                    x={0}
                    opacity={1}
                    flex={1}
                >
                    <Tabs.Content
                        value={currentTab}
                        forceMount
                        flex={1}
                        justifyContent="center"
                    >
                        <H5 textAlign="center" fontSize={"$20"}>
                            {weekData ? (
                                <WeekylActivitiesBreakdown
                                    weekData={weekData}
                                />
                            ) : null}
                        </H5>
                    </Tabs.Content>
                </AnimatedYStack>
            </AnimatePresence>
        </Tabs>
    );
};

interface WeekylActivitiesBreakdownProps {
    weekData: ProgramWeekWithSlug | null;
}
const WeekylActivitiesBreakdown = ({
    weekData,
}: WeekylActivitiesBreakdownProps) => {
    if (!weekData) return null;

    const possibleDays = ["day_1", "day_2", "day_3", "day_4", "day_5"];

    // get week days data from the weekData
    const getDaysData = (week: ProgramWeekWithSlug) => {
        // get the day keys from the week data
        const dayKeys = Object.keys(week).filter((key) =>
            possibleDays.includes(key),
        );

        // get the day data from the week datas
        const daysData = dayKeys.map((dayKey) => {
            // @ts-ignore
            return week[dayKey] as ProgramDay;
        });

        return daysData;
    };

    const daysData = getDaysData(weekData);

    return (
        <YStack>
            {daysData.map((day, index) => (
                <View key={day.exercises[0].title}>
                    <Text>{day.exercises[0].title}</Text>
                </View>
            ))}
        </YStack>
    );
};

const DaysAccordion = () => {};

const TabsRovingIndicator = ({
    active,
    ...props
}: { active?: boolean } & StackProps) => {
    return (
        <YStack
            position="absolute"
            backgroundColor="$gold"
            opacity={0.7}
            animation="medium"
            height={"$10"}
            zIndex={1}
            enterStyle={{
                opacity: 0,
            }}
            exitStyle={{
                opacity: 0,
            }}
            {...(active && {
                backgroundColor: "$gold",
                opacity: 0.6,
            })}
            {...props}
        />
    );
};

const AnimatedYStack = styled(YStack, {
    variants: {
        isLeft: { true: { x: -25, opacity: 0 } },
        isRight: { true: { x: 25, opacity: 0 } },
        defaultFade: { true: { opacity: 0 } },
    } as const,
});
