import { useEffect, useState } from "react";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";

import { Input, Text, View, XStack, YStack } from "tamagui";

export enum FieldType {
	EMAIL = "EMAIL",
	PASSWORD = "PASSWORD",
	TEXT = "TEXT",
}

interface TitledTextFieldProps {
	title: string;
	isPassword?: boolean;
	showHidePassword?: boolean;
	isEmail?: boolean;
	placeholder?: string;
	delayIndex?: number;
	type: FieldType;
	value?: string;
	handleChange?: (value: string) => void;
	handleFocus?: () => void;
	handleBlur?: () => void;
}

export const TitledTextField = ({
	title,
	placeholder,
	delayIndex = 1,
	type,
	value: initialValue,
	handleChange,
	handleBlur,
	handleFocus,
}: TitledTextFieldProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const [value, setValue] = useState(initialValue ?? "");

	const itemsAnimations = {
		from: {
			opacity: 0,
			translateY: 20,
		},
		animate: {
			opacity: 1,
			scale: 1,
			translateY: 0,
		},
		transition: {
			type: "spring" as const,
			stiffness: 50,
			damping: 20,
		},
		delay: 150 * delayIndex,
	};

	useEffect(() => {
		handleChange && handleChange(value);
	}, [value]);

	useEffect(() => {
		setValue(initialValue ?? "");
	}, [initialValue]);

	return (
		<YStack animation={"fast"} height={wn(60)}>
			<XStack justifyContent="space-between" alignItems="center">
				<Text
					fontFamily={"$body"}
					fontSize={wn(13)}
					mt={wn(10)}
					ml={wn(10)}
					color={"$white"}
				>
					{title}
				</Text>
			</XStack>
			<Input
				secureTextEntry={type === FieldType.PASSWORD}
				autoCapitalize={type === FieldType.EMAIL ? "none" : "sentences"}
				placeholder={placeholder}
				placeholderTextColor="rgba(179, 185, 196, 0.5)"
				backgroundColor={"$transparent"}
				paddingTop={wn(18)}
				paddingLeft={wn(8)}
				width={"100%"}
				height={"100%"}
				borderColor={"#F2F2F2"}
				focusStyle={{
					borderColor: "#F2f2f2",
				}}
				keyboardType={
					type === FieldType.EMAIL ? "email-address" : "default"
				}
				fontSize={wn(16)}
				borderRadius={8}
				borderCurve="continuous"
				borderWidth={1}
				position="absolute"
				zIndex={0}
				top={0}
				left={0}
				bottom={0}
				value={value}
				onChangeText={(value) => setValue(value)}
				onFocus={() => {
					setIsFocused(true);
					handleFocus && handleFocus();
				}}
				onBlur={() => {
					setIsFocused(false);
					handleBlur && handleBlur();
				}}
			/>
		</YStack>
	);
};
