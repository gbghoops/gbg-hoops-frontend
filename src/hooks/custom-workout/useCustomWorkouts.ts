import { useMutation } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";

interface CreateCustomWorkoutProps {
    name: string;
}

const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL ?? "";
const createCustomWorkout = async ({ name }: CreateCustomWorkoutProps) => {
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

export default function useCustomWorkouts() {
    const {
        mutateAsync: createCustomWorkoutMutation,
        isPending,
        error,
    } = useMutation({
        mutationFn: createCustomWorkout,
        mutationKey: ["createCustomWorkout"],
    });

    return {
        createCustomWorkout: createCustomWorkoutMutation,
        createCustomWorkoutLoading: isPending,
        createCustomWorkoutError: error,
    };
}
