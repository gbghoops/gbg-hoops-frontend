import ProgramsProvider from "@src/context/ProgramsContext/programs-context";
import UserProvider from "@src/context/UserContext/user-context";
import { colors } from "@src/styles/theme/colors";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <ProgramsProvider>
            <UserProvider>
                <Stack
                    screenOptions={{
                        header: () => null,
                        contentStyle: {
                            backgroundColor: colors.surface_background,
                        },
                    }}
                />
            </UserProvider>
        </ProgramsProvider>
    );
}
