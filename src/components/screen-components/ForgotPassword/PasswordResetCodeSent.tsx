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
import { Text, View } from "tamagui";

const PasswordResetCodeSent = ({
    changePasswordResetState,
}: ForgotPasswordStateProps) => {
    const [passwordResetLoading, setPasswordResetLoading] = useState(false);
    const [resetCodeErrored, setResetCodeErrored] = useState(false);
    const [resetCode, setResetCode] = useState("");

    const simulatePasswordResetCode = async () => {
        setPasswordResetLoading(true);

        const isResetCodeValid = resetCode.length === 6;

        if (!isResetCodeValid) {
            setResetCodeErrored(true);

            setPasswordResetLoading(false);
            return;
        }

        setTimeout(() => {
            setPasswordResetLoading(false);
            changePasswordResetState(ForgotPasswordState.RESET_PASSWORD);
        }, 1000);
    };

    const passwordResetDisabled = !resetCode.length || passwordResetLoading;

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
            <View mb="$15">
                <Text fontFamily={"$heading"} fontSize="$24">
                    Forgot Password
                </Text>
                <Text fontFamily={"$body"} fontSize="$16" mt="$10">
                    {`We've sent an email with a code to reset your password`}
                </Text>
            </View>

            <TitledTextField
                title={"Enter Code"}
                type={FieldType.NUMERIC}
                placeholder={"Code"}
                value={resetCode}
                errorMessage={resetCodeErrored ? "Invalid Code" : ""}
                handleChange={(value) => {
                    setResetCode(value);

                    setResetCodeErrored(false);
                }}
                handleFocus={() => setResetCodeErrored(false)}
            />
            <View mt={"auto"}>
                <Button
                    text="Continue"
                    fullWidth
                    loading={passwordResetLoading}
                    isDisabled={passwordResetDisabled}
                    onPress={simulatePasswordResetCode}
                />
            </View>
        </View>
    );
};

export default PasswordResetCodeSent;
