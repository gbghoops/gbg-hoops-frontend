import { Stack, Text } from "tamagui";

export default function Page() {
	return (
		<Stack
			backgroundColor={"$surface_primary"}
			f={1}
			justifyContent="center"
			ac={"center"}
		>
			<Text color="$text_primary" ta="center">
				Home page
			</Text>
		</Stack>
	);
}
