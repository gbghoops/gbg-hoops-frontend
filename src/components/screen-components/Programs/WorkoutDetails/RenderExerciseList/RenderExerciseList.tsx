import { StyleSheet } from "react-native";
import { StyledImage } from "@src/components/styled-components";
import { Text, View } from "tamagui";

import { ExerciseData } from "./exercise-data";

interface RenderExerciseListProps {
    exerciseData: ExerciseData[];
}

const RenderExerciseList = ({ exerciseData }: RenderExerciseListProps) => {
    return (
        <View mt="$20">
            {exerciseData.map((exerciseBlock, index) => (
                <View key={index} mt="$10">
                    {/* Title */}
                    <Text fontFamily="$heading" fontSize={"$20"} my="$10">
                        {exerciseBlock.blockTitle}
                    </Text>
                    {exerciseBlock.isRestBlock ? (
                        <View mt="$10">
                            <Text fontFamily={"$heading"} fontSize={"$16"}>
                                Rest
                            </Text>
                        </View>
                    ) : null}
                    <View mt="$5">
                        {exerciseBlock.subBlock.map((subBlock, index) => (
                            <View key={index}>
                                {subBlock.isSubBlock ? (
                                    <Text
                                        fontFamily={"$body"}
                                        fontSize={"$16"}
                                        my="$15"
                                    >
                                        {subBlock.subBlockTitle}
                                    </Text>
                                ) : null}
                                {subBlock.exercises.map((exercise, index) => (
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
                                                source={exercise.exerciseImage}
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
                                                {exercise.exerciseName}
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
                                                    {`${
                                                        exercise.setsCount
                                                    } set${
                                                        exercise.setsCount > 1
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
                                                    {`${
                                                        exercise.reps ??
                                                        exercise.time
                                                    } ${exercise.repSuffix}`}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
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
