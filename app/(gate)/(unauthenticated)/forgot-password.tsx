import { useState } from "react";
import { Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EnterNewPassword from "@src/components/screen-components/ForgotPassword/EnterNewPassword";
import EnterResetPasswordEmail from "@src/components/screen-components/ForgotPassword/EnterResetPasswordEmail";
import PasswordResetCodeSent from "@src/components/screen-components/ForgotPassword/PasswordResetCodeSent";
import { ForgotPasswordState } from "@src/types/password-reset";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { confirmResetPassword, resetPassword } from "aws-amplify/auth";
import { AnimatePresence, View } from "tamagui";

export default function ForgotPassword() {
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordResetState, setPasswordResetState] =
        useState<ForgotPasswordState>(ForgotPasswordState.FORGOT_PASSWORD);
    const { bottom } = useSafeAreaInsets();

    const handleResetPassword = async () => {
        await resetPassword({ username: email });
    };

    const handlePasswordChange = async () => {
        await confirmResetPassword({
            username: email,
            newPassword: password,
            confirmationCode: code,
        });
    };

    const RenderPasswordResetState = () => {
        switch (passwordResetState) {
            case ForgotPasswordState.FORGOT_PASSWORD:
                return (
                    <EnterResetPasswordEmail
                        changePasswordResetState={setPasswordResetState}
                        email={email}
                        setEmail={setEmail}
                        onResetPassword={handleResetPassword}
                    />
                );

            case ForgotPasswordState.CODE_SENT:
                return (
                    <PasswordResetCodeSent
                        changePasswordResetState={setPasswordResetState}
                        code={code}
                        setCode={setCode}
                    />
                );

            case ForgotPasswordState.RESET_PASSWORD:
                return (
                    <EnterNewPassword
                        changePasswordResetState={setPasswordResetState}
                        password={password}
                        setPassword={setPassword}
                        onPasswordChange={handlePasswordChange}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <View f={1} px={wn(20)} pb={bottom + wn(20)} onPress={Keyboard.dismiss}>
            {/* Forgot Password content */}
            <KeyboardAwareScrollView>
                <AnimatePresence>
                    <>{RenderPasswordResetState}</>
                </AnimatePresence>
            </KeyboardAwareScrollView>
        </View>
    );
}
