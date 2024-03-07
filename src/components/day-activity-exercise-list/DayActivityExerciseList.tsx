import { ActivityIndicator, StyleSheet } from "react-native";
import Image from "react-native-image-progress";
import {
    ProgramDay,
    ProgramSummary,
    WorkoutPhases,
} from "@src/context/ProgramsContext/types";
import { colors } from "@src/styles/theme/colors";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

import Button from "../button/Button";
import CompletedTag from "../completed-tag/CompletedTag";

interface DayActivityExerciseListProps {
    exercisesCompleted?: boolean;
    exerciseData: ProgramDay;
    dayWorkoutPath?: string;
    allowRedo?: boolean;
}

interface GroupedExercises {
    [key: string]: ProgramSummary[];
}

const mapPhaseToTitle = (phase: WorkoutPhases) => {
    switch (phase) {
        case "3d_strength":
            return "3D Strength";

        case "athleticism":
            return "Athleticism";

        case "recovery":
            return "Recovery";

        case "warmup":
            return "Warmup";

        case "force":
            return "Force";
        default:
            return phase;
    }
};

const DayActivityExerciseList = ({
    exerciseData,
    allowRedo = false,
    exercisesCompleted = false,
    dayWorkoutPath = "",
}: DayActivityExerciseListProps) => {
    const router = useRouter();
    if (!exerciseData) {
        return null;
    }

    const exerciseSummary = exerciseData.summary;

    const getExerciseBlocksByPhases = (exerciseSummary: ProgramSummary[]) => {
        const groupedExercises: GroupedExercises = {
            warmup: [],
            athleticism: [],
            recovery: [],
            "3d_strength": [],
            force: [],
            none: [],
        };

        exerciseSummary.forEach((exercise) => {
            groupedExercises[exercise.phase]
                ? groupedExercises[exercise.phase].push(exercise)
                : groupedExercises["none"].push(exercise);
        });

        return Object.keys(groupedExercises).map((phase) => {
            return {
                phase: phase as WorkoutPhases | "none",
                activities: groupedExercises[phase] as ProgramSummary[],
            };
        });
    };

    const phases = getExerciseBlocksByPhases(exerciseSummary);

    const getExerciseTypeScheme = (exercise: ProgramSummary) => {
        switch (exercise.timer_type) {
            case "timer":
                return `${exercise.seconds ?? 0} seconds`;
            case "tempo":
                return `${exercise.reps ?? 0} reps`;
            case "mobility":
                return `${exercise.seconds ?? 0} seconds`;

            default:
                return `${
                    exercise.seconds
                        ? `${exercise.seconds} seconds`
                        : `${exercise.reps} reps`
                }`;
        }
    };

    return (
        <View>
            {phases.map((phase, index) => (
                <View key={index} mt="$5">
                    {/* Title */}
                    {phase.activities.length && phase.phase !== "none" ? (
                        <Text fontFamily="$heading" fontSize={"$20"} my="$10">
                            {mapPhaseToTitle(phase.phase)}
                        </Text>
                    ) : null}

                    <View mt="$5">
                        {phase.activities
                            .filter((e) => e.timer_type)
                            .map((exercise, index, activities) => (
                                <View key={index}>
                                    <View
                                        fd="row"
                                        key={index}
                                        ai="center"
                                        borderBottomWidth={
                                            activities.length === index + 1
                                                ? 0
                                                : 0.25
                                        }
                                        borderColor="$border_primary"
                                        py="$10"
                                    >
                                        <View
                                            width={"$100"}
                                            height={"$100"}
                                            backgroundColor={"$surface_primary"}
                                        >
                                            <Image
                                                source={{
                                                    uri: `http:${exercise.thumbnail}`,
                                                }}
                                                indicator={() => (
                                                    <ActivityIndicator
                                                        size="small"
                                                        color={colors.gold}
                                                    />
                                                )}
                                                style={styles.exerciseImage}
                                            />
                                        </View>
                                        <View pl="$20" f={1}>
                                            <View>
                                                <Text
                                                    fontSize={"$20"}
                                                    fontFamily={"$heading"}
                                                    color={
                                                        exercisesCompleted
                                                            ? "$text_accent"
                                                            : "$gold"
                                                    }
                                                    width={"100%"}
                                                    lineHeight={25}
                                                >
                                                    {exercise.name}
                                                </Text>
                                                {exercisesCompleted ? (
                                                    <View w="$90" mt="$5">
                                                        <CompletedTag />
                                                    </View>
                                                ) : null}
                                            </View>

                                            <View
                                                flexDirection="row"
                                                mt="$10"
                                                ai="center"
                                            >
                                                <Text
                                                    fontFamily={"$body"}
                                                    fontSize="$16"
                                                    color={
                                                        exercisesCompleted
                                                            ? "$text_accent"
                                                            : "$text_primary"
                                                    }
                                                >
                                                    {`${exercise.sets} set${
                                                        exercise.sets > 1
                                                            ? "s"
                                                            : ""
                                                    }`}
                                                </Text>
                                                <Text
                                                    mx={"$10"}
                                                    fontFamily={"$body"}
                                                    fontSize="$16"
                                                    color={
                                                        exercisesCompleted
                                                            ? "$text_accent"
                                                            : "$text_primary"
                                                    }
                                                >
                                                    |
                                                </Text>
                                                <Text
                                                    fontFamily={"$body"}
                                                    fontSize="$16"
                                                    color={
                                                        exercisesCompleted
                                                            ? "$text_accent"
                                                            : "$text_primary"
                                                    }
                                                >
                                                    {`${getExerciseTypeScheme(
                                                        exercise,
                                                    )}`}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                    </View>
                </View>
            ))}
            {allowRedo && dayWorkoutPath ? (
                <View mx="$20" mt="$20" mb="$20">
                    <Button
                        text="Redo"
                        secondary_transparent
                        fullWidth
                        onPress={() => router.push(dayWorkoutPath)}
                    />
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    exerciseImage: {
        width: "100%",
        height: "100%",
    },
});

export default DayActivityExerciseList;
