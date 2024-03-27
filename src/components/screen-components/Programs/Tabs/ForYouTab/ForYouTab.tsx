import { useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FreePlanUpgrade from "@src/components/screen-components/Home/FreePlanUpgrade/FreePlanUpgrade";
import RenderRecommendedProgramCard from "@src/components/screen-components/Home/RecommendedPrograms/RenderRecommendedProgramCard";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { useUser } from "@src/context/UserContext/user-context";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useFocusEffect } from "expo-router";
import { styled, Text, View } from "tamagui";

import ActiveProgramsList from "../../ActiveProgramsList/ActiveProgramsList";
import BuildYourWorkoutCards from "../../BuildYourWorkoutCard";

import NewestProgramCard from "./NewestProgramCard";
import RefreshRoutineCard from "./RefreshRoutineCard";

export const ForYouTab = () => {
    const { bottom } = useSafeAreaInsets();
    const { user } = useUser();

    const { programs, refetchPrograms, programsFetching } = usePrograms();

    useFocusEffect(
        useCallback(() => {
            refetchPrograms();
        }, []),
    );

    if (!programs) return null;

    const isFreeUser = user?.subscription === "free";

    return (
        <Tabs.ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, minHeight: "100%" }}
        >
            <ForYouTabWrapper bottom={bottom}>
                {/* My Program */}
                {programsFetching ? (
                    <View
                        m="$20"
                        backgroundColor="$surface_primary"
                        jc="center"
                        ai={"center"}
                        h="$100"
                    >
                        <ActivityIndicator size="small" color={colors.gold} />
                    </View>
                ) : (
                    <View m="$20" mb="$10">
                        <ActiveProgramsList />
                    </View>
                )}

                {/* Build Your Workout */}
                {!isFreeUser ? <BuildYourWorkoutCards /> : null}

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

                {/* Free Plan Upgrade */}
                {isFreeUser ? (
                    <View m="$20">
                        <FreePlanUpgrade />
                    </View>
                ) : null}

                {isFreeUser ? (
                    <View>
                        <BuildYourWorkoutCards isFreeUser={isFreeUser} />
                    </View>
                ) : null}

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
