import { createContext, PropsWithChildren, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";
import slugify from "slugify";

import {
    IProgramsContext,
    LockedProgram,
    Program,
    ProgramProgress,
    WorkoutCompleteArgs,
} from "./types";

export const ProgramsContext = createContext<IProgramsContext | null>(null);

const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL ?? "";

const fetchProgramsProgress = async (): Promise<ProgramProgress[]> => {
    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    const response = await fetch(`${backend_url}/users/progress`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching programs progress");
    }

    const data = await response.json();

    return data;
};

const fetchPrograms = async () => {
    try {
        const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
        const response = await fetch(`${backend_url}/content`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching programs");
        }

        const data = await response.json();

        const programProgress = await fetchProgramsProgress();

        const _programs: Program[] = data.programs;
        const _lockedPrograms: LockedProgram[] = data.lockedPrograms;

        const programsWithProgress = _programs
            .filter((p) => !!p)
            .map((program) => {
                const progress = programProgress.find(
                    (p) => p.program_id === program.contentful_id,
                );

                return {
                    ...program,
                    progress: progress ?? null,
                };
            });

        const programs = [...programsWithProgress, ..._lockedPrograms];

        const slugifiedPrograms = programs.map((program) => {
            if ("is_locked" in program) {
                return {
                    ...program,
                    slug: slugify(program.name, { lower: true }),
                };
            }

            const slugifiedWeeks = program.weeks.map((week) => ({
                ...week,
                slug: slugify(week.name, { lower: true }),
            }));

            return {
                ...program,
                weeks: slugifiedWeeks,
                slug: slugify(program.name, { lower: true }),
            };
        });

        return slugifiedPrograms;
    } catch (error) {
        throw new Error("Error fetching programs");
    }
};

const addProgramToUser = async (programId: string) => {
    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();

    const response = await fetch(`${backend_url}/users/progress`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            program_id: programId,
            week_completed: 0,
            day_completed: 0,
            exercises_completed: [],
        }),
    });

    if (!response.ok) {
        throw new Error("Error adding program to user");
    }

    return response.json();
};

const onWorkoutComplete = async ({
    programId,
    weekCompleted,
    dayCompleted,
    exercisesCompleted,
    completed_at,
}: WorkoutCompleteArgs) => {
    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();

    const response = await fetch(`${backend_url}/users/progress`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            program_id: programId,
            week_completed: weekCompleted,
            day_completed: dayCompleted,
            exercises_completed: exercisesCompleted,
            completed_at,
        }),
    });

    if (!response.ok) {
        throw new Error("Error adding program to user");
    }

    return response.json();
};

export default function ProgramsProvider({ children }: PropsWithChildren) {
    const {
        data,
        isLoading,
        error,
        refetch: refetchPrograms,
    } = useQuery<(Program | LockedProgram)[]>({
        queryKey: ["programs"],
        queryFn: fetchPrograms,
        refetchOnReconnect: true,
    });

    const {
        data: progressData,
        isLoading: isProgressDataLoading,
        error: programDataError,
    } = useQuery<ProgramProgress[]>({
        queryKey: ["programsProgress"],
        queryFn: fetchProgramsProgress,
    });

    return (
        <ProgramsContext.Provider
            value={{
                programs: data && !error ? data : [],
                programsFetching: isLoading,
                programsProgress:
                    progressData && !programDataError ? progressData : [],
                programsProgressFetching: isProgressDataLoading,
                addProgramToUser,
                onWorkoutComplete,
                refetchPrograms,
            }}
        >
            {children}
        </ProgramsContext.Provider>
    );
}

export const usePrograms = () => {
    const context = useContext(ProgramsContext);

    if (!context) {
        throw new Error("usePrograms must be used within a ProgramsProvider");
    }

    return context;
};
