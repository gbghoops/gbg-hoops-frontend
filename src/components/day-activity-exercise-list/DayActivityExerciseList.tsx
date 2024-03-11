import { ActivityIndicator, StyleSheet } from "react-native";
import { CachedImage } from "@georstat/react-native-image-cache";
import {
    CompletedExerciseProgress,
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
    progress?: CompletedExerciseProgress[];
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
    progress = [],
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

    return (
        <View>
            {phases.map((phase, index) => (
                <View key={index}>
                    {/* Title */}
                    {phase.activities.length && phase.phase !== "none" ? (
                        <Text fontFamily="$heading" fontSize={"$20"} my="$5">
                            {mapPhaseToTitle(phase.phase)}
                        </Text>
                    ) : null}

                    <View>
                        {phase.activities
                            .filter((e) => e.timer_type)
                            .map((exercise, index, activities) => (
                                <RenderPhaseActivities
                                    key={exercise.exercise_id}
                                    exercise={exercise}
                                    exercisesCompleted={exercisesCompleted}
                                    isLastItem={index === activities.length - 1}
                                    progress={progress ?? []}
                                />
                            ))}
                    </View>
                </View>
            ))}
            {allowRedo && dayWorkoutPath ? (
                <View mt="$20" mb="$30">
                    <Button
                        text="Redo Workout"
                        secondary_transparent
                        fullWidth
                        onPress={() => router.push(dayWorkoutPath)}
                    />
                </View>
            ) : null}
        </View>
    );
};

interface RenderPhaseActivitiesProps {
    exercise: ProgramSummary;
    exercisesCompleted?: boolean;
    isLastItem?: boolean;
    progress?: CompletedExerciseProgress[];
}
const RenderPhaseActivities = ({
    exercise,
    exercisesCompleted,
    isLastItem,
    progress = [],
}: RenderPhaseActivitiesProps) => {
    // Find exercise in progress data
    const exerciseProgress = progress.filter(
        (e) => e.exercise_id === exercise.exercise_id,
    );

    return (
        <View
            fd="row"
            ai="center"
            borderBottomWidth={isLastItem ? 0 : 0.25}
            borderColor="$border_primary"
            py="$10"
        >
            <View
                width={"$100"}
                height={"$100"}
                backgroundColor={"$surface_primary"}
            >
                <CachedImage
                    source={`http:${exercise.thumbnail}`}
                    loadingImageComponent={() => (
                        <ActivityIndicator size="small" color={colors.gold} />
                    )}
                    style={styles.exerciseImage}
                />
            </View>
            <View pl="$20" f={1}>
                <View>
                    <Text
                        fontSize={"$20"}
                        fontFamily={"$heading"}
                        color={exercisesCompleted ? "$text_accent" : "$gold"}
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
                <RenderExerciseWorkMerics
                    exercise={exercise}
                    exercisesCompleted={exercisesCompleted}
                    progress={exerciseProgress}
                />
            </View>
        </View>
    );
};

interface RenderExerciseWorkMetricsProps {
    exercisesCompleted?: boolean;
    exercise: ProgramSummary;
    progress?: CompletedExerciseProgress[];
}
const RenderExerciseWorkMerics = ({
    exercise,
    exercisesCompleted,
    progress = [],
}: RenderExerciseWorkMetricsProps) => {
    const sets = exercise.sets;
    const scheme = getExerciseTypeScheme(exercise);

    return exercisesCompleted ? (
        Array.from({ length: sets }).map((_, index) => (
            <ExerciseWorkMetrics
                key={index}
                sets={sets}
                exerciseScheme={scheme}
                isCompletedSummary={exercisesCompleted}
                setIndex={index + 1}
                weight={progress[index]?.weight}
            />
        ))
    ) : (
        <ExerciseWorkMetrics sets={sets} exerciseScheme={scheme} />
    );
};

interface ExerciseWorkMetricsProps {
    sets: number;
    exerciseScheme: string;
    isCompletedSummary?: boolean;
    setIndex?: number;
    weight?: number;
}

const ExerciseWorkMetrics = ({
    sets,
    exerciseScheme,
    isCompletedSummary,
    setIndex,
    weight = 0,
}: ExerciseWorkMetricsProps) => {
    const color = isCompletedSummary ? "$text_accent" : "$text_primary";

    return (
        <View flexDirection="row" mt="$10" ai="center">
            <Text fontFamily={"$body"} fontSize="$16" color={color}>
                {isCompletedSummary
                    ? `Set ${setIndex}`
                    : `${sets} set${sets > 1 ? "s" : ""}`}
            </Text>
            <Text mx={"$10"} fontFamily={"$body"} fontSize="$16" color={color}>
                |
            </Text>
            <Text fontFamily={"$body"} fontSize="$16" color={color}>
                {`${exerciseScheme}`}
            </Text>
            {weight ? (
                <>
                    <Text
                        mx={"$10"}
                        fontFamily={"$body"}
                        fontSize="$16"
                        color={color}
                    >
                        |
                    </Text>
                    <Text fontFamily={"$body"} fontSize="$16" color={color}>
                        {weight} lbs
                    </Text>
                </>
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

export default DayActivityExerciseList;
