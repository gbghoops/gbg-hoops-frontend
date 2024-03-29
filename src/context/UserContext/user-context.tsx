import { createContext, PropsWithChildren, useContext } from "react";
import { whiteList } from "@src/constants/privileged-mode-whitelist";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";

import { User } from "./types";

const fetchUser = async () => {
    const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL ?? "";

    try {
        const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();

        const response = await fetch(`${backend_url}/users/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching user data");
        }

        const data = await response.json();

        const user = data;

        return user;
    } catch (error) {
        throw new Error("Error fetching user data");
    }
};

interface UserContextProps {
    user: User | null;
    error: Error | null;
    userDataLoading: boolean;
    refetchUser: () => Promise<QueryObserverResult<User, Error>>;
}
export const UserContext = createContext<UserContextProps | null>(null);

export default function UserProvider({ children }: PropsWithChildren) {
    const {
        data,
        isLoading,
        error,
        refetch: refetchUser,
    } = useQuery<User>({
        queryKey: ["user"],
        queryFn: fetchUser,
    });

    const isPrivilegedUser = data?.email
        ? whiteList.includes(data?.email)
        : false;

    return (
        <UserContext.Provider
            value={{
                error,
                userDataLoading: isLoading,
                user: data ? { ...data, isPrivilegedUser } : null,
                refetchUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
};
