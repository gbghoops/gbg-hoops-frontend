import { createContext, PropsWithChildren, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";
import slugify from "slugify";

import { IProgramsContext, Program } from "./types";

export const ProgramsContext = createContext<IProgramsContext | null>(null);

const fetchPrograms = async () => {
    const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL ?? "";

    try {
        const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
        const response = await fetch(`${backend_url}content`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching programs");
        }

        const data = await response.json();

        const programs: Program[] = data.programs;

        if (!programs.length) {
            return [];
        }

        const slugifiedPrograms = programs.map((program) => {
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

export default function ProgramsProvider({ children }: PropsWithChildren) {
    const { data, isLoading, error } = useQuery<Program[]>({
        queryKey: ["programs"],
        queryFn: fetchPrograms,
    });

    return (
        <ProgramsContext.Provider
            value={{
                programs: data && !error ? data : [],
                programsFetching: isLoading,
                activeDay: 1,
                activeWeek: 1,
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
