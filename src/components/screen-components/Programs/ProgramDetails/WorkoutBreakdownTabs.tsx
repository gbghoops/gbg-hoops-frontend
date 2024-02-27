import { useEffect, useState } from "react";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { ProgramWeekWithSlug } from "@src/context/ProgramsContext/types";
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
    YStack,
} from "tamagui";

import WeeklyActivitiesBreakdown from "./WeeklyActivitiesBreakdown";

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
    const [accordionStates, setAccordionStates] = useState<boolean[]>([]);

    const currentProgram = programs.find((program) => program.slug === slug);

    useEffect(() => {
        if (!currentProgram || "is_locked" in currentProgram) return;

        const week1 = currentProgram?.weeks[0];
        const week1Slug = slugify(week1.name, { lower: true });
        setCurrentTab(week1Slug);
    }, [currentProgram]);

    const isProgramLocked = currentProgram && "is_locked" in currentProgram;

    if (!currentProgram || isProgramLocked) return null;

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

    const areAccordionsClosed = accordionStates.every((state) => !state);

    return (
        <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            orientation="horizontal"
            flexDirection="column"
            padding={0}
            height={areAccordionsClosed ? wn(80 * 5 + 50) : "auto"}
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
                    paddingBottom="$2"
                    backgroundColor="transparent"
                    height={50}
                    borderBottomWidth={1}
                    borderBottomColor="$border_primary"
                    borderRadius={0}
                >
                    <ScrollView horizontal pagingEnabled>
                        {slugifiedWeeks.map((week, index) => (
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
                                    {`Week ${index + 1}`}
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
                    animation="250ms"
                    x={0}
                    opacity={1}
                    flex={1}
                >
                    <Tabs.Content value={currentTab} forceMount flexGrow={1}>
                        <H5 textAlign="center" fontSize={"$20"}>
                            {weekData ? (
                                <WeeklyActivitiesBreakdown
                                    weekData={weekData}
                                    onDaysAccordionOpenStateChange={(
                                        states,
                                    ) => {
                                        setAccordionStates(states);
                                    }}
                                />
                            ) : null}
                        </H5>
                    </Tabs.Content>
                </AnimatedYStack>
            </AnimatePresence>
        </Tabs>
    );
};

const TabsRovingIndicator = ({
    active,
    ...props
}: { active?: boolean } & StackProps) => {
    return (
        <YStack
            position="absolute"
            backgroundColor="$gold"
            opacity={0.7}
            animation="250ms"
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
