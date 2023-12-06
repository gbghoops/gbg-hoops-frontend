import { useState } from "react";
import Button from "@src/components/button/Button";
import { TitledTextField } from "@src/components/titled-text-field/TitledTextField";
import { FieldType } from "@src/components/titled-text-field/TitledTextField";
import {
    ForgotPasswordState,
    ForgotPasswordStateProps,
} from "@src/types/password-reset";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import * as EmailValidator from "email-validator";
import { Text, View } from "tamagui";

const EnterResetPasswordEmail = ({
    changePasswordResetState,
}: ForgotPasswordStateProps) => {
    const [email, setEmail] = useState("");
    const [emailErrored, setEmailErrored] = useState(false);
    const [passwordResetLoading, setPasswordResetLoading] = useState(false);

    const simulatePasswordReset = async () => {
        setPasswordResetLoading(true);

        const isEmailValid = email.length && EmailValidator.validate(email);

        if (!isEmailValid) {
            setEmailErrored(true);

            setPasswordResetLoading(false);
            return;
        }

        setTimeout(() => {
            setPasswordResetLoading(false);
            changePasswordResetState(ForgotPasswordState.CODE_SENT);
        }, 1000);
    };

    const passwordResetDisabled = !email.length || passwordResetLoading;

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
                <Text fontFamily={"$heading"} fontSize={wn(24)}>
                    Forgot Password
                </Text>
                <Text fontFamily={"$body"} fontSize={wn(16)} mt={wn(10)}>
                    Enter your email below to reset your password.
                </Text>
            </View>
            <View mt={wn(16)}>
                <TitledTextField
                    title={"Email Address"}
                    type={FieldType.EMAIL}
                    placeholder={"Enter your email address"}
                    errorMessage={
                        emailErrored ? "please enter a valid email address" : ""
                    }
                    handleChange={(value) => {
                        setEmail(value);
                        setEmailErrored(false);
                    }}
                    handleFocus={() => setEmailErrored(false)}
                />
            </View>
            <View mt={"auto"}>
                <Button
                    text="Continue"
                    fullWidth
                    loading={passwordResetLoading}
                    isDisabled={passwordResetDisabled}
                    onPress={simulatePasswordReset}
                />
            </View>
        </View>
    );
};

export default EnterResetPasswordEmail;
