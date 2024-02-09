type exerciseType = "timer" | "tempo" | "mobility";

export type WorkoutPhases = "warmup" | "athleticism" | "recovery";

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

export interface ProgramWeek {
    name: string;
    day_1: ProgramDay;
    day_2: ProgramDay;
    day_3: ProgramDay;
    day_4: ProgramDay;
    day_5: ProgramDay;
    day_1_memo: string;
    day_2_memo: string;
    day_3_memo: string;
    day_4_memo: string;
    day_5_memo: string;
}

export interface Program {
    name: string;
    slug: string;
    description: string;
    weeks: ProgramWeek[];
    plan: string;
    teaser: string;
}

export interface IProgramsContext {
    programs: Program[];
    activeDay: number;
    activeWeek: number;
    programsFetching: boolean;
}

export interface ActivityWithPhase extends ProgramActivity {
    phase: WorkoutPhases;
    execution_mode: WorkoutExecutionMode;
}
export interface ProgramWeekWithSlug extends ProgramWeek {
    slug: string;
}
