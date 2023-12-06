import { useAuthState } from "@src/context/auth-context";
import { Stack, Text, View } from "tamagui";

export default function HomePage() {
    const authState = useAuthState();
    return (
        <Stack
            backgroundColor={"$surface_background"}
            f={1}
            justifyContent="center"
            ac={"center"}
        >
            <Text color="$text_primary" ta="center" fontFamily={"$heading"}>
                Home page
            </Text>

            <View
                mt={30}
                p={30}
                backgroundColor={"$surface_foreground"}
                pressStyle={{ opacity: 0.5 }}
                animation={"fast"}
                onPress={() => {
                    authState?.logout();
                }}
            >
                <Text color="$black" ta="center" fontFamily={"$body"}>
                    Logout
                </Text>
            </View>
        </Stack>
    );
}
