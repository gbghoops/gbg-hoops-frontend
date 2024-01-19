interface ProgramSummary {
    name: string;
    thumbnail: string;
    sets: number;
}

interface ProgramActivity {
    name: string;
    type: "timer" | "tempo" | "mobility";
    sets: number;
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
interface ProgramExerciseFields {
    fields: {
        name: string;
        type: "timer" | "tempo" | "mobility";
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

interface ProgramExercise {
    title: string;
    type: "circuit";
    exercises: ProgramExerciseFields[];
    activities: ProgramActivity[];
}

interface ProgramDay {
    summary: ProgramSummary;
    exercises: ProgramExercise[];
}

export interface ProgramWeek {
    name: string;
    slug: string;
    day_one: ProgramDay;
    day_two: ProgramDay;
    day_three: ProgramDay;
    day_four: ProgramDay;
    day_five: ProgramDay;
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
    programsFetching: boolean;
}
