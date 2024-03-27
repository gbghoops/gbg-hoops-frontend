import {
    CustomWorkout,
    Exercise,
    ProgramActivity,
} from "@src/context/ProgramsContext/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";

const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL ?? "";
const getCustomWorkoutById = async (workout_id: string) => {
    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();

    try {
        const response = await fetch(
            `${backend_url}/content/custom_workout?workout_id=${workout_id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            },
        );

        if (!response.ok) {
            throw new Error("Error fetching custom workout");
        }

        const res = await response.json();

        return res.custom_workout;
    } catch (e) {
        throw new Error("Error fetching custom workout");
    }
};

interface UpdateCustomWorkoutArgs {
    name: string;
    workout_id: string;
    activities: (Exercise | ProgramActivity)[];
}
const updateCustomWorkout = async ({
    name,
    workout_id,
    activities,
}: UpdateCustomWorkoutArgs) => {
    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();

    try {
        const response = await fetch(`${backend_url}/content/custom_workouts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${idToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, workout_id, activities }),
        });

        if (!response.ok) {
            throw new Error("Error updating custom workout");
        }

        return await response.json();
    } catch (e) {
        throw new Error("Error updating custom workout");
    }
};

export default function useCustomWorkout(workout_id: string) {
    const {
        data: customWorkout,
        refetch: getCustomWorkout,
        isLoading: customWorkoutLoading,
        error: customWorkoutError,
    } = useQuery<CustomWorkout>({
        queryFn: () => getCustomWorkoutById(workout_id),
        queryKey: ["customWorkout", workout_id],
    });

    const {
        data: updateCustomWorkoutResponse,
        mutateAsync: updateCustomWorkoutMutation,
        isPending: updateCustomWorkoutPending,
        error: updateCustomWorkoutError,
    } = useMutation({
        mutationFn: ({
            workout_id,
            name,
            activities,
        }: UpdateCustomWorkoutArgs) =>
            updateCustomWorkout({
                workout_id,
                name,
                activities,
            }),
        mutationKey: ["updateCustomWorkout"],
    });

    return {
        customWorkout,
        getCustomWorkout,
        customWorkoutLoading,
        customWorkoutError,
        updateCustomWorkoutResponse,
        updateCustomWorkout: updateCustomWorkoutMutation,
        updateCustomWorkoutPending,
        updateCustomWorkoutError,
    };
}
