import { Header } from "@src/components/stack-header/StackHeader";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                header: () => null,
            }}
        />
    );
}
