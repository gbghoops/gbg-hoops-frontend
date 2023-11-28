import { Slot } from "expo-router";
import TamaguiConfig from "@/tamagui.config";
import { TamaguiProvider, Theme } from "tamagui";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const MainLayout = () => {
	SplashScreen.preventAutoHideAsync();

	async function changeScreenOrientation() {
		await ScreenOrientation.lockAsync(
			ScreenOrientation.OrientationLock.PORTRAIT_UP
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
