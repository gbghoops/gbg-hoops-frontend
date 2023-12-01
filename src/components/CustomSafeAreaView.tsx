import { PropsWithChildren } from "react";
import { View } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@src/styles/theme/colors";

interface CustomSafeAreaViewProps extends PropsWithChildren {
	backgroundColor?: string;
}
export default function CustomSafeAreaView(props: CustomSafeAreaViewProps) {
	const insets = useSafeAreaInsets();
	return (
		<View
			f={1}
			pt={insets.top}
			pb={insets.bottom}
			backgroundColor={props.backgroundColor ?? colors.surface_background}
		>
			{props.children}
		</View>
	);
}
