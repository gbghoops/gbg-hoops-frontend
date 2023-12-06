export enum ForgotPasswordState {
    FORGOT_PASSWORD = "FORGOT_PASSWORD",
    CODE_SENT = "CODE_SENT",
    RESET_PASSWORD = "RESET_PASSWORD",
}

export interface ForgotPasswordStateProps {
    changePasswordResetState: (state: ForgotPasswordState) => void;
}
