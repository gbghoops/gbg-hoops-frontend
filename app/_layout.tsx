import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "@src/context/auth-context";
import { colors } from "@src/styles/theme/colors";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { TamaguiProvider } from "tamagui";

import TamaguiConfig from "@/tamagui.config";

const MainLayout = () => {
    SplashScreen.preventAutoHideAsync();

    SystemUI.setBackgroundColorAsync(colors.surface_background);

    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );
    }
    const [loaded] = useFonts({
        acumin_pro_bold: require("@assets/fonts/acumin-pro/acumin-pro-condensed-bold.otf"),
        acumin_pro_semibold: require("@assets/fonts/acumin-pro/acumin-pro-condensed-semibold.otf"),
        acumin_pro_regular: require("@assets/fonts/acumin-pro/acumin-pro-condensed.otf"),
    });

    useEffect(() => {
        changeScreenOrientation();
        Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    }, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    return (
        <TamaguiProvider config={TamaguiConfig}>
            <AuthProvider>
                <SafeAreaProvider>
                    {loaded ? (
                        <>
                            <StatusBar style="light" />
                            <Slot />
                        </>
                    ) : null}
                </SafeAreaProvider>
            </AuthProvider>
        </TamaguiProvider>
    );
};

export default MainLayout;
