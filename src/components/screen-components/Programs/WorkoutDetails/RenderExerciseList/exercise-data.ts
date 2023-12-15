import { ImageURISource } from "react-native";

export type SetsType = "reps" | "time";

export interface Exercise {
    exerciseName: string;
    setsCount: number;
    setsType: SetsType;
    exerciseImage: ImageURISource;
    time: number | null;
    reps: number | null;
    repSuffix: string | null;
}

export interface ExerciseSubBlock {
    isSubBlock: boolean;
    subBlockTitle: string;
    exercises: Exercise[];
}

export interface ExerciseData {
    blockTitle: string;
    isRestBlock: boolean;
    subBlock: ExerciseSubBlock[];
}

const exerciseData: ExerciseData[] = [
    {
        blockTitle: "Warm Up",
        isRestBlock: false,
        subBlock: [
            {
                isSubBlock: false,
                subBlockTitle: "",
                exercises: [
                    {
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
        isRestBlock: false,
        subBlock: [
            {
                isSubBlock: false,
                subBlockTitle: "",
                exercises: [
                    {
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
                        exerciseName: "RFE RDL OH Reach",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                    {
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
        isRestBlock: false,
        subBlock: [
            {
                isSubBlock: true,
                subBlockTitle: "Triset",
                exercises: [
                    {
                        exerciseName: "Wall Assisted 1L RDL",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                    {
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
