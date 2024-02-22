import { useEffect, useState } from "react";
import HoopLevelSelectOptions from "@src/components/radio-select/constants/hoop-level-select-options";
import PerformanceGoalSelectOptions from "@src/components/radio-select/constants/performance-goals-options";
import RadioSelect from "@src/components/radio-select/RadioSelect";
import {
    HoopLevelType,
    PerformanceGoalType,
} from "@src/context/UserContext/types";
import { Text, View } from "tamagui";

export interface AssessmentSlide2OnChanageProps {
    selectedHoopLevelId: number;
    selectedPerformanceGoalId: number;
}

interface AssessmentSlide1Props {
    isActiveSlide: boolean;
    selectedHoopLevel: HoopLevelType | null;
    selectedPerformanceGoal: PerformanceGoalType | null;
    onValuesChange: (props: AssessmentSlide2OnChanageProps) => void;
}
export default function AssesmentSlide1({
    isActiveSlide,
    selectedHoopLevel,
    selectedPerformanceGoal,
    onValuesChange,
}: AssessmentSlide1Props) {
    const [selectedHoopLevelId, setSelectedHooplevel] = useState<number>(0);
    const [selectedPerformanceGoalId, setSelectedPerformanceGoal] =
        useState<number>(0);

    useEffect(() => {
        onValuesChange({ selectedHoopLevelId, selectedPerformanceGoalId });
    }, [selectedHoopLevelId, selectedPerformanceGoalId]);

    useEffect(() => {}, [selectedPerformanceGoalId]);

    useEffect(() => {
        if (selectedHoopLevel) {
            const selectedHoopLevelOption = HoopLevelSelectOptions.find(
                (g) => g.hoop_level === selectedHoopLevel,
            );

            if (selectedHoopLevelOption) {
                setSelectedHooplevel(selectedHoopLevelOption.id);
            }
        }
    }, [selectedHoopLevel]);

    useEffect(() => {
        if (selectedPerformanceGoal) {
            const selectedPerformanceGoalOption =
                PerformanceGoalSelectOptions.find(
                    (g) => g.performance_goal === selectedPerformanceGoal,
                );

            if (selectedPerformanceGoalOption) {
                setSelectedPerformanceGoal(selectedPerformanceGoalOption.id);
            }
        }
    }, [selectedPerformanceGoal]);

    return isActiveSlide ? (
        <View>
            <View mt="$20" mx="$20">
                <Text fontFamily={"$heading"} fontSize="$24" mb="$10">
                    What’s your hoop level?
                </Text>
                <RadioSelect
                    options={HoopLevelSelectOptions}
                    selectedOption={selectedHoopLevelId}
                    onSelectedOption={(id) => {
                        setSelectedHooplevel(id);
                    }}
                />
            </View>
            <View mt="$40" mx="$20">
                <Text fontFamily={"$heading"} fontSize="$24" mb="$10">
                    What are you performance goals?
                </Text>
                <RadioSelect
                    options={PerformanceGoalSelectOptions}
                    selectedOption={selectedPerformanceGoalId}
                    onSelectedOption={(id) => {
                        setSelectedPerformanceGoal(id);
                    }}
                />
            </View>
        </View>
    ) : null;
}
