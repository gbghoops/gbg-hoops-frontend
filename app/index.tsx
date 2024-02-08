import { useEffect } from "react";
import { useAuthState } from "@src/context/auth-context";
import { Amplify } from "aws-amplify";
import { Redirect } from "expo-router";
import { usePathname } from "expo-router";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.COGNITO_USERPOOL_ID!,
            userPoolClientId: process.env.COGNITO_USERPOOL_CLIENT_ID!,
        },
    },
});

export default function Entry() {
    const authState = useAuthState();
    const pathname = usePathname();

    useEffect(() => {}, [pathname]);

    if (!authState?.user) {
        return <Redirect href="/login" />;
    }

    return <Redirect href="/home" />;
}
