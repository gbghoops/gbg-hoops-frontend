import { colors } from "@src/styles/theme/colors";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                header: () => null,
                contentStyle: {
                    backgroundColor: colors.surface_background,
                },
            }}
        />
    );
}
