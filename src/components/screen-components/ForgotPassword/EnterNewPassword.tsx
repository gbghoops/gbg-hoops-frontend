import { useState } from "react";
import Button from "@src/components/button/Button";
import {
    FieldType,
    TitledTextField,
} from "@src/components/titled-text-field/TitledTextField";
import {
    ForgotPasswordState,
    ForgotPasswordStateProps,
} from "@src/types/password-reset";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

const EnterNewPassword = ({
    changePasswordResetState,
}: ForgotPasswordStateProps) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordErrored, setIsPasswordErrored] = useState(false);

    const router = useRouter();
    const [passwordResetLoading, setPasswordResetLoading] = useState(false);

    const simulatePasswordReset = async () => {
        setPasswordResetLoading(true);

        const isPasswordValid = password === confirmPassword;

        if (!isPasswordValid) {
            setIsPasswordErrored(true);

            setPasswordResetLoading(false);
            return;
        }

        setTimeout(() => {
            setPasswordResetLoading(false);
            changePasswordResetState(ForgotPasswordState.FORGOT_PASSWORD);

            router.push("/login");
        }, 1000);
    };

    const passwordResetDisabled =
        !password.length || !confirmPassword.length || passwordResetLoading;

    return (
        <View
            pt={"50%"}
            f={1}
            animation={["slow", { opacity: { delay: 80 }, y: { delay: 100 } }]}
            enterStyle={{
                opacity: 0,
                y: 10,
            }}
            exitStyle={{
                opacity: 0,
                y: -10,
            }}
        >
            <View>
                <Text fontFamily={"$heading"} fontSize="$24">
                    Forgot Password
                </Text>
                <Text fontFamily={"$body"} fontSize="$16" mt="$10">
                    Enter your email below to reset your password.
                </Text>
            </View>
            <View mt="$16">
                <TitledTextField
                    title={"Password"}
                    type={FieldType.PASSWORD}
                    placeholder="••••••••••••"
                    errorMessage={
                        isPasswordErrored ? "Passwords do not match." : ""
                    }
                    handleChange={(value) => {
                        setPassword(value);
                        setIsPasswordErrored(false);
                    }}
                    handleFocus={() => setIsPasswordErrored(false)}
                />
            </View>
            <View mt="$16">
                <TitledTextField
                    title={"Confirm Password"}
                    type={FieldType.PASSWORD}
                    placeholder="••••••••••••"
                    handleChange={(value) => {
                        setConfirmPassword(value);
                        setIsPasswordErrored(false);
                    }}
                    handleFocus={() => setIsPasswordErrored(false)}
                />
            </View>
            <View mt={"auto"}>
                <Button
                    text="Return to Login"
                    fullWidth
                    loading={passwordResetLoading}
                    isDisabled={passwordResetDisabled}
                    onPress={simulatePasswordReset}
                />
            </View>
        </View>
    );
};

export default EnterNewPassword;
