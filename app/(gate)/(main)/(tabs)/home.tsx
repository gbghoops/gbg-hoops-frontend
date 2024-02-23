import { ImageBackground, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "@src/components/avatar/Avatar";
import HomeScreenBanner from "@src/components/home-screen-banner/HomeScreenBanner";
import Link from "@src/components/link/Link";
import BackgroundVideo from "@src/components/screen-components/Home/BackgroundVideo/BackgroundVideo";
import Coach2Coach from "@src/components/screen-components/Home/Coach2Coach/Coach2Coach";
import RenderRecommendedProgramCard from "@src/components/screen-components/Home/RecommendedPrograms/RenderRecommendedProgramCard";
import ReferAFriend from "@src/components/screen-components/Home/ReferAFriend/ReferAFriend";
import WorkoutOfTheDayCard from "@src/components/screen-components/Home/WorkoutOfTheDayCard/WorkoutOfTheDayCard";
import { useAuthState } from "@src/context/auth-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { ScrollView, Stack, Text, View } from "tamagui";

export default function HomePage() {
    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();
    const authState = useAuthState();

    const user = authState?.user;

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
                                <View my={"$30"}>
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
                            <View px={"$20"}>
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

                            {/* Workout of th Day */}
                            <View mt={"$20"} px={"$20"}>
                                {/* Heading */}
                                <View
                                    fd={"row"}
                                    jc={"space-between"}
                                    ai={"center"}
                                    mt={"$30"}
                                >
                                    <Text
                                        ff={"$heading"}
                                        fontSize={"$24"}
                                        textTransform="uppercase"
                                    >
                                        Workout of the day
                                    </Text>
                                </View>

                                <View mt={"$24"}>
                                    <WorkoutOfTheDayCard />
                                </View>
                            </View>

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
