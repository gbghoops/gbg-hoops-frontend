import { Stack, Text } from "tamagui";

export default function ProgramsPage() {
    return (
        <Stack
            backgroundColor={"$surface_background"}
            f={1}
            justifyContent="center"
            ac={"center"}
        >
            <Text color="$text_primary" ta="center" fontFamily={"$heading"}>
                Programs page
            </Text>
        </Stack>
    );
}
