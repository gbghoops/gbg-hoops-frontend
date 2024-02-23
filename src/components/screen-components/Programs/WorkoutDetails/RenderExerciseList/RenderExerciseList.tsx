import { StyleSheet } from "react-native";
import { StyledImage } from "@src/components/styled-components";
import {
    ProgramDay,
    ProgramSummary,
    WorkoutPhases,
} from "@src/context/ProgramsContext/types";
import { Text, View } from "tamagui";

interface RenderExerciseListProps {
    exerciseData: ProgramDay;
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

const RenderExerciseList = ({ exerciseData }: RenderExerciseListProps) => {
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
                                                : 0.5
                                        }
                                        borderColor="$border_primary"
                                        py="$10"
                                    >
                                        <View
                                            width={"$100"}
                                            height={"$100"}
                                            backgroundColor={"$surface_primary"}
                                        >
                                            <StyledImage
                                                source={{
                                                    uri: `http:${exercise.thumbnail}`,
                                                }}
                                                style={styles.exerciseImage}
                                            />
                                        </View>
                                        <View pl="$20" f={1}>
                                            <Text
                                                fontSize={"$20"}
                                                fontFamily={"$heading"}
                                                color={"$gold"}
                                                width={"100%"}
                                                lineHeight={25}
                                            >
                                                {exercise.name}
                                            </Text>
                                            <View
                                                flexDirection="row"
                                                mt="$10"
                                                ai="center"
                                            >
                                                <Text
                                                    fontFamily={"$body"}
                                                    fontSize="$16"
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
                                                >
                                                    |
                                                </Text>
                                                <Text
                                                    fontFamily={"$body"}
                                                    fontSize="$16"
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
        </View>
    );
};

const styles = StyleSheet.create({
    exerciseImage: {
        width: "100%",
        height: "100%",
    },
});

export default RenderExerciseList;
