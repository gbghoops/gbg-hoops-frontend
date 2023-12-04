import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SplashScreen from "expo-splash-screen";
import { TamaguiProvider, Theme } from "tamagui";

import TamaguiConfig from "@/tamagui.config";

const MainLayout = () => {
    SplashScreen.preventAutoHideAsync();

    async function changeScreenOrientation(): Promise<void> {
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
    }, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    return (
        <TamaguiProvider config={TamaguiConfig}>
            <SafeAreaProvider>{loaded ? <Slot /> : null}</SafeAreaProvider>
        </TamaguiProvider>
    );
};

export default MainLayout;
