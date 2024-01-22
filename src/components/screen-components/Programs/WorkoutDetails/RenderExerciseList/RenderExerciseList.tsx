import { StyleSheet } from "react-native";
import { StyledImage } from "@src/components/styled-components";
import {
    ProgramActivity,
    ProgramDay,
    ProgramExercise,
    ProgramExerciseFields,
    WorkoutExecutionMode,
    WorkoutPhases,
} from "@src/context/ProgramsContext/types";
import { Text, View } from "tamagui";

interface RenderExerciseListProps {
    exerciseData: ProgramDay;
}

const RenderExerciseList = ({ exerciseData }: RenderExerciseListProps) => {
    if (!exerciseData) {
        return null;
    }

    const exercisesBlocks = exerciseData.exercises;

    const getPhaseTitle = (phase: WorkoutPhases) => {
        switch (phase) {
            case "warmup":
                return "Warmup";
            case "athleticism":
                return "Athleticism";
            case "recovery":
                return "Recovery";
            default:
                return "";
        }
    };

    const getSubBlockTitle = (
        exerciseType: WorkoutExecutionMode,
        activities: ProgramActivity[],
    ) => {
        switch (exerciseType) {
            case "circuit":
                return "";
            case "superset":
                if (activities.length === 2) {
                    return "Superset";
                }
                if (activities.length === 3) {
                    return "Triset";
                }
                return "Giant set";
            default:
                return "";
        }
    };

    const getExerciseTypeScheme = (
        exercise: ProgramExerciseFields["fields"],
    ) => {
        switch (exercise.type) {
            case "timer":
                return `${exercise.seconds_hold ?? 0} seconds`;
            case "tempo":
                return `${exercise.reps ?? 0} reps`;
            case "mobility":
                return `${
                    (exercise.seconds_hold ?? 0) +
                    (exercise.seconds_release ?? 0)
                } seconds`;
        }
    };

    return (
        <View mt="$20">
            {exercisesBlocks.map((exerciseBlock, index) => (
                <View key={index} mt="$10">
                    {/* Title */}
                    {getPhaseTitle(exerciseBlock.phase) ? (
                        <Text fontFamily="$heading" fontSize={"$20"} my="$10">
                            {getPhaseTitle(exerciseBlock.phase)}
                        </Text>
                    ) : null}

                    <View mt="$5">
                        {getSubBlockTitle(
                            exerciseBlock.type,
                            exerciseBlock.activities,
                        ) ? (
                            <Text
                                fontFamily={"$body"}
                                fontSize={"$16"}
                                my="$15"
                            >
                                {getSubBlockTitle(
                                    exerciseBlock.type,
                                    exerciseBlock.activities,
                                )}
                            </Text>
                        ) : null}

                        {exerciseBlock.exercises
                            .filter((e) => e.fields.type)
                            .map(({ fields: exercise }, index) => (
                                <View key={index}>
                                    <View
                                        fd="row"
                                        key={index}
                                        ai="center"
                                        borderBottomWidth={0.5}
                                        borderColor="$border_primary"
                                        py="$10"
                                    >
                                        <View width={"$100"} height={"$100"}>
                                            <StyledImage
                                                source={{
                                                    uri: `http:${exercise.thumbnail?.fields.file.url}`,
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
