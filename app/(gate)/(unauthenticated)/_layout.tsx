import { Slot, Stack } from "expo-router";
import { JsStack } from "@src/components/layouts/js-stack";
import { colors } from "@src/styles/theme/colors";

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
