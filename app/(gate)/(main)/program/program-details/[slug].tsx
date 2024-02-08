import { useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import LegendSheet from "@src/components/screen-components/Programs/ProgramDetails/LegendSheet";
import WorkoutBreakdownHeader from "@src/components/screen-components/Programs/ProgramDetails/WorkoutBreakdownHeader/WorkoutBreakdownHeader";
import { WorkoutBreakdownTabs } from "@src/components/screen-components/Programs/ProgramDetails/WorkoutBreakdownTabs";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, TabsContentProps, View } from "tamagui";
import { Tabs } from "tamagui";

export default function ProgramDetails() {
    const router = useRouter();
    const { bottom } = useSafeAreaInsets();
    const [showLegendSheet, setShowLegendSheet] = useState(false);
    const { slug } = useLocalSearchParams();

    return (
        <View f={1} position="relative" bc={"$surface_background"} pt={"$20"}>
            {/* Workout Breakdown */}
            <View>
                {/* Header */}

                <ScrollView
                    contentContainerStyle={
                        contentContainerStyles({ bottom }).contentContainerStyle
                    }
                >
                    <WorkoutBreakdownHeader
                        onInfoPress={() => setShowLegendSheet(true)}
                    />
                    <View>
                        <WorkoutBreakdownTabs />
                    </View>
                </ScrollView>
            </View>

            <View
                position="absolute"
                zIndex={10}
                bottom={bottom ? bottom + wn(20) : wn(50)}
                mx={"$20"}
                width={"100%"}
            >
                <Button
                    text="Add Program"
                    onPress={() => {
                        return router.replace(
                            `/program/workout-details/${slug}`,
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

interface stylesProps {
    bottom: number;
}

const contentContainerStyles = ({ bottom }: stylesProps) =>
    StyleSheet.create({
        contentContainerStyle: {
            paddingBottom: bottom + wn(120),
            flexGrow: 1,
        },
    });
