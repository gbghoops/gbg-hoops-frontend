import { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import LegendSheet from "@src/components/screen-components/Programs/ProgramDetails/LegendSheet";
import WorkoutBreakdownHeader from "@src/components/screen-components/Programs/ProgramDetails/WorkoutBreakdownHeader/WorkoutBreakdownHeader";
import { WorkoutBreakdownTabs } from "@src/components/screen-components/Programs/ProgramDetails/WorkoutBreakdownTabs";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import * as Burnt from "burnt";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "tamagui";

export default function ProgramDetails() {
    const router = useRouter();
    const { programs, addProgramToUser } = usePrograms();
    const { bottom } = useSafeAreaInsets();
    const [showLegendSheet, setShowLegendSheet] = useState(false);
    const [isAppLoading, setIsAppLoading] = useState(false);
    const { slug } = useLocalSearchParams();

    const scrollViewRef = useRef<ScrollView>(null);

    const currentProgram = programs.find((program) => program.slug === slug);

    const isProgramLocked = currentProgram && "is_locked" in currentProgram;

    const onAddProgram = async () => {
        if (!currentProgram || isProgramLocked) return;

        setIsAppLoading(true);
        try {
            await addProgramToUser(currentProgram.contentful_id);

            Burnt.toast({
                title: "Program added successfully",
                preset: "done",
            });

            return router.push("/programs");
        } catch {
            Burnt.toast({
                title: "Unable to add this Program. Please try again.",
                preset: "error",
            });
        } finally {
            setIsAppLoading(false);
        }
    };

    return (
        <View
            flex={1}
            position="relative"
            bc={"$surface_background"}
            pt={"$20"}
        >
            {/* Workout Breakdown */}
            <View flexGrow={1} h={"100%"}>
                {/* Header */}

                <ScrollView
                    ref={scrollViewRef}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
                    contentContainerStyle={[
                        contentContainerStyles({ bottom })
                            .contentContainerStyle,
                    ]}
                >
                    <View flexGrow={1}>
                        <WorkoutBreakdownHeader
                            onInfoPress={() => setShowLegendSheet(true)}
                        />
                        <View flexGrow={1}>
                            <WorkoutBreakdownTabs />
                        </View>
                    </View>
                </ScrollView>
            </View>

            {!isProgramLocked ? (
                <View
                    position="absolute"
                    zIndex={10}
                    bottom={bottom ? bottom + wn(20) : wn(50)}
                    px={"$20"}
                    width={"100%"}
                >
                    <Button
                        text="Add Program"
                        onPress={onAddProgram}
                        fullWidth
                        loading={isAppLoading}
                    />
                </View>
            ) : null}

            <LegendSheet
                sheetOpen={showLegendSheet}
                setSheetOpen={setShowLegendSheet}
            />
        </View>
    );
}

interface stylesProps {
    bottom: number;
}

const contentContainerStyles = ({ bottom }: stylesProps) =>
    StyleSheet.create({
        contentContainerStyle: {
            paddingBottom: bottom + wn(120),
        },
    });
