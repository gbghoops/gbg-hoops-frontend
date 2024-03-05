import { useCallback } from "react";
import { Tabs } from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RenderRecommendedProgramCard from "@src/components/screen-components/Home/RecommendedPrograms/RenderRecommendedProgramCard";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useFocusEffect } from "expo-router";
import { styled, Text, View } from "tamagui";

import ActiveProgramsList from "../../ActiveProgramsList/ActiveProgramsList";
import BuildYoutWorkoutCards from "../../BuildYourWorkoutCard";

import NewestProgramCard from "./NewestProgramCard";
import RefreshRoutineCard from "./RefreshRoutineCard";

export const ForYouTab = () => {
    const { bottom } = useSafeAreaInsets();

    const { programs, refetchPrograms } = usePrograms();

    useFocusEffect(
        useCallback(() => {
            refetchPrograms();
        }, []),
    );

    if (!programs) return null;

    return (
        <Tabs.ScrollView style={{ flex: 1, minHeight: "100%" }}>
            <ForYouTabWrapper bottom={bottom}>
                {/* My Program */}
                <View mx="$20" mt="$20">
                    <ActiveProgramsList />
                </View>

                <BuildYoutWorkoutCards />

                {/* Recommended For you section... */}
                <View>
                    {/* Heading */}
                    <View fd={"row"} ai={"center"} mt={"$30"} px={"$20"}>
                        <Text
                            ff={"$heading"}
                            fontSize={"$24"}
                            textTransform="uppercase"
                        >
                            Recommended For You
                        </Text>
                    </View>
                    {/* Program Cards */}
                    <View mt={"$20"}>
                        <RenderRecommendedProgramCard />
                    </View>
                </View>

                {/* Newest Program */}
                <View pt={"$30"} px={"$20"}>
                    <NewestProgramCard />
                </View>

                {/* Refresh Routine */}
                <RefreshRoutineCard />
            </ForYouTabWrapper>
        </Tabs.ScrollView>
    );
};

const ForYouTabWrapper = styled(View, {
    flex: 1,
    minHeight: "100%",
    variants: {
        bottom: (val: number) => ({
            pb: val + wn(120),
        }),
    },
});
