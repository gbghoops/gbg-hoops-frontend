import { useState } from "react";
import { ImageURISource } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import Button from "@src/components/button/Button";
import EquipmentList from "@src/components/screen-components/Programs/WorkoutDetails/EquipmentList/EquipmentList";
import ExerciseHeaderButton from "@src/components/screen-components/Programs/WorkoutDetails/ExerciseHeaderButton/ExerciseHeaderButton";
import ProgressIndicator from "@src/components/screen-components/Programs/WorkoutDetails/ProgressIndicator/ProgressIndicator";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Sheet, Text, View } from "tamagui";

// Icon sizes:
const moreIconSize = wn(22);
const exerciseInfoIconSize = wn(20);

export default function WorkoutDetails() {
    const [exerciseSheetOpen, setExerciseSheetOpen] = useState(false);
    const { slug } = useLocalSearchParams();
    const { bottom } = useSafeAreaInsets();

    return (
        <View f={1} bc="$surface_background" position="relative">
            {/* Workout title */}
            <ScrollView f={1}>
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
                        Single Leg Stability: Hip Hinge
                    </Text>
                </View>

                {/* Equipment Needed. */}
                <View px={"$20"} my="$20" mb="$10">
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
            </ScrollView>

            <AddExerciseSheet
                setSheetOpen={setExerciseSheetOpen}
                sheetOpen={exerciseSheetOpen}
            />

            {/* Workout now button */}
            <View
                position="absolute"
                zIndex={10}
                bottom={bottom + 20}
                px={"$20"}
                width={"100%"}
            >
                <Button text="Workout Now" fullWidth />
            </View>
        </View>
    );
}

interface AddExerciseSheetProps {
    sheetOpen: boolean;
    setSheetOpen: (open: boolean) => void;
}
const AddExerciseSheet = ({
    sheetOpen,
    setSheetOpen,
}: AddExerciseSheetProps) => {
    return (
        <Sheet
            forceRemoveScrollEnabled={sheetOpen}
            modal={true}
            open={sheetOpen}
            snapPointsMode="fit"
            onOpenChange={setSheetOpen}
            dismissOnSnapToBottom
            zIndex={100_000}
            animation="fast"
        >
            <Sheet.Overlay
                animation="slow"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
                backgroundColor={"rgba(20,20,20,0.75)"}
            />

            <Sheet.Frame
                padding="$10"
                space="$5"
                backgroundColor={"$surface_primary"}
            >
                <Sheet.Handle
                    mb="$10"
                    height={"$4"}
                    width={"$80"}
                    mx="auto"
                    backgroundColor={"rgb(220, 220, 220)"}
                    opacity={0.35}
                    animation={"fast"}
                    pressStyle={{
                        opacity: 1,
                    }}
                />
                <View my={"$20"} px={"$20"}>
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$24"}
                        textTransform="uppercase"
                        textAlign="left"
                    >
                        Add an Exercise
                    </Text>
                    <View mt="$30" mb="$10" width={"100%"}>
                        <Button
                            text="CANCEL"
                            fullWidth
                            secondary_transparent
                            onPress={() => {
                                setSheetOpen(false);
                            }}
                        />
                    </View>
                </View>
            </Sheet.Frame>
        </Sheet>
    );
};

type SetsType = "reps" | "time";

interface Exercise {
    exerciseName: string;
    setsCount: number;
    setsType: SetsType;
    exerciseImage: ImageURISource;
    time: number | null;
    reps: number | null;
    repSuffix: string | null;
}

interface ExerciseSubBlock {
    blockTitle: string;
    exercises: Exercise[];
}
interface ExerciseData {
    blockTitle: string;
    isRestBlock: boolean;
    exercises: (Exercise | ExerciseSubBlock)[];
}

const exerciseData: ExerciseData[] = [
    {
        blockTitle: "Warm Up",
        isRestBlock: false,
        exercises: [
            {
                exerciseName: "Frog Stretch & Gas",
                setsCount: 1,
                setsType: "time",
                exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                time: 60,
                reps: null,
                repSuffix: "seconds",
            },
            {
                exerciseName: "Miniband Big Toe Smash Hip Lock ISO Hold",
                setsCount: 1,
                setsType: "time",
                exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                time: 40,
                reps: null,
                repSuffix: "seconds per side",
            },
        ],
    },
    {
        blockTitle: "Athleticism",
        isRestBlock: false,
        exercises: [
            {
                exerciseName: "Bench Elevated Wide Base Reach",
                setsCount: 1,
                setsType: "reps",
                exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                time: null,
                reps: 10,
                repSuffix: "reps per side",
            },
            {
                blockTitle: "Superset",
                exercises: [
                    {
                        exerciseName: "RFE RDL OH Reach",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                    {
                        exerciseName: "RFE RDL OH Reach",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                ],
            },
        ],
    },
    {
        blockTitle: "Recovery",
        isRestBlock: false,
        exercises: [
            {
                blockTitle: "Triset",
                exercises: [
                    {
                        exerciseName: "Wall Assisted 1L RDL",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                    {
                        exerciseName:
                            "Mini band Big Toe Smash Hip Lock ISO Hold with Head Turnh",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                    {
                        exerciseName: "Mini band Big Toe Spread 1L RDL",
                        setsCount: 1,
                        setsType: "reps",
                        exerciseImage: require("@assets/programs/basketball-strength-level-1.png"),
                        time: null,
                        reps: 10,
                        repSuffix: "reps per side",
                    },
                ],
            },
        ],
    },
];
