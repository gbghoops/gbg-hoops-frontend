import { useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import Button from "@src/components/button/Button";
import DayActivityExerciseList from "@src/components/day-activity-exercise-list/DayActivityExerciseList";
import PageError from "@src/components/screen-components/PageError/PageError";
import LegendSheet from "@src/components/screen-components/Programs/ProgramDetails/LegendSheet";
import AddExerciseSheet from "@src/components/screen-components/Programs/WorkoutDetails/AddExerciseSheet/AddExerciseSheet";
import EquipmentList from "@src/components/screen-components/Programs/WorkoutDetails/EquipmentList/EquipmentList";
import ExerciseHeaderButton from "@src/components/screen-components/Programs/WorkoutDetails/ExerciseHeaderButton/ExerciseHeaderButton";
import ProgressIndicator from "@src/components/screen-components/Programs/WorkoutDetails/ProgressIndicator/ProgressIndicator";
import WeeklyActivitiesBreakdown from "@src/components/weekly-activities-breakdown/WeeklyActivitiesBreakdown";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { EquipmentData, ProgramDay } from "@src/context/ProgramsContext/types";
import getProgramDayInfo from "@src/context/ProgramsContext/utils/getProgramDayInfo";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useLocalSearchParams, useRouter } from "expo-router";
import slugify from "slugify";
import { ScrollView, Text, View } from "tamagui";

// Icon sizes:
const moreIconSize = wn(22);
const exerciseInfoIconSize = wn(20);

export default function WorkoutDetails() {
    const [exerciseSheetOpen, setExerciseSheetOpen] = useState(false);
    const [showLegendSheet, setShowLegendSheet] = useState(false);

    const router = useRouter();
    const { bottom } = useSafeAreaInsets();
    const { id } = useLocalSearchParams();
    const { programs } = usePrograms();

    if (!id) {
        return <PageError returnPath="/programs" />;
    }

    const isCustomWorkout = false;

    const slug = id[0];

    const currentProgram = programs.find((program) => program.slug === slug);

    const activeWeek =
        currentProgram &&
        !("is_locked" in currentProgram) &&
        currentProgram.progress
            ? currentProgram.progress.week_completed + 1
            : 1;

    const activeDay =
        currentProgram &&
        !("is_locked" in currentProgram) &&
        currentProgram.progress
            ? currentProgram.progress.day_completed + 1
            : 1;

    const _activeWeek = id[1] ? Number(id[1]) : activeWeek;
    const _activeDay = id[2] ? Number(id[2]) : activeDay;

    const isProgramLocked = currentProgram && "is_locked" in currentProgram;

    if (!currentProgram || isProgramLocked) {
        return <PageError returnPath="/programs" />;
    }

    const weekData = currentProgram?.weeks[_activeWeek - 1];

    if (!weekData) {
        return <PageError returnPath="/programs" />;
    }

    const slugifiedWeekData = {
        ...weekData,
        weekNumber: _activeWeek,
        slug: slugify(weekData.name, { lower: true }),
    };

    const getUpcomingWorkouts = (activeDay: number) => {
        // remove the active and previous days from week data
        const completedWorkoutDayIndices = Array.from(
            { length: activeDay },
            (_, i) => i + 1,
        );

        const upcomingWorkoutIndices = Array.from(
            { length: 8 - activeDay },
            (_, i) => i + activeDay,
        );

        const previousWorkoutsPrime = {
            ...slugifiedWeekData,
        };
        const upcomingWorkoutsPrime = {
            ...slugifiedWeekData,
        };

        // Remove completed and upcoming days from week data to get upcoming workouts data
        completedWorkoutDayIndices.forEach((day) => {
            delete (
                previousWorkoutsPrime as Record<
                    string,
                    string | number | ProgramDay
                >
            )[`day_${day}`];
            delete (
                previousWorkoutsPrime as Record<
                    string,
                    string | number | ProgramDay
                >
            )[`day_${day}_memo`];
        });

        // Remove upcoming days from week data to get completed workouts data
        upcomingWorkoutIndices.forEach((day) => {
            delete (
                upcomingWorkoutsPrime as Record<
                    string,
                    string | number | ProgramDay
                >
            )[`day_${day}`];
            delete (
                upcomingWorkoutsPrime as Record<
                    string,
                    string | number | ProgramDay
                >
            )[`day_${day}_memo`];
        });

        return {
            upcomingWorkouts: previousWorkoutsPrime,
            completedWorkouts: upcomingWorkoutsPrime,
        };
    };

    const { upcomingWorkouts, completedWorkouts } =
        getUpcomingWorkouts(_activeDay);

    const dayInfo = getProgramDayInfo({
        week: weekData,
        day: _activeDay,
    });

    if (!dayInfo || !dayInfo.dayData)
        return <PageError returnPath="/programs" />;

    const { dayData, dayMemo } = dayInfo;

    const equipments = dayData ? getEquipmentFromDayData(dayData) : [];

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
                    <ProgressIndicator
                        totalDays={5}
                        currentDay={_activeDay}
                        currentWeek={_activeWeek}
                    />
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
                        {`Day ${_activeDay}`}
                    </Text>
                </View>

                {/* Equipment Needed. */}
                {equipments.length > 0 ? (
                    <>
                        <View px={"$20"} my="$40" mb="$10">
                            <Text ff={"$heading"} fontSize={"$24"}>
                                Equipment Needed
                            </Text>
                        </View>
                        <EquipmentList equipments={equipments} />
                    </>
                ) : null}

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
                                onPress={() => setShowLegendSheet(true)}
                            >
                                <Octicons
                                    name="info"
                                    color={colors.gold}
                                    size={exerciseInfoIconSize}
                                />
                            </View>
                        </View>
                        {isCustomWorkout ? (
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
                        ) : null}
                    </View>
                </View>

                {/* Exercise List */}
                <View mx={"$20"}>
                    {dayMemo ? (
                        <View>
                            <Text
                                fontFamily={"$body"}
                                fontSize={"$18"}
                                mt={"$20"}
                            >
                                {dayMemo}
                            </Text>
                        </View>
                    ) : null}

                    <View mt={"$20"}>
                        <DayActivityExerciseList exerciseData={dayData} />
                    </View>
                </View>

                <View mt="$40" mx="$20">
                    <Text
                        textTransform="uppercase"
                        fontFamily="$heading"
                        fontSize={"$24"}
                    >
                        Upcoming Workouts
                    </Text>
                    <View>
                        <WeeklyActivitiesBreakdown
                            programSlug={slug}
                            weekNumber={_activeWeek}
                            removeHorizontalPadding={true}
                            weekData={upcomingWorkouts}
                        />
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
                    <View mt="$20">
                        <WeeklyActivitiesBreakdown
                            programSlug={slug}
                            weekNumber={_activeWeek}
                            isCompletedBlock={true}
                            removeHorizontalPadding={true}
                            weekData={completedWorkouts}
                            allowRedo
                        />
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
                            `/workout/${slug}/${_activeWeek}/${_activeDay}`,
                        );
                    }}
                    fullWidth
                />
            </View>

            <LegendSheet
                sheetOpen={showLegendSheet}
                setSheetOpen={setShowLegendSheet}
            />
        </View>
    );
}

const getEquipmentFromDayData = (dayData: ProgramDay) => {
    // get unique equipments from dayData > daydata.exercises > activities > equipment

    const equipments = dayData.exercises
        .reduce((acc: EquipmentData[][], exercise) => {
            if (exercise && !("activities" in exercise)) return acc;

            const equipments = exercise.activities
                .map((activity) => activity.equipment)
                .filter((equipment) => equipment);
            return [...acc, ...equipments];
        }, [])
        .flat() as EquipmentData[];

    const uniqueEquipments = equipments.reduce(
        (acc: EquipmentData[], equipment) => {
            if (
                acc.find(
                    (accEquipment) =>
                        accEquipment.contentful_id === equipment.contentful_id,
                )
            ) {
                return acc;
            }
            return [...acc, equipment];
        },
        [],
    );

    return uniqueEquipments;
};

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
