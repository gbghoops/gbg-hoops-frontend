import { useAuthState } from "@src/context/auth-context";
import ProgramsProvider from "@src/context/ProgramsContext/programs-context";
import { colors } from "@src/styles/theme/colors";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
    const authState = useAuthState();

    if (!authState || !authState.user) {
        return <Redirect href="/begin-auth" />;
    }

    return (
        <ProgramsProvider>
            <Stack
                screenOptions={{
                    header: () => null,
                    contentStyle: {
                        backgroundColor: colors.surface_background,
                    },
                }}
            />
        </ProgramsProvider>
    );
}
