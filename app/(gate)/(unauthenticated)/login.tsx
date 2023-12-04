import { useState } from "react";
import { Linking } from "react-native";
import Button from "@src/components/button/Button";
import CustomSafeAreaView from "@src/components/CustomSafeAreaView";
import { StyledImage } from "@src/components/styled-components";
import { FieldType, TitledTextField } from "@src/components/titled-text-field";
import { useAuthState } from "@src/context/auth-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import * as Burnt from "burnt";
import * as EmailValidator from "email-validator";
import { Stack, Text, View, XStack, YStack } from "tamagui";

interface LoginErrorProps {
    error: true;
    message: string;
}
export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginLoading, setLoginLoading] = useState(false);

    const [error, setError] = useState<LoginErrorProps | null>(null);

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
                {/* Error container */}
                <View minHeight={wn(55)}>
                    <XStack
                        borderWidth={1}
                        borderColor="$error_primary"
                        my={wn(25)}
                        py={wn(10)}
                        px={wn(10)}
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <View w={wn(24)} h={wn(24)} jc="center" ai="center">
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
                                We couldn’t find an email associated with this
                                account. Please visit our website to create one.
                            </Text>
                        </View>
                    </XStack>
                </View>

                <YStack mt={wn(10)}>
                    <View mb={wn(20)}>
                        <Text fontFamily={"$heading"} fontSize={wn(24)}>
                            LOG IN
                        </Text>
                    </View>
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

                    <View mt={wn(20)}>
                        <Button
                            text="Login"
                            fullWidth
                            loading={loginLoading}
                            isDisabled={loginLoading}
                            onPress={simulateLogin}
                        />
                    </View>
                </YStack>

                <YStack mt={"auto"}>
                    <View mt={wn(20)}>
                        <Text
                            color="$surface_foreground"
                            fontSize={wn(16)}
                            textAlign="center"
                        >
                            {`Don't have an account?`}
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
