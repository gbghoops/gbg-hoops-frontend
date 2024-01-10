import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@src/styles/theme/colors";
import { Stack } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Layout() {
    const [orientation, setOrientation] =
        useState<ScreenOrientation.Orientation>();
    useEffect(() => {
        const sub = ScreenOrientation.addOrientationChangeListener((event) => {
            setOrientation(event.orientationInfo.orientation);
        });

        return () => {
            ScreenOrientation.removeOrientationChangeListener(sub);
        };
    }, []);

    const isLandscapeLeft =
        orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT;

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: "100%",
            }}
            edges={["top", "bottom", isLandscapeLeft ? "right" : "left"]}
        >
            <Stack
                screenOptions={{
                    header: () => null,
                    contentStyle: {
                        backgroundColor: colors.surface_background,
                    },
                }}
            />
        </SafeAreaView>
    );
}
