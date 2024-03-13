import SettingsHeader from "@src/components/screen-components/Settings/SettingsHeader";
import { colors } from "@src/styles/theme/colors";
import { Stack } from "expo-router";

const SettingsLayout = () => {
    return (
        <Stack
            screenOptions={{
                header: () => <SettingsHeader />,
                gestureEnabled: false,
                contentStyle: {
                    backgroundColor: colors.surface_background,
                },
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen
                name="edit-profile"
                options={{
                    header: () => <SettingsHeader showBackButton />,
                }}
            />
        </Stack>
    );
};

export default SettingsLayout;
