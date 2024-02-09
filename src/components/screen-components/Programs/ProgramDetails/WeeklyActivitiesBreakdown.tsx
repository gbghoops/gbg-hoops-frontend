import { useEffect, useState } from "react";
import { ProgramWeekWithSlug } from "@src/context/ProgramsContext/types";
import { View } from "tamagui";

import DaysAccordion from "./DaysAccordion";

interface WeekylActivitiesBreakdownProps {
    weekData: ProgramWeekWithSlug | null;
    onDaysAccordionOpenStateChange: (states: boolean[]) => void;
}

const WeeklyActivitiesBreakdown = ({
    weekData,
    onDaysAccordionOpenStateChange,
}: WeekylActivitiesBreakdownProps) => {
    if (!weekData) return null;

    const [accordionStates, setAccordionStates] = useState<boolean[]>([]);

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

    useEffect(() => {
        onDaysAccordionOpenStateChange(accordionStates);
    }, [accordionStates]);

    const daysData = getDaysData(weekData);

    return (
        <View>
            {daysData.map((day) => (
                <DaysAccordion
                    day={day}
                    key={day.exercises[0].title}
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
