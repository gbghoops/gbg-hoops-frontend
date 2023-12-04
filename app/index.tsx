import { useAuthState } from "@src/context/auth-context";
import { Redirect } from "expo-router";

export default function Entry() {
    const authState = useAuthState();

    if (!authState?.user) {
        return <Redirect href="/login" />;
    }

    return <Redirect href="/home" />;
}
