import { useEffect, useState } from "react";
import DayActivityAccordion from "@src/components/day-activity-accordion/DayActivityAccordion";
import {
    possibleDays,
    ProgramWeekWithSlug,
} from "@src/context/ProgramsContext/types";
import { Text, View } from "tamagui";

interface WeekylActivitiesBreakdownProps {
    isCompletedBlock?: boolean;
    programSlug: string;
    weekNumber: number;
    weekData: ProgramWeekWithSlug | null;
    removeHorizontalPadding?: boolean;
    allowRedo?: boolean;
    onDaysAccordionOpenStateChange?: (states: boolean[]) => void;
}

const WeeklyActivitiesBreakdown = ({
    weekData,
    programSlug,
    weekNumber,
    removeHorizontalPadding = false,
    onDaysAccordionOpenStateChange,
    allowRedo = false,
    isCompletedBlock = false,
}: WeekylActivitiesBreakdownProps) => {
    if (!weekData) return null;

    const [accordionStates, setAccordionStates] = useState<boolean[]>([]);

    // get week days data from the weekData
    const getDaysData = (week: ProgramWeekWithSlug) => {
        // get the day keys from the week data
        const dayKeys = Object.keys(week).filter((key) =>
            possibleDays.includes(key),
        );

        // get the day data from the week datas
        const daysData = dayKeys
            // @ts-ignore
            .filter((dayKey) => !!week[dayKey])
            .map((dayKey) => {
                const dayTitle = `Day ${dayKey.split("_")[1]}`;
                // @ts-ignore
                return { ...week[dayKey], dayTitle } as ProgramDay;
            });

        return daysData;
    };

    useEffect(() => {
        onDaysAccordionOpenStateChange &&
            onDaysAccordionOpenStateChange(accordionStates);
    }, [accordionStates]);

    const daysData = getDaysData(weekData);

    return (
        <View>
            {daysData.length ? (
                daysData.map((day, i) => (
                    <DayActivityAccordion
                        index={i}
                        day={day}
                        programSlug={programSlug}
                        programWeekNumber={weekNumber}
                        programDayNumber={i + 1}
                        showCompletedTag={isCompletedBlock}
                        removeHorizontalPadding={removeHorizontalPadding}
                        key={day.exercises[0]?.title ?? i}
                        allowRedo={allowRedo}
                        onAccordionOpenStateChange={(state) => {
                            setAccordionStates((prev) => {
                                const newState = [...prev];
                                newState[daysData.indexOf(day)] = state;
                                return newState;
                            });
                        }}
                    />
                ))
            ) : (
                <View
                    w="100%"
                    h="$120"
                    jc="center"
                    ai="center"
                    borderWidth={0.25}
                    borderColor={"$border_primary"}
                >
                    <Text fontFamily={"$acuminProBold"} fontSize={"$16"}>
                        No data to display
                    </Text>
                </View>
            )}
        </View>
    );
};

export default WeeklyActivitiesBreakdown;
