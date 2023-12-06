import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import EnterNewPassword from "@src/components/screen-components/ForgotPassword/EnterNewPassword";
import EnterResetPasswordEmail from "@src/components/screen-components/ForgotPassword/EnterResetPasswordEmail";
import PasswordResetCodeSent from "@src/components/screen-components/ForgotPassword/PasswordResetCodeSent";
import {
    FieldType,
    TitledTextField,
} from "@src/components/titled-text-field/TitledTextField";
import {
    ForgotPasswordState,
    ForgotPasswordStateProps,
} from "@src/types/password-reset";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { AnimatePresence, Text, View } from "tamagui";

export default function ForgotPassword() {
    const [passwordResetState, setPasswordResetState] =
        useState<ForgotPasswordState>(ForgotPasswordState.FORGOT_PASSWORD);
    const { bottom } = useSafeAreaInsets();

    const router = useRouter();

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
        <View f={1} px={wn(20)} pb={bottom + wn(20)}>
            {/* Forgot Password content */}
            <AnimatePresence>
                <RenderPasswordResetState
                    changePasswordResetState={(state) =>
                        setPasswordResetState(state)
                    }
                    passwordResetState={passwordResetState}
                />
            </AnimatePresence>
        </View>
    );
}

// Sub Components

// Sub Components
