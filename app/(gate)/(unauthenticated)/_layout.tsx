import { Header } from "@src/components/stack-header/StackHeader";
import { colors } from "@src/styles/theme/colors";
import { Stack } from "expo-router";

export default function UnAuthenticatedLayout() {
    return (
        <Stack
            screenOptions={{
                header: () => <Header />,
                contentStyle: {
                    backgroundColor: colors.surface_background,
                },
            }}
        />
    );
}
