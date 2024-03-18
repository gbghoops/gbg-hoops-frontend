import { WorkoutPhases } from "@src/context/ProgramsContext/types";

const getPhaseTitle = (phase: WorkoutPhases) => {
    switch (phase) {
        case "warmup":
            return "Warm Up";
        case "3d_strength":
            return "3D Strength";
        case "athleticism":
            return "Athleticism";
        case "force":
            return "Force";
        case "recovery":
            return "Recovery";
    }
};

export default getPhaseTitle;
