import { Slot } from "expo-router";
import TamaguiConfig from "@/tamagui.config";
import { TamaguiProvider, Theme } from "tamagui";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AuthProvider from "@src/context/auth-context";
import * as SystemUI from "expo-system-ui";
import { colors } from "@src/styles/theme/colors";

const MainLayout = () => {
	SplashScreen.preventAutoHideAsync();

	SystemUI.setBackgroundColorAsync(colors.surface_background);

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
