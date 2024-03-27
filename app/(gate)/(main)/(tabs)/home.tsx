import { useState } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "@src/components/avatar/Avatar";
import HomeScreenBanner from "@src/components/home-screen-banner/HomeScreenBanner";
import Link from "@src/components/link/Link";
import BackgroundVideo from "@src/components/screen-components/Home/BackgroundVideo/BackgroundVideo";
import Coach2Coach from "@src/components/screen-components/Home/Coach2Coach/Coach2Coach";
import FreePlanUpgrade from "@src/components/screen-components/Home/FreePlanUpgrade/FreePlanUpgrade";
import RenderRecommendedProgramCard from "@src/components/screen-components/Home/RecommendedPrograms/RenderRecommendedProgramCard";
import ReferAFriend from "@src/components/screen-components/Home/ReferAFriend/ReferAFriend";
import WorkoutOfTheDayCard from "@src/components/screen-components/Home/WorkoutOfTheDayCard/WorkoutOfTheDayCard";
import ActiveProgramsList from "@src/components/screen-components/Programs/ActiveProgramsList/ActiveProgramsList";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { useUser } from "@src/context/UserContext/user-context";
import useCustomWorkouts from "@src/hooks/custom-workout/useCustomWorkouts";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { ScrollView, Stack, Text, View } from "tamagui";

export default function HomePage() {
    const [bannerHeight, setBannerHeight] = useState<number>(wn(100));
    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();
    const { user } = useUser();

    const { programs, programsFetching } = usePrograms();
    const { customWorkouts, fetchCustomWorkouts, customWorkoutsLoading } =
        useCustomWorkouts();

    const programsWithProgress = programs.filter(
        (p) => !("is_locked" in p) && p.progress,
    );

    const isFreeUser = user?.subscription === "free";

    return (
        <Stack
            f={1}
            position="relative"
            backgroundColor={"$surface_background"}
        >
            <ImageBackground
                source={require("@assets/homescreen-background.png")}
                resizeMode="cover"
                style={styles.ImageBackground}
            >
                <ScrollView
                    f={1}
                    decelerationRate={"fast"}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Stack f={1} ac={"center"} pb={bottom + wn(120)}>
                        {/* Header Banner */}
                        <View height={wn(280) + top} position="relative">
                            {/* Banner Background Video container */}
                            <BackgroundVideo />
                            <View
                                position="absolute"
                                height={"100%"}
                                width={"100%"}
                                px={"$20"}
                                paddingTop={top + wn(20)}
                            >
                                <View width={"100%"} fd="row" jc="flex-end">
                                    <Avatar />
                                </View>
                                <View mt={"$50"}>
                                    <Text
                                        fontFamily={"$heading"}
                                        fontSize={"$40"}
                                        textTransform="uppercase"
                                    >
                                        Welcome
                                        {user ? `, ${user.given_name}` : null}!
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* Body */}
                        <View>
                            {/* Intro Banner */}
                            <View px={"$20"} mt={-(bannerHeight / 1.95)}>
                                {!programsFetching && !customWorkoutsLoading ? (
                                    programsWithProgress.length > 0 ? (
                                        <View>
                                            <ActiveProgramsList />
                                        </View>
                                    ) : (
                                        <View
                                            onLayout={(layout) => {
                                                setBannerHeight(
                                                    layout.nativeEvent.layout
                                                        .height,
                                                );
                                            }}
                                        >
                                            <HomeScreenBanner
                                                onPress={() => {
                                                    router.push("/programs");
                                                }}
                                            >
                                                <View f={1} p={"$20"}>
                                                    <Text
                                                        lh={26}
                                                        fontFamily={"$heading"}
                                                        fontSize={"$24"}
                                                        textTransform="uppercase"
                                                    >
                                                        {`What's New`}
                                                    </Text>
                                                    <Text
                                                        fontFamily={"$body"}
                                                        fontSize={"$16"}
                                                        lh={20}
                                                        mt={"$15"}
                                                    >
                                                        {`Welcome to the GBG Hoops app! Expolore our programs or create your own workout.`}
                                                    </Text>
                                                </View>
                                            </HomeScreenBanner>
                                        </View>
                                    )
                                ) : (
                                    <View
                                        p="$20"
                                        backgroundColor="$surface_primary"
                                        jc="center"
                                        ai={"center"}
                                        h="$100"
                                    >
                                        <ActivityIndicator
                                            size="small"
                                            color={colors.gold}
                                        />
                                    </View>
                                )}
                            </View>

                            {/* Recommended For you section... */}
                            <View>
                                {/* Heading */}
                                <View
                                    fd={"row"}
                                    jc={"space-between"}
                                    ai={"center"}
                                    mt={"$40"}
                                    px={"$20"}
                                >
                                    <Text
                                        ff={"$heading"}
                                        fontSize={"$24"}
                                        textTransform="uppercase"
                                    >
                                        Recommended For You
                                    </Text>
                                    <Link
                                        bold
                                        onPress={() => {
                                            router.push("/programs");
                                        }}
                                    >
                                        See all Programs
                                    </Link>
                                </View>
                                {/* Program Cards */}
                                <View mt={"$20"} minHeight={"$240"}>
                                    <RenderRecommendedProgramCard />
                                </View>
                            </View>

                            {/* Upgrde Free Plan */}
                            {isFreeUser ? (
                                <View mx="$20" mt="$20">
                                    <FreePlanUpgrade />
                                </View>
                            ) : null}

                            {/* Workout of the Day */}
                            {!isFreeUser ? (
                                <View mt={"$20"} px={"$20"}>
                                    <View>
                                        <WorkoutOfTheDayCard />
                                    </View>
                                </View>
                            ) : null}

                            {/* Coach2Coach */}
                            <Coach2Coach />
                            {/* Refer a Friend */}
                            <ReferAFriend />
                        </View>
                    </Stack>
                </ScrollView>
            </ImageBackground>
        </Stack>
    );
}

const styles = StyleSheet.create({
    ImageBackground: {
        flex: 1,
        height: "100%",
    },
});
