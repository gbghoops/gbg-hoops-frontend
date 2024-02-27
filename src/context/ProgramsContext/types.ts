type exerciseType = "timer" | "tempo" | "mobility";

export type WorkoutPhases =
    | "warmup"
    | "athleticism"
    | "recovery"
    | "3d_strength"
    | "force";

export type WorkoutExecutionMode = "circuit" | "superset";

export interface ProgramSummary {
    name: string;
    thumbnail: string;
    reps?: number;
    phase: WorkoutPhases;
    timer_type: exerciseType;
    group_type: WorkoutExecutionMode;
    seconds: number;
    sets: number;
}

export interface EquipmentData {
    name: string;
    thumbnail: string;
    contentful_id: string;
}

export interface ProgramActivity {
    name: string;
    type?: exerciseType;
    sets: number;
    include_weights?: boolean;
    uni_lateral?: boolean;
    reps?: number;
    seconds_hold: number;
    seconds_up?: number;
    seconds_down?: number;
    seconds_release?: number;
    video: string;
    instructional_video: string;
    thumbnail: string;
    equipment: EquipmentData[];
    meta_workout_template: string[];
    meta_type: string[];
    meta_environment: string[];
    metaEquipment: string[];
    meta_pain: string[];
    meta_mobility: string[];
    metaLowerbodyGoals: string[];
}
export interface ProgramExerciseFields {
    fields: {
        name: string;
        type: exerciseType;
        sets: number;
        reps?: number;
        seconds_hold: number;
        seconds_up?: number;
        seconds_down?: number;
        seconds_release?: number;
        video: {
            fields: {
                title: string;
                video: {
                    fields: {
                        title: string;
                        file: {
                            url: string;
                            fileName: string;
                            contentType: string;
                        };
                    };
                };
            };
        };
        instructional_video: {
            fields: {
                title: string;
                file: {
                    url: string;
                    fileName: string;
                    contentType: string;
                };
            };
        };
        thumbnail: {
            fields: {
                title: string;
                file: {
                    url: string;
                    fileName: string;
                    contentType: string;
                };
            };
        };
        meta_workout_template: string[];
        meta_type: string[];
        meta_environment: string[];
        metaEquipment: string[];
        meta_pain: string[];
        meta_mobility: string[];
        metaLowerbodyGoals: string[];
    };
}

export interface ProgramExercise {
    title: string;
    type: WorkoutExecutionMode;
    phase: WorkoutPhases;
    exercises: ProgramExerciseFields[];
    activities: ProgramActivity[];
}

export interface ProgramDay {
    summary: ProgramSummary[];
    exercises: ProgramExercise[];
}

export interface Program {
    name: string;
    slug: string;
    description: string;
    weeks: ProgramWeek[];
    plan: string;
    teaser: string;
    contentful_id: string;
}

export interface LockedProgramWeek {
    name: string;
}
export interface LockedProgram {
    id: string;
    slug: string;
    name: string;
    description: string;
    is_locked: boolean;
    teaser: string;
    weeks: LockedProgramWeek[];
}

export interface IProgramsContext {
    programs: (Program | LockedProgram)[];
    activeDay: number;
    activeWeek: number;
    programsFetching: boolean;
}

export interface ActivityWithPhase extends ProgramActivity {
    phase: WorkoutPhases;
    execution_mode: WorkoutExecutionMode;
}

export type PossibleDays =
    | "day_1"
    | "day_2"
    | "day_3"
    | "day_4"
    | "day_5"
    | "day_6"
    | "day_7";

export type PossibleDaysMemo =
    | "day_1_memo"
    | "day_2_memo"
    | "day_3_memo"
    | "day_4_memo"
    | "day_5_memo"
    | "day_6_memo"
    | "day_7_memo";

export const possibleDays = [
    "day_1",
    "day_2",
    "day_3",
    "day_4",
    "day_5",
    "day_6",
    "day_7",
];

interface MappedDays {
    day_1: ProgramDay;
    day_2: ProgramDay;
    day_3: ProgramDay;
    day_4: ProgramDay;
    day_5: ProgramDay;
    day_6: ProgramDay;
    day_7: ProgramDay;
}

interface LockedMappedDays {
    day_1: any[];
    day_2: any[];
    day_3: any[];
    day_4: any[];
    day_5: any[];
    day_6: any[];
    day_7: any[];
}

interface MappedDaysMemo {
    day_1_memo: string;
    day_2_memo: string;
    day_3_memo: string;
    day_4_memo: string;
    day_5_memo: string;
    day_6_memo: string;
    day_7_memo: string;
}

export interface ProgramWeek extends MappedDays, MappedDaysMemo {
    name: string;
}

export interface LockedProgramWeek extends MappedDaysMemo, LockedMappedDays {}

export interface ProgramWeekWithSlug extends ProgramWeek {
    slug: string;
}
