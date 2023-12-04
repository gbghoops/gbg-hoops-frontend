import { useState } from "react";
import { ActivityIndicator, Linking } from "react-native";
import { StyledImage } from "@src/components/styled-components";
import { FieldType, TitledTextField } from "@src/components/titled-text-field";
import { useAuthState } from "@src/context/auth-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import * as Burnt from "burnt";
import * as EmailValidator from "email-validator";
import { Stack, styled, Text, View, YStack } from "tamagui";

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
    };

    const simulateLogin = async () => {
        setLoginLoading(true);

        return setTimeout(async () => {
            await handleLogin();
        }, 2000);
    };

    return (
        <Stack backgroundColor={"$surface_primary"} f={1} px={"$20"}>
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
                        handleChange={(value) => {
                            setEmail(value);
                        }}
                    />
                </View>

                {/* Password */}
                <View mt={wn(20)}>
                    <TitledTextField
                        title="Password"
                        type={FieldType.PASSWORD}
                        placeholder="••••••••••••"
                        handleChange={(value) => {
                            setPassword(value);
                        }}
                    />
                </View>
            </YStack>

            <YStack mt={"auto"}>
                <StyledLoginButton
                    animation={"medium"}
                    disabled={loginLoading}
                    isDisabled={loginLoading}
                    onPress={simulateLogin}
                >
                    <Text color="$surface_foreground" fontSize={wn(16)}>
                        {loginLoading ? (
                            <ActivityIndicator size={"small"} />
                        ) : (
                            `Continue`
                        )}
                    </Text>
                </StyledLoginButton>

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
    );
}

const StyledLoginButton = styled(View, {
    width: "100%",
    borderRadius: wn(25),
    borderCurve: "circular",
    paddingHorizontal: wn(24),
    paddingVertical: wn(12),
    jc: "center",
    ai: "center",
    borderWidth: 1,
    borderColor: "$surface_secondary",
    opacity: 1,
    pressStyle: { scale: 0.95, opacity: 0.75 },
    variants: {
        isDisabled: {
            true: {
                opacity: 0.5,
                disabled: true,
            },
        },
    },
});
