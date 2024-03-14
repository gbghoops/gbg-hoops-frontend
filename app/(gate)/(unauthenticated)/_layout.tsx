import { Header } from "@src/components/stack-header/StackHeader";
import { useAuthState } from "@src/context/auth-context";
import { colors } from "@src/styles/theme/colors";
import { Redirect, Stack } from "expo-router";

export default function UnAuthenticatedLayout() {
    const authState = useAuthState();

    if (authState && authState.user) {
        return <Redirect href="/home" />;
    }

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
