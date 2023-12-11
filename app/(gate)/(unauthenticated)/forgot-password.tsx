import { useState } from "react";
import { Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EnterNewPassword from "@src/components/screen-components/ForgotPassword/EnterNewPassword";
import EnterResetPasswordEmail from "@src/components/screen-components/ForgotPassword/EnterResetPasswordEmail";
import PasswordResetCodeSent from "@src/components/screen-components/ForgotPassword/PasswordResetCodeSent";
import { ForgotPasswordState } from "@src/types/password-reset";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { AnimatePresence, View } from "tamagui";

export default function ForgotPassword() {
    const [passwordResetState, setPasswordResetState] =
        useState<ForgotPasswordState>(ForgotPasswordState.FORGOT_PASSWORD);
    const { bottom } = useSafeAreaInsets();

    const RenderPasswordResetState = ({
        passwordResetState,
        changePasswordResetState,
    }: {
        passwordResetState: ForgotPasswordState;
        changePasswordResetState: (state: ForgotPasswordState) => void;
    }) => {
        switch (passwordResetState) {
            case ForgotPasswordState.FORGOT_PASSWORD:
                return (
                    <EnterResetPasswordEmail
                        changePasswordResetState={changePasswordResetState}
                    />
                );

            case ForgotPasswordState.CODE_SENT:
                return (
                    <PasswordResetCodeSent
                        changePasswordResetState={changePasswordResetState}
                    />
                );

            case ForgotPasswordState.RESET_PASSWORD:
                return (
                    <EnterNewPassword
                        changePasswordResetState={changePasswordResetState}
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
                    <RenderPasswordResetState
                        changePasswordResetState={(state) =>
                            setPasswordResetState(state)
                        }
                        passwordResetState={passwordResetState}
                    />
                </AnimatePresence>
            </KeyboardAwareScrollView>
        </View>
    );
}

// Sub Components

// Sub Components
