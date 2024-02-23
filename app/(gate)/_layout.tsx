import { useEffect } from "react";
import { useAuthState } from "@src/context/auth-context";
import { User } from "@src/context/UserContext/types";
import { useUser } from "@src/context/UserContext/user-context";
import { Slot, useRouter } from "expo-router";

export default function GatingLayout() {
    const authState = useAuthState();
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (authState?.user) {
            if (user && !checkIfAssesmentComplete(user)) {
                return router.replace("/assesment");
            }

            return router.replace("/home");
        }

        return router.replace("/begin-auth");
    }, [authState?.user]);

    return <Slot />;
}

const checkIfAssesmentComplete = (user: User) => {
    return !!(user.gender && user.hoop_level && user.performance_goal);
};
