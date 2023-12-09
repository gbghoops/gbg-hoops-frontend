import { ImageBackground, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import HomeScreenBanner from "@src/components/home-screen-banner/HomeScreenBanner";
import Link from "@src/components/link/Link";
import BackgroundVideo from "@src/components/screen-components/Home/BackgroundVideo/BackgroundVideo";
import RenderRecommendedProgramCard from "@src/components/screen-components/Home/RecommendedPrograms/RenderRecommendedProgramCard";
import WorkoutOfTheDayCard from "@src/components/screen-components/Home/WorkoutOfTheDayCard/WorkoutOfTheDayCard";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { Avatar, ScrollView, Stack, Text, View } from "tamagui";

export default function HomePage() {
    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();
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
                                px={wn(20)}
                                paddingTop={top + wn(20)}
                            >
                                <View width={"100%"} fd="row" jc="flex-end">
                                    <Avatar
                                        circular
                                        size={"$40"}
                                        animation={"medium"}
                                        onPress={() => {
                                            router.push("/settings");
                                        }}
                                        pressStyle={{
                                            opacity: 0.85,
                                            scale: 0.9,
                                        }}
                                    >
                                        <Avatar.Image src="http://placekitten123.com/200/300" />
                                        <Avatar.Fallback
                                            bc="$gold"
                                            ai="center"
                                            jc="center"
                                        >
                                            <Text
                                                color="$black"
                                                fontFamily={"$body"}
                                                fontSize={wn(20)}
                                                lineHeight={wn(22)}
                                            >
                                                AB
                                            </Text>
                                        </Avatar.Fallback>
                                    </Avatar>
                                </View>
                                <View my={wn(30)}>
                                    <Text
                                        fontFamily={"$heading"}
                                        fontSize={wn(40)}
                                        lh={wn(44)}
                                        textTransform="uppercase"
                                    >
                                        Welcome, Anna!
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* Body */}
                        <View>
                            {/* Intro Banner */}
                            <View px={wn(20)}>
                                <HomeScreenBanner
                                    onPress={() => {
                                        router.push("/programs");
                                    }}
                                >
                                    <View f={1} p={wn(20)}>
                                        <Text
                                            fontFamily={"$heading"}
                                            fontSize={wn(24)}
                                            lh={wn(26)}
                                            textTransform="uppercase"
                                        >
                                            {`What's New`}
                                        </Text>
                                        <Text
                                            fontFamily={"$body"}
                                            fontSize={wn(16)}
                                            lh={wn(18)}
                                            mt={wn(11)}
                                        >
                                            {`Welcome to the GBG Hoops app! Expolore out programs or create your own workout.`}
                                        </Text>
                                    </View>
                                </HomeScreenBanner>
                            </View>

                            {/* Recommended For you section... */}
                            <View>
                                {/* Heading */}
                                <View
                                    fd={"row"}
                                    jc={"space-between"}
                                    ai={"center"}
                                    mt={wn(40)}
                                    px={wn(20)}
                                >
                                    <Text
                                        ff={"$heading"}
                                        fontSize={wn(24)}
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
                                <View mt={wn(20)}>
                                    <RenderRecommendedProgramCard />
                                </View>
                            </View>

                            {/* Workout of th Day */}
                            <View mt={wn(20)} px={wn(20)}>
                                {/* Heading */}
                                <View
                                    fd={"row"}
                                    jc={"space-between"}
                                    ai={"center"}
                                    mt={wn(30)}
                                >
                                    <Text
                                        ff={"$heading"}
                                        fontSize={wn(24)}
                                        textTransform="uppercase"
                                    >
                                        Workout of the day
                                    </Text>
                                </View>

                                <View mt={wn(20)}>
                                    <WorkoutOfTheDayCard
                                        onPress={() => {}}
                                        programDuration="60 min"
                                        title="EDD Stability"
                                        programImage={require("@assets/programs/eod-mobility-program-screen.png")}
                                    />
                                </View>
                            </View>

                            {/* Coach2Coach */}
                            <View mt={wn(50)} mx={wn(20)}>
                                <View
                                    backgroundColor={"$surface_primary"}
                                    p={wn(20)}
                                    pb={wn(30)}
                                >
                                    <Text
                                        textTransform="uppercase"
                                        textAlign="center"
                                        fontSize={wn(24)}
                                        fontFamily={"$heading"}
                                        my={wn(10)}
                                    >
                                        Coach2Coach
                                    </Text>
                                    <Text
                                        textAlign="center"
                                        fontFamily={"$body"}
                                        fontSize={wn(16)}
                                        px={wn(20)}
                                    >
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua.
                                    </Text>
                                    <View fd="row" jc="center" mt="$20">
                                        <Button
                                            text="BOOK CALL"
                                            onPress={() => {}}
                                        />
                                    </View>
                                </View>
                            </View>

                            {/* Refer a Friend */}
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
