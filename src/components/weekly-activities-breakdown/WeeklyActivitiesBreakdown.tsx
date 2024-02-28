import { useEffect, useState } from "react";
import DayActivityAccordion from "@src/components/day-activity-accordion/DayActivityAccordion";
import {
    possibleDays,
    ProgramWeekWithSlug,
} from "@src/context/ProgramsContext/types";
import { View } from "tamagui";

interface WeekylActivitiesBreakdownProps {
    weekData: ProgramWeekWithSlug | null;
    removeHorizontalPadding?: boolean;
    onDaysAccordionOpenStateChange?: (states: boolean[]) => void;
}

const WeeklyActivitiesBreakdown = ({
    weekData,
    removeHorizontalPadding = false,
    onDaysAccordionOpenStateChange,
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
            .map((dayKey) => {
                const dayTitle = `Day ${dayKey.split("_")[1]}`;
                // @ts-ignore
                return { ...week[dayKey], dayTitle } as ProgramDay;
            })
            .filter((day) => !!day && day.exercises?.length > 0);

        return daysData;
    };

    useEffect(() => {
        onDaysAccordionOpenStateChange &&
            onDaysAccordionOpenStateChange(accordionStates);
    }, [accordionStates]);

    const daysData = getDaysData(weekData);

    return (
        <View>
            {daysData.map((day, i) => (
                <DayActivityAccordion
                    index={i}
                    day={day}
                    removeHorizontalPadding={removeHorizontalPadding}
                    key={day.exercises[0]?.title ?? i}
                    onAccordionOpenStateChange={(state) => {
                        setAccordionStates((prev) => {
                            const newState = [...prev];
                            newState[daysData.indexOf(day)] = state;
                            return newState;
                        });
                    }}
                />
            ))}
        </View>
    );
};

export default WeeklyActivitiesBreakdown;
