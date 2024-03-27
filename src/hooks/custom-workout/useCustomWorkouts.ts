import { CustomWorkout } from "@src/context/ProgramsContext/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";

interface CreateCustomWorkoutProps {
    name: string;
}

const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL ?? "";
const createCustomWorkout = async ({
    name,
}: CreateCustomWorkoutProps): Promise<CustomWorkout> => {
    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();

    try {
        const response = await fetch(`${backend_url}/content/custom_workouts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${idToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, activities: [] }),
        });

        if (!response.ok) {
            throw new Error("Error creating custom workout");
        }

        return await response.json();
    } catch (e) {
        throw new Error("Error creating custom workout");
    }
};

const getCustomWorkouts = async () => {
    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();

    try {
        const response = await fetch(`${backend_url}/content/custom_workouts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching custom workouts");
        }

        const res = await response.json();

        return res.custom_workouts;
    } catch (e) {
        throw new Error("Error fetching custom workouts");
    }
};

export default function useCustomWorkouts() {
    const {
        mutateAsync: createCustomWorkoutMutation,
        isPending,
        error,
    } = useMutation({
        mutationFn: createCustomWorkout,
        mutationKey: ["createCustomWorkout"],
    });

    const {
        data: customWorkouts,
        isLoading: customWorkoutsLoading,
        error: customWorkoutsError,
        refetch: fetchCustomWorkouts,
    } = useQuery<CustomWorkout[]>({
        queryFn: getCustomWorkouts,
        queryKey: ["customWorkouts"],
    });

    return {
        customWorkouts,
        customWorkoutsLoading,
        customWorkoutsError,
        fetchCustomWorkouts,
        createCustomWorkout: createCustomWorkoutMutation,
        createCustomWorkoutLoading: isPending,
        createCustomWorkoutError: error,
    };
}
