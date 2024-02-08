import { useAuthState } from "@src/context/auth-context";
import { Redirect } from "expo-router";

export default function Entry() {
    const authState = useAuthState();

    // wait til authState is defined and loading is complete
    if (!authState || authState.loading) {
        return null;
    }

    // redirect if not a valid user
    if (!authState.user) {
        return <Redirect href="/login" />;
    }

    return <Redirect href="/home" />;
}
