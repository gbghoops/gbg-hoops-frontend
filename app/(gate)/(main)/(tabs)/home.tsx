import { ImageBackground, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreenBanner from "@src/components/home-screen-banner/HomeScreenBanner";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { Avatar, ScrollView, Stack, Text, View } from "tamagui";

export default function HomePage() {
    const { top } = useSafeAreaInsets();
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
                    showsVerticalScrollIndicator={false}
                >
                    <Stack f={1} ac={"center"}>
                        {/* Header Banner */}
                        <View height={wn(280)} position="relative">
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
                        <View mx={wn(20)}>
                            {/* Intro Banner */}
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
                    </Stack>
                </ScrollView>
            </ImageBackground>
        </Stack>
    );
}

const BackgroundVideo = () => {
    return (
        <View
            pos="absolute"
            top={0}
            left={0}
            width={"100%"}
            height={"100%"}
            zIndex={0}
        >
            <View
                pos="absolute"
                height={"100%"}
                width={"100%"}
                zIndex={1}
                backgroundColor={"rgba(20, 20, 20, 0.75)"}
            />
            <Video
                shouldPlay
                isLooping
                resizeMode={ResizeMode.COVER}
                source={require("@assets/video/gbg-reel-landscape.mp4")}
                style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ImageBackground: {
        flex: 1,
        height: "100%",
    },
});
