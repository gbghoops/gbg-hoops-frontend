import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "tamagui";

export const CustomSafeAreaView = styled(SafeAreaView, {
    flex: 1,
    backgroundColor: "$surface_background",
});

// <--- Ignore Tamagui TS error.
// @ts-ignore
export const StyledImage = styled(Image, {
    resizeMode: "contain",
    maxWidth: "100%",
});
