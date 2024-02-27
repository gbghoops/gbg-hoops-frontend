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
import { fetchAuthSession } from "aws-amplify/auth";
import * as Burnt from "burnt";

export interface AssessmentState {
    gender: GenderType | undefined;
    hoop_level: HoopLevelType | undefined;
    performance_goal: PerformanceGoalType | undefined;
    environments: EnvironmentsType[] | undefined;
    pain_areas: PainAreasType[] | undefined;
}

const assessmentDefaultState: AssessmentState = {
    gender: undefined,
    hoop_level: undefined,
    performance_goal: undefined,
    environments: undefined,
    pain_areas: undefined,
};

export default function useAssessmentState() {
    const [assessmentState, setAssessmentState] = useState<AssessmentState>(
        assessmentDefaultState,
    );

    const [submitLoading, setSubmitLoading] = useState(false);

    const onSlide1ValuesChange = (selectedGenderId: number) => {
        const selectedGender = GenderSelectOptions.find(
            (g) => g.id === selectedGenderId,
        );

        if (selectedGender) {
            setAssessmentState((prev) => ({
                ...prev,
                gender: selectedGender.gender,
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
            hoop_level: selectedHoopLevel?.hoop_level,
            performance_goal: selectedPerformanceGoal?.performance_goal,
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
            pain_areas: painAreas.length ? painAreas : undefined,
        }));
    };

    const isAssessmentComplete = () => {
        return (
            assessmentState.gender &&
            assessmentState.hoop_level &&
            assessmentState.performance_goal &&
            assessmentState.environments &&
            assessmentState.pain_areas
        );
    };

    const onSubmitAssessment = async () => {
        const assessmentComplete = isAssessmentComplete();

        if (!assessmentComplete) {
            throw new Error("Assessment is not complete");
        }

        try {
            setSubmitLoading(true);
            const idToken = (
                await fetchAuthSession()
            ).tokens?.idToken?.toString();

            const response = await fetch(
                `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/intro`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(assessmentState),
                },
            );

            if (!response.ok) {
                throw new Error("Failed to submit assessment");
            }

            return true;
        } catch (error) {
            Burnt.toast({
                title: "Failed to submit assessment, please try again",
                preset: "error",
            });
            throw new Error("Failed to submit assessment");
        } finally {
            setSubmitLoading(false);
        }
    };

    return {
        assessmentState,
        onSlide1ValuesChange,
        onSlide2ValuesChange,
        onSlide3ValuesChange,
        onSlide4ValuesChange,
        onSubmitAssessment,
        submitLoading,
    };
}
