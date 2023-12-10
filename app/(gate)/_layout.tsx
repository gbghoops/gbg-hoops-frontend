import { useEffect } from "react";
import { useAuthState } from "@src/context/auth-context";
import { Slot, useRouter } from "expo-router";

export default function GatingLayout() {
    const authState = useAuthState();
    const router = useRouter();

    useEffect(() => {
        if (authState?.user) {
            return router.replace("/home");
        }

        return router.replace("/begin-auth");
    }, [authState?.user]);

    return <Slot />;
}
