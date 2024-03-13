import React from "react";
import { Dimensions, StyleSheet } from "react-native";
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
                    f={1}
                >
                    <View
                        w="$220"
                        h="$220"
                        justifyContent="center"
                        ai="center"
                        marginHorizontal="auto"
                        marginTop="auto"
                        mb="$50"
                    >
                        <StyledImage
                            source={require("@assets/gbg-hoops-logo.png")}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
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
            <Video
                shouldPlay
                isLooping
                resizeMode={ResizeMode.COVER}
                source={require("@assets/video/gbg-sizzle-reel.mp4")}
                style={styles.VideoBackgroundVideo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    VideoBackgroundVideo: {
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
});

export default BeginAuth;
