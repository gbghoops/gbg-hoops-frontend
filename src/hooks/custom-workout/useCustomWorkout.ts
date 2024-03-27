import { CustomWorkout } from "@src/context/ProgramsContext/types";
import { useQuery } from "@tanstack/react-query";
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

    return {
        customWorkout,
        getCustomWorkout,
        customWorkoutLoading,
        customWorkoutError,
    };
}
