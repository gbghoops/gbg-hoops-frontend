import { Stack, Text, View, YStack, styled } from "tamagui";
import { StyledImage } from "@src/components/styled-components";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { FieldType, TitledTextField } from "@src/components/titled-text-field";
import { ActivityIndicator, Linking } from "react-native";
import * as Burnt from "burnt";
import { useAuthState } from "@src/context/auth-context";
import { useEffect, useState } from "react";
import * as EmailValidator from "email-validator";
import Button from "@src/components/button/Button";
import CustomSafeAreaView from "@src/components/CustomSafeAreaView";

export default function Page() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginLoading, setLoginLoading] = useState(false);

	const authState = useAuthState();

	const handleLogin = async () => {
		if (!loginLoading) {
			setLoginLoading(true);
		}

		const isEmailValid = email.length && EmailValidator.validate(email);
		const isPasswordValid = password.length;

		if (!isEmailValid || !isPasswordValid) {
			Burnt.toast({
				title: "Please enter a valid email and password",
				preset: "error",
			});

			setLoginLoading(false);
			return;
		}

		try {
			await authState?.login(email, password);
		} catch (e) {
			if (e instanceof Error) {
				Burnt.toast({
					title: e.message,
					preset: "error",
				});
			}
		}

		setLoginLoading(false);

		return;
	};

	const simulateLogin = async () => {
		setLoginLoading(true);

		return setTimeout(async () => {
			await handleLogin();
		}, 2000);
	};

	return (
		<CustomSafeAreaView>
			<Stack f={1} px={"$20"} backgroundColor={"$surface_background"}>
				<YStack justifyContent="center" alignItems="center">
					<View
						w={wn(135)}
						h={wn(200)}
						justifyContent="center"
						ac="center"
						marginHorizontal="auto"
						marginTop={wn(30)}
					>
						<StyledImage
							source={require("@assets/gbg-hoops-logo.png")}
						/>
					</View>
				</YStack>

				<YStack mt={"$60"}>
					{/* Email Address */}
					<View>
						<TitledTextField
							title="Email Address"
							type={FieldType.EMAIL}
							placeholder="Enter your email address"
							handleChange={(value) => setEmail(value)}
						/>
					</View>

					{/* Password */}
					<View mt={wn(20)}>
						<TitledTextField
							title="Password"
							type={FieldType.PASSWORD}
							placeholder="••••••••••••"
							handleChange={(value) => setPassword(value)}
						/>
					</View>
				</YStack>

				<YStack mt={"auto"}>
					<Button
						text="Login"
						fullWidth
						loading={loginLoading}
						isDisabled={loginLoading}
						onPress={simulateLogin}
					/>

					<View mt={wn(20)}>
						<Text
							color="$surface_foreground"
							fontSize={wn(16)}
							textAlign="center"
						>
							Don't have an account?
						</Text>
						<View flexDirection="row" jc="center" mt={wn(5)}>
							<Text
								fontSize={wn(16)}
								textDecorationLine="underline"
								color="$gold"
								onPress={() => {
									Linking.openURL("https://gbghoops.com");
								}}
							>{`Visit our website`}</Text>
							<Text fontSize={wn(16)}> </Text>
							<Text fontSize={wn(16)}>to create one</Text>
						</View>
					</View>
				</YStack>
			</Stack>
		</CustomSafeAreaView>
	);
}
