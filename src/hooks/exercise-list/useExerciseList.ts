import {
    EquipmentData,
    exerciseType,
} from "@src/context/ProgramsContext/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";

interface FetchExercisesProps {
    page: number;
    search_term?: string;
}

export interface Exercise {
    name: string;
    video: string;
    instructional_video: string;
    thumbnail: string;
    type: exerciseType;
    uni_lateral: boolean;
    sets: number;
    contentful_id: string;
    include_weights: boolean;
    seconds_hold: number;
    equipment: EquipmentData[];
}

const fetchExercises = async ({
    page,
    search_term = "",
}: FetchExercisesProps) => {
    const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL ?? "";

    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    const response = await fetch(
        `${backend_url}/content/exercises?${new URLSearchParams({ page: String(page), search_term }).toString()}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Error fetching exercises");
    }

    const data = await response.json();

    return { data: data.exercises, nextPage: page + 1 };
};

interface ExerciseListProps {
    searchTerm: string;
}

export function useExerciseList({ searchTerm }: ExerciseListProps) {
    const {
        data: exercises,
        isLoading,
        isFetching,
        hasNextPage,
        fetchNextPage,
        refetch,
        error,
    } = useInfiniteQuery<{ data: Exercise[]; nextPage: number }>({
        queryKey: ["exercises"],
        queryFn: ({ pageParam = 0 }) =>
            fetchExercises({
                page: searchTerm ? 0 : (pageParam as number),
                search_term: searchTerm,
            }),
        getNextPageParam: (lastpage) => {
            if (lastpage.data?.length < 100) {
                return undefined;
            }

            return lastpage.nextPage;
        },
        initialPageParam: 0,
    });

    const flattenData = exercises?.pages.flatMap((page) => page.data);

    return {
        exercises: flattenData,
        isLoading: isLoading || isFetching,
        hasNextPage,
        refetch,
        fetchNextPage,
        error,
        isFetching,
    };
}
