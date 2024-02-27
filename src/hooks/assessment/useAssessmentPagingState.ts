import { useMemo, useState } from "react";
import { useRouter } from "expo-router";

import { AssessmentState } from "./useAssessmentState";

const NUM_PAGES = 4;

interface AssessmentPagingState {
    assessmentState: AssessmentState;
}
export default function useAssessmentPagingState({
    assessmentState,
}: AssessmentPagingState) {
    const [[page, going], setPage] = useState([0, 0]);
    const [showAssessmentExitModal, setShowAssessmentExitModal] =
        useState(false);

    const pageNext = () => {
        setPage((prev) => {
            if (prev[0] === NUM_PAGES - 1) return prev;

            return [prev[0] + 1, 1];
        });
    };

    const pageBack = () => {
        setPage((prev) => {
            if (prev[0] === 0) {
                console.log("Set exit modal");
                setShowAssessmentExitModal(true);
                return prev;
            }

            return [prev[0] - 1, -1];
        });
    };

    const canContinue = useMemo(() => {
        if (page === 0 && !assessmentState.gender) return false;

        if (
            page === 1 &&
            (!assessmentState.hoop_level || !assessmentState.performance_goal)
        )
            return false;

        if (page === 2 && !assessmentState.environments?.length) return false;

        if (page === 3 && !assessmentState.pain_areas?.length) return false;

        return true;
    }, [assessmentState, page]);

    return {
        page,
        going,
        pageNext,
        pageBack,
        canContinue,
        showAssessmentExitModal,
        setShowAssessmentExitModal,
    };
}
