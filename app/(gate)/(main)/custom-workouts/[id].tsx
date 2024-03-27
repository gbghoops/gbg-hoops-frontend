import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Octicons } from "@expo/vector-icons";
import Button from "@src/components/button/Button";
import DayActivityExerciseList from "@src/components/day-activity-exercise-list/DayActivityExerciseList";
import AddExerciseSheet from "@src/components/screen-components/CustomWorkoutCard/AddExerciseSheet";
import PageError from "@src/components/screen-components/PageError/PageError";
import EquipmentList from "@src/components/screen-components/Programs/WorkoutDetails/EquipmentList/EquipmentList";
import { EquipmentData } from "@src/context/ProgramsContext/types";
import useCustomWorkout from "@src/hooks/custom-workout/useCustomWorkout";
import { colors } from "@src/styles/theme/colors";
import getEquipmentFromExerciseData from "@src/utils/getEquipmentFromExerciseData";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useLocalSearchParams } from "expo-router";
import { Text, View, YStack } from "tamagui";

export default function CustomWorkouts() {
    const { id } = useLocalSearchParams();
    const {
        customWorkout,
        customWorkoutLoading,

        customWorkoutError,
    } = useCustomWorkout(id as string);
    const [showAddExerciseSheet, setShowAddExerciseSheet] = useState(false);

    // TODO: Remember to show error state / error message
    if (customWorkoutError || (!customWorkoutLoading && !customWorkout)) {
        return <PageError />;
    }

    const equipmentData: EquipmentData[] = getEquipmentFromExerciseData(
        customWorkout?.exercises || [],
    );

    const summary = customWorkout?.summary || [];

    return (
        <YStack f={1} backgroundColor={"$surface_background"}>
            {customWorkoutLoading ? (
                <View f={1} jc="center" ai="center">
                    <ActivityIndicator size="large" color={colors.gold} />
                </View>
            ) : (
                <View f={1}>
                    {/* Header */}
                    <View
                        flexDirection="row"
                        justifyContent="space-between"
                        ai="center"
                        mt="$20"
                        px="$20"
                    >
                        <Text
                            fontSize={"$30"}
                            fontFamily={"$acuminProBold"}
                            numberOfLines={2}
                            textOverflow="ellipsis"
                            flexShrink={0}
                            maxWidth={"80%"}
                        >
                            {customWorkout?.name || "Custom Workout"}
                        </Text>
                        <View width={"$24"} jc="center" ai="center">
                            <Octicons
                                name="kebab-horizontal"
                                size={wn(20)}
                                color={colors.gold}
                            />
                        </View>
                    </View>
                    <View f={1}>
                        {/* Equipment Needed. */}
                        {equipmentData.length > 0 ? (
                            <>
                                <View px={"$20"} my="$40" mb="$10">
                                    <Text ff={"$heading"} fontSize={"$24"}>
                                        Equipment Needed
                                    </Text>
                                </View>
                                <EquipmentList equipments={equipmentData} />
                            </>
                        ) : null}
                        {summary.length < 1 ? (
                            <View f={1} ai="center" jc="center" mb="$100">
                                <View ai="center" w="90%">
                                    <View mb="$20">
                                        <Octicons
                                            name="alert"
                                            size={wn(50)}
                                            color={colors.gold}
                                        />
                                    </View>
                                    <Text
                                        fontSize={"$20"}
                                        textAlign="center"
                                        fontFamily={"$acuminProSemibold"}
                                    >{`You haven't created any Exercises for this workout.`}</Text>
                                    <Text
                                        mt="$10"
                                        fontSize={"$16"}
                                        textAlign="center"
                                        fontFamily={"$acuminProRegular"}
                                    >{`Get started by pressing the button below.`}</Text>
                                </View>
                                <View mt="$20">
                                    <Button
                                        text="Add Exercise"
                                        onPress={() =>
                                            setShowAddExerciseSheet(true)
                                        }
                                    />
                                </View>
                            </View>
                        ) : (
                            <View mx={"$20"} borderWidth={1} borderColor="red">
                                <View mt={"$20"}>
                                    <DayActivityExerciseList
                                        exerciseSummary={summary ?? []}
                                    />
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            )}
            <AddExerciseSheet
                open={showAddExerciseSheet}
                onOpenStateChange={setShowAddExerciseSheet}
            />
        </YStack>
    );
}
