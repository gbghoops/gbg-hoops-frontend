import React from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import { StyledImage } from "@src/components/styled-components";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { Stack as NavigationStack } from "expo-router";
import { Stack, View, YStack } from "tamagui";

const BeginAuth = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    return (
        <Stack
            f={1}
            position={"relative"}
            backgroundColor={"$surface_background"}
            pt={insets.top}
            pb={insets.bottom}
        >
            <NavigationStack.Screen
                options={{ header: () => null, gestureEnabled: false }}
            />
            <YStack zIndex={1} px={"$20"} f={1}>
                <YStack
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                >
                    <View
                        w="$400"
                        h="$400"
                        justifyContent="center"
                        ai="center"
                        marginHorizontal="auto"
                        marginTop="$30"
                    >
                        <StyledImage
                            source={require("@assets/gbg-hoops-logo.png")}
                        />
                    </View>
                </YStack>
                <View mt="auto" mb="$30">
                    <Button
                        text="Let's Go!"
                        fullWidth
                        onPress={() => {
                            router.push("/login");
                        }}
                    />
                </View>
            </YStack>
            {/* Video Background */}
            <BackgroundVideo />
        </Stack>
    );
};

const BackgroundVideo = () => {
    const { width, height } = Dimensions.get("window");
    return (
        <View
            pos="absolute"
            top={0}
            left={0}
            width={width}
            height={height}
            zIndex={0}
        >
            <View
                pos="absolute"
                height={"100%"}
                width={"100%"}
                zIndex={1}
                backgroundColor={"rgba(30, 30, 30, 0.85)"}
            />
            <Video
                shouldPlay
                isLooping
                resizeMode={ResizeMode.COVER}
                source={require("@assets/video/gbg-hoops-reel.mp4")}
                style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                }}
            />
        </View>
    );
};

export default BeginAuth;
