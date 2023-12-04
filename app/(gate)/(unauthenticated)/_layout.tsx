import { colors } from "@src/styles/theme/colors";
import { Stack } from "expo-router";

export default function UnAuthenticatedLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: colors.surface_background,
                },
            }}
        />
    );
}
