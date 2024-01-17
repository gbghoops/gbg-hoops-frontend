interface ProgramSummary {}

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
}

interface ProgramDay {
    summary: ProgramSummary;
    exercises: ProgramExercise[];
}

interface ProgramWeek {
    name: string;
    day_one: ProgramDay;
    day_two: ProgramDay;
    day_three: ProgramDay;
    day_four: ProgramDay;
    day_five: ProgramDay;
}

interface Program {
    name: string;
    description: string;
    weeks: ProgramWeek[];
    plan: string;
    teaser: string;
}

interface IProgramsContext {
    programs: Program[];
    getPrograms: () => Promise<void>;
}
