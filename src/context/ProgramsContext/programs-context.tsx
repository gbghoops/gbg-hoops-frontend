import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import slugify from "slugify";

import { IProgramsContext, Program } from "./types";

export const ProgramsContext = createContext<IProgramsContext | null>(null);

const fetchPrograms = async () => {
    try {
        const response = await fetch(
            "https://85xdaz4vjb.execute-api.us-east-1.amazonaws.com/production/content",
            {
                method: "GET",
            },
        );

        if (!response.ok) {
            throw new Error("Error fetching programs");
        }

        const data = await response.json();

        const programs: Program[] = data.programs;

        if (!programs.length) {
            return [];
        }

        const slugifiedPrograms = programs.map((program) => ({
            ...program,
            slug: slugify(program.name, { lower: true }),
        }));

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

    useEffect(() => {
        console.log("data", data);
    }, [data]);

    return (
        <ProgramsContext.Provider
            value={{
                programs: data && !error ? data : [],
                programsFetching: isLoading,
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
