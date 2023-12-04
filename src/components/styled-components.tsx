import { Image } from "react-native";
import { styled } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";

export const CustomSafeAreaView = styled(SafeAreaView, {
	flex: 1,
	backgroundColor: "$surface_primary",
});

// <--- Ignore Tamagui TS error.
// @ts-ignore
export const StyledImage = styled(Image, {
	resizeMode: "contain",
	maxWidth: "100%",
});
