import { ImageURISource } from "react-native";
import { StyleSheet } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import RenderRecommendedProgramCard from "@src/components/screen-components/Home/RecommendedPrograms/RenderRecommendedProgramCard";
import { StyledImage } from "@src/components/styled-components";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import getProgramDayInfo from "@src/context/ProgramsContext/utils/getProgramDayInfo";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { styled, Text, View } from "tamagui";

import BuildYoutWorkoutCards from "../../BuildYourWorkoutCard";

import NewestProgramCard from "./NewestProgramCard";
import RefreshRoutineCard from "./RefreshRoutineCard";

export const ForYouTab = () => {
    const { bottom } = useSafeAreaInsets();

    const router = useRouter();
    const { programs, activeDay, activeWeek } = usePrograms();

    if (!programs) return null;

    const activeProgram = programs[0];

    const weekData = activeProgram?.weeks[activeWeek - 1];

    const dayData = getProgramDayInfo({ week: weekData, day: activeDay });

    return (
        <Tabs.ScrollView style={{ flex: 1, minHeight: "100%" }}>
            <ForYouTabWrapper bottom={bottom}>
                {/* My Program */}
                <View px={"$20"} mt={"$20"}>
                    <CurrentProgramCard
                        coverImage={require("@assets/programs/basketball-strength-level-1.png")}
                        currentDay={activeDay}
                        workoutTitle={dayData?.dayData?.exercises[0].title}
                        programTitle={activeProgram.name}
                        onPress={() => {
                            router.push(
                                `/program/workout-details/${activeProgram.slug}`,
                            );
                        }}
                    />
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
                    {/* Heading */}
                    <View fd={"row"} ai={"center"} pb={"$10"}>
                        <Text
                            ff={"$heading"}
                            fontSize={"$24"}
                            textTransform="uppercase"
                        >
                            Newest Program
                        </Text>
                    </View>
                    <NewestProgramCard onPress={() => {}} />
                </View>

                {/* Refresh Routine */}
                <RefreshRoutineCard />
            </ForYouTabWrapper>
        </Tabs.ScrollView>
    );
};

interface CurrentProgramCardProps {
    coverImage: ImageURISource;
    currentDay: number;
    workoutTitle: string;
    programTitle: string;
    onPress: () => void;
}
const CurrentProgramCard = ({
    coverImage,
    currentDay,
    workoutTitle,
    programTitle,
    onPress,
}: CurrentProgramCardProps) => {
    return (
        <View
            fd="row"
            onPress={onPress}
            animation={"medium"}
            bc={"$surface_primary"}
            height={"$120"}
            pressStyle={{
                opacity: 0.85,
                scale: 0.995,
            }}
        >
            {/* Image Container */}
            <View width="$120" height="$120">
                <StyledImage
                    source={coverImage}
                    resizeMode="cover"
                    style={styles.currentProgramCardImage}
                />
            </View>
            <View f={1} height="100%" p="$20" pl="$15" jc="space-evenly">
                <Text ff="$body" fontSize="$16">{`Day ${currentDay}`}</Text>
                <Text ff={"$heading"} fontSize="$22" py={wn(10)}>
                    {workoutTitle}
                </Text>
                <Text ff={"$body"} color="$accent_grey" fontSize={"$16"}>
                    {programTitle}
                </Text>
            </View>
            <View pr="$20" pl="$10" justifyContent="center">
                <Octicons name="arrow-right" size={30} color={colors.gold} />
            </View>
        </View>
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

const styles = StyleSheet.create({
    currentProgramCardImage: {
        width: "100%",
        height: "100%",
    },
});
