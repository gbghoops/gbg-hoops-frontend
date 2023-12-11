import { useEffect, useState } from "react";
import { Keyboard, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "@src/components/button/Button";
import CustomSafeAreaView from "@src/components/CustomSafeAreaView";
import Link from "@src/components/link/Link";
import { StyledImage } from "@src/components/styled-components";
import {
    FieldType,
    TitledTextField,
} from "@src/components/titled-text-field/TitledTextField";
import { useAuthState } from "@src/context/auth-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import * as EmailValidator from "email-validator";
import { useRouter } from "expo-router";
import { Stack as NavigationStack } from "expo-router";
import { Stack, Text, View, XStack, YStack } from "tamagui";

interface LoginErrorProps {
    state: boolean;
    message: string;
}
export default function Page() {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loginLoading, setLoginLoading] = useState(false);

    const [error, setError] = useState<LoginErrorProps | null>(null);

    const [emailErrored, setEmailErrored] = useState(false);

    const authState = useAuthState();

    const router = useRouter();

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        clearError();
        setEmailErrored(false);
    }, [email, password]);

    const handleLogin = async () => {
        if (!loginLoading) {
            setLoginLoading(true);
        }

        const isEmailValid = email.length && EmailValidator.validate(email);
        const isPasswordValid = password.length;

        if (!isEmailValid || !isPasswordValid) {
            setEmailErrored(true);

            setLoginLoading(false);
            return;
        }

        try {
            await authState?.login(email, password);
        } catch (e) {
            if (e instanceof Error) {
                setError({
                    state: true,
                    message: e.message,
                });
            }
        }

        setLoginLoading(false);
    };

    const simulateLogin = async () => {
        setLoginLoading(true);

        return setTimeout(async () => {
            await handleLogin();
        }, 2000);
    };

    const loginDisabled = !email.length || !password.length || loginLoading;

    return (
        <CustomSafeAreaView>
            <NavigationStack.Screen
                options={{
                    header: () => null,
                    gestureEnabled: false,
                }}
            />
            <Stack
                f={1}
                px={"$20"}
                backgroundColor={"$surface_background"}
                onPress={Keyboard.dismiss}
            >
                <KeyboardAwareScrollView>
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
                    {/* Error container */}
                    <View mt={wn(20)}>
                        {error && error?.state ? (
                            <XStack
                                borderWidth={1}
                                borderColor="$error_primary"
                                py={wn(10)}
                                px={wn(10)}
                                justifyContent="flex-start"
                                alignItems="center"
                                animation={"medium"}
                                enterStyle={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                exitStyle={{
                                    opacity: 0,
                                    y: -10,
                                }}
                            >
                                <View
                                    w={wn(24)}
                                    h={wn(24)}
                                    jc="center"
                                    ai="center"
                                >
                                    <StyledImage
                                        source={require("@assets/icon/error.png")}
                                    />
                                </View>
                                <View f={1} ml={wn(5)}>
                                    <Text
                                        fontFamily={"$body"}
                                        fontSize={wn(17)}
                                        lineHeight={wn(18)}
                                    >
                                        {error.message}
                                    </Text>
                                </View>
                            </XStack>
                        ) : null}
                    </View>

                    <YStack mt={wn(10)} animation={"medium"}>
                        <View mb={wn(10)}>
                            <Text fontFamily={"$heading"} fontSize={wn(24)}>
                                LOG IN
                            </Text>
                        </View>
                        {/* Email Address */}
                        <View>
                            <TitledTextField
                                title="Email Address"
                                type={FieldType.EMAIL}
                                errorMessage={
                                    emailErrored
                                        ? "please enter a valid email address"
                                        : ""
                                }
                                placeholder="Enter your email address"
                                handleChange={(value) => {
                                    setEmail(value);
                                    setEmailErrored(false);
                                }}
                                handleFocus={() => {
                                    setEmailErrored(false);
                                }}
                                handleBlur={() => {
                                    setEmailErrored(false);
                                }}
                            />
                        </View>

                        {/* Password */}
                        <View mt={wn(10)}>
                            <TitledTextField
                                title="Password"
                                type={FieldType.PASSWORD}
                                placeholder="••••••••••••"
                                handleChange={(value) => setPassword(value)}
                            />
                        </View>

                        <View mt={wn(5)}>
                            <Button
                                text="Continue"
                                fullWidth
                                loading={loginLoading}
                                isDisabled={loginDisabled}
                                onPress={simulateLogin}
                            />
                        </View>

                        <View mt={wn(20)}>
                            <Link
                                onPress={() => {
                                    router.push("/forgot-password");
                                }}
                            >
                                Forgot Password
                            </Link>
                        </View>
                    </YStack>
                </KeyboardAwareScrollView>

                <YStack mt={"auto"} mb={"$20"}>
                    <View mt={wn(20)}>
                        <Text
                            color="$surface_foreground"
                            fontSize={wn(16)}
                            textAlign="center"
                            fontFamily={"$body"}
                        >
                            {`Don't have an account?`}
                        </Text>
                        <View flexDirection="row" jc="center" mt={wn(5)}>
                            <Link
                                onPress={() => {
                                    Linking.openURL("https://gbghoops.com");
                                }}
                            >{`Visit our website`}</Link>
                            <Text fontSize={wn(16)}> </Text>
                            <Text fontSize={wn(16)} fontFamily={"$body"}>
                                to create one
                            </Text>
                        </View>
                    </View>
                </YStack>
            </Stack>
        </CustomSafeAreaView>
    );
}
