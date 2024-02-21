import { useState } from "react";
import GenderSelectOptions from "@src/components/radio-select/constants/gender-select-options";
import HoopLevelSelectOptions from "@src/components/radio-select/constants/hoop-level-select-options";
import PerformanceGoalSelectOptions from "@src/components/radio-select/constants/performance-goals-options";
import { AssessmentSlide2OnChanageProps } from "@src/components/screen-components/Assessment/Slides/AssessmentSlide2";
import {
    EnvironmentsType,
    GenderType,
    HoopLevelType,
    PainAreasType,
    PerformanceGoalType,
} from "@src/context/UserContext/types";

export interface AssessmentState {
    selectedGender: GenderType | undefined;
    selectedHoopLevel: HoopLevelType | undefined;
    selectedPerformanceGoal: PerformanceGoalType | undefined;
    environments: EnvironmentsType[] | undefined;
    painAreas: PainAreasType[] | undefined;
}

const assessmentDefaultState: AssessmentState = {
    selectedGender: undefined,
    selectedHoopLevel: undefined,
    selectedPerformanceGoal: undefined,
    environments: undefined,
    painAreas: undefined,
};

export default function useAssessmentState() {
    const [assessmentState, setAssessmentState] = useState<AssessmentState>(
        assessmentDefaultState,
    );

    const onSlide1ValuesChange = (selectedGenderId: number) => {
        const selectedGender = GenderSelectOptions.find(
            (g) => g.id === selectedGenderId,
        );

        if (selectedGender) {
            setAssessmentState((prev) => ({
                ...prev,
                selectedGender: selectedGender.gender,
            }));
        }
    };

    const onSlide2ValuesChange = ({
        selectedHoopLevelId,
        selectedPerformanceGoalId,
    }: AssessmentSlide2OnChanageProps) => {
        const selectedHoopLevel = HoopLevelSelectOptions.find(
            (g) => g.id === selectedHoopLevelId,
        );

        const selectedPerformanceGoal = PerformanceGoalSelectOptions.find(
            (g) => g.id === selectedPerformanceGoalId,
        );

        setAssessmentState((prev) => ({
            ...prev,
            selectedHoopLevel: selectedHoopLevel?.hoop_level,
            selectedPerformanceGoal: selectedPerformanceGoal?.performance_goal,
        }));
    };

    const onSlide3ValuesChange = (environments: EnvironmentsType[]) => {
        setAssessmentState((prev) => ({
            ...prev,
            environments: environments.length ? environments : undefined,
        }));
    };

    const onSlide4ValuesChange = (painAreas: PainAreasType[]) => {
        setAssessmentState((prev) => ({
            ...prev,
            painAreas: painAreas.length ? painAreas : undefined,
        }));
    };

    return {
        assessmentState,
        onSlide1ValuesChange,
        onSlide2ValuesChange,
        onSlide3ValuesChange,
        onSlide4ValuesChange,
    };
}
