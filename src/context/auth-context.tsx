import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { Amplify } from "aws-amplify";
import { fetchUserAttributes, signIn, signOut } from "aws-amplify/auth";
import * as EmailValidator from "email-validator";

interface User {
    id: string;
    email: string;
}

interface IAuthContext {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.COGNITO_USERPOOL_ID!,
            userPoolClientId: process.env.COGNITO_USERPOOL_CLIENT_ID!,
        },
    },
});

const AuthContext = createContext<IAuthContext | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const user = await fetchUserAttributes();
            if (user) {
                setUser({
                    id: user.sub!,
                    email: user.email!,
                });
            }
        } catch (e) {
            // No user is signed in
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    async function login(email: string, password: string) {
        const isEmailValid = email?.length
            ? EmailValidator.validate(email)
            : false;

        if (!isEmailValid) {
            throw new Error("Invalid email");
        }

        const { isSignedIn, nextStep } = await signIn({
            username: email,
            password,
        });

        if (isSignedIn) {
            fetchUser();
        } else if (nextStep) {
            throw new Error(`Sign in failed: ${nextStep}`);
        }
    }

    async function logout() {
        await signOut();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthState = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }

    return context;
};
