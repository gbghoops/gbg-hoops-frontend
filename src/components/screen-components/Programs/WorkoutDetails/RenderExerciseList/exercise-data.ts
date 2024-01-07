import { ImageURISource } from "react-native";

export type SetsType = "reps" | "time";

export type Exercise = {
    block_id: number;
    type: "exercise";
    parentBlockTitle: string;
    subBlockTitle: string | null;
    exerciseName: string;
    setsCount: number;
    setsType: SetsType;
    exerciseImage: ImageURISource;
    time: number | null;
    reps: number | null;
    repSuffix: string | null;
    repDuration?: number;
};

export type RestBlock = {
    type: "rest";
    block_id: number;
    isRestBlock: boolean;
    restDuration: number;
};

export interface ExerciseSubBlock {
    isSubBlock: boolean;
    subBlockTitle: string;
    exercises: (Exercise | RestBlock)[];
}

export interface ExerciseData {
    blockTitle: string;
    subBlock: ExerciseSubBlock[];
}

const exerciseData: ExerciseData[] = [
    {
        blockTitle: "Warm Up",
        subBlock: [
            {
                isSubBlock: false,
                subBlockTitle: "",
                exercises: [
                    {
                        block_id: 1,
                        type: "exercise",
                        parentBlockTitle: "Warm Up",
                        subBlockTitle: null,
                        exerciseName: "Frog Stretch & Gas",
                        setsCount: 1,
                        setsType: "time",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: 60,
                        reps: null,
                        repSuffix: "seconds",
                    },
                ],
            },
            {
                isSubBlock: false,
                subBlockTitle: "",
                exercises: [
                    {
                        block_id: 2,
                        type: "exercise",
                        parentBlockTitle: "Warm Up",
                        subBlockTitle: null,
                        exerciseName:
                            "Miniband Big Toe Smash Hip Lock ISO Hold",
                        setsCount: 1,
                        setsType: "time",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: 40,
                        reps: null,
                        repSuffix: "seconds per side",
                    },
                ],
            },
        ],
    },
    {
        blockTitle: "Athleticism",
        subBlock: [
            {
                isSubBlock: false,
                subBlockTitle: "",
                exercises: [
                    {
                        block_id: 3,
                        type: "exercise",
                        parentBlockTitle: "Athleticism",
                        subBlockTitle: null,
                        exerciseName: "Bench Elevated Wide Base Reach",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                ],
            },
            {
                isSubBlock: true,
                subBlockTitle: "Superset",
                exercises: [
                    {
                        block_id: 4,
                        type: "exercise",
                        parentBlockTitle: "Athleticism",
                        subBlockTitle: "Superset",
                        exerciseName: "RFE RDL OH Reach",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                    {
                        block_id: 5,
                        type: "exercise",
                        parentBlockTitle: "Athleticism",
                        subBlockTitle: "Superset",
                        exerciseName: "RFE RDL OH Reach",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                ],
            },
        ],
    },
    {
        blockTitle: "Recovery",
        subBlock: [
            {
                isSubBlock: true,
                subBlockTitle: "Triset",
                exercises: [
                    {
                        block_id: 6,
                        type: "exercise",
                        parentBlockTitle: "Recovery",
                        subBlockTitle: "Triset",
                        exerciseName: "Wall Assisted 1L RDL",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                    {
                        block_id: 7,
                        type: "rest",
                        isRestBlock: true,
                        restDuration: 30,
                    },
                    {
                        block_id: 7,
                        type: "exercise",
                        parentBlockTitle: "Recovery",
                        subBlockTitle: "Triset",
                        exerciseName:
                            "Mini band Big Toe Smash Hip Lock ISO Hold with Head Turnh",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                    {
                        block_id: 8,
                        type: "exercise",
                        parentBlockTitle: "Recovery",
                        subBlockTitle: "Triset",
                        exerciseName: "Mini band Big Toe Spread 1L RDL",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                ],
            },
        ],
    },
];

export default exerciseData;
