export enum ForgotPasswordState {
    FORGOT_PASSWORD = "FORGOT_PASSWORD",
    CODE_SENT = "CODE_SENT",
    RESET_PASSWORD = "RESET_PASSWORD",
}

export interface ForgotPasswordStateProps {
    changePasswordResetState: (state: ForgotPasswordState) => void;
    email?: string;
    setEmail?: (email: string) => void;
    code?: string;
    setCode?: (code: string) => void;
    password?: string;
    setPassword?: (password: string) => void;

    onResetPassword?: () => Promise<void>;
    onPasswordChange?: () => Promise<void>;
}
