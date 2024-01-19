import { useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import Button from "@src/components/button/Button";
import AddExerciseSheet from "@src/components/screen-components/Programs/WorkoutDetails/AddExerciseSheet/AddExerciseSheet";
import EquipmentList from "@src/components/screen-components/Programs/WorkoutDetails/EquipmentList/EquipmentList";
import ExerciseHeaderButton from "@src/components/screen-components/Programs/WorkoutDetails/ExerciseHeaderButton/ExerciseHeaderButton";
import ProgressIndicator from "@src/components/screen-components/Programs/WorkoutDetails/ProgressIndicator/ProgressIndicator";
import RenderExerciseList from "@src/components/screen-components/Programs/WorkoutDetails/RenderExerciseList/RenderExerciseList";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import getProgramDayInfo from "@src/context/ProgramsContext/utils/getProgramDayInfo";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, View } from "tamagui";

// Icon sizes:
const moreIconSize = wn(22);
const exerciseInfoIconSize = wn(20);

export default function WorkoutDetails() {
    const [exerciseSheetOpen, setExerciseSheetOpen] = useState(false);

    const router = useRouter();
    const { bottom } = useSafeAreaInsets();
    const { slug } = useLocalSearchParams();
    const { programs } = usePrograms();
    const activeWeek = 1;
    const activeDay = 1;

    const currentProgram = programs.find((program) => program.slug === slug);

    if (!currentProgram) {
        return null;
    }

    const weekData = currentProgram?.weeks[activeWeek - 1];

    const dayData = getProgramDayInfo({ week: weekData, day: activeDay });

    return (
        <View f={1} bc="$surface_background" position="relative">
            {/* Workout title */}
            <ScrollView
                f={1}
                contentContainerStyle={
                    styles({ contentContainer: { bottom } })
                        .contentContainerStyle
                }
            >
                <View p="$20" jc="space-between" ai="center" fd={"row"}>
                    <Text ff={"$heading"} fontSize="$20">
                        Workout Details
                    </Text>
                    <View
                        animation={"medium"}
                        pressStyle={{
                            opacity: 0.75,
                            scale: 0.9,
                        }}
                    >
                        <Octicons
                            name="kebab-horizontal"
                            color={colors.gold}
                            size={moreIconSize}
                        />
                    </View>
                </View>
                <View px={"$20"}>
                    <ProgressIndicator totalDays={5} currentDay={1} />
                </View>
                {/* Workout title. */}
                <View>
                    <Text
                        ff={"$heading"}
                        fontSize={"$40"}
                        px={"$20"}
                        mt="$30"
                        textTransform="uppercase"
                    >
                        {dayData.dayData.exercises[0].title}
                    </Text>
                </View>

                {/* Equipment Needed. */}
                <View px={"$20"} my="$40" mb="$10">
                    <Text ff={"$heading"} fontSize={"$24"}>
                        Equipment Needed
                    </Text>
                </View>
                <EquipmentList />

                <View px="$20">
                    {/* Exercises Header */}
                    <View fd="row" jc="space-between" mt={"$38"}>
                        <View fd="row" ai="center">
                            <Text ff="$heading" fontSize="$24">
                                Exercises
                            </Text>
                            <View
                                ml={"$10"}
                                animation="medium"
                                pressStyle={{
                                    opacity: 0.75,
                                    scale: 0.9,
                                }}
                            >
                                <Octicons
                                    name="info"
                                    color={colors.gold}
                                    size={exerciseInfoIconSize}
                                />
                            </View>
                        </View>
                        <View fd="row" ai="center">
                            <ExerciseHeaderButton
                                iconName="plus"
                                onPress={() => {
                                    setExerciseSheetOpen(true);
                                }}
                            />
                            <ExerciseHeaderButton
                                iconName="pencil"
                                onPress={() => {}}
                            />
                        </View>
                    </View>
                </View>

                {/* Exercise List */}
                <View mx={"$20"}>
                    <View>
                        <Text fontFamily={"$body"} fontSize={"$14"} mt={"$20"}>
                            {dayData.dayMemo}
                        </Text>
                    </View>
                    <RenderExerciseList exerciseData={dayData.dayData} />
                </View>

                <View mt="$40" mx="$20">
                    <Text
                        textTransform="uppercase"
                        fontFamily="$heading"
                        fontSize={"$24"}
                    >
                        Upcoming Workouts
                    </Text>
                    <View
                        mt="$20"
                        borderWidth={0.5}
                        borderColor="$border_primary"
                        height={wn(160)}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text fontFamily={"$body"} fontSize={"$18"}>
                            Upcoming workout goes in here...
                        </Text>
                    </View>
                </View>

                <View mt="$40" mx="$20">
                    <Text
                        textTransform="uppercase"
                        fontFamily="$heading"
                        fontSize={"$24"}
                    >
                        Completed Workouts
                    </Text>
                    <View
                        mt="$20"
                        borderWidth={0.5}
                        borderColor="$border_primary"
                        height={wn(160)}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text fontFamily={"$body"} fontSize={"$18"}>
                            Completed workout goes in here...
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <AddExerciseSheet
                setSheetOpen={setExerciseSheetOpen}
                sheetOpen={exerciseSheetOpen}
            />

            {/* Workout now button */}
            <View
                position="absolute"
                zIndex={10}
                bottom={bottom ? bottom + wn(20) : wn(50)}
                px={"$20"}
                width={"100%"}
            >
                <Button
                    text="Workout Now"
                    onPress={() => {
                        return router.replace(
                            `/workout/${slug}/${activeWeek}/${activeDay}`,
                        );
                    }}
                    fullWidth
                />
            </View>
        </View>
    );
}

interface stylesProps {
    contentContainer: {
        bottom: number;
    };
}
const styles = ({ contentContainer: { bottom } }: stylesProps) =>
    StyleSheet.create({
        contentContainerStyle: {
            paddingBottom: bottom + wn(120),
        },
    });
