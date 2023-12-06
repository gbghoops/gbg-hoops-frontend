import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { faker } from "@faker-js/faker";
import LargeSecureStore from "@src/utils/large-secure-store";
import * as EmailValidator from "email-validator";

interface User {
    id: string;
    email: string;
}

interface IAuthContext {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

const MOCK_PASSWORD = "gbg1234";

export default function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);

    const secureStore = new LargeSecureStore();

    const updateUserData = async () => {
        const email = await secureStore.getItem("USER_EMAIL");
        const userId = await secureStore.getItem("USER_ID");

        if (!email || !userId) {
            return;
        }

        setUser({
            email,
            id: userId,
        });
    };

    const setUserData = async (email: string, id: string) => {
        await secureStore.setItem("USER_EMAIL", email);
        await secureStore.setItem("USER_ID", id);
    };

    useEffect(() => {
        updateUserData();
    }, []);

    async function login(email: string, password: string) {
        const isEmailValid = email?.length
            ? EmailValidator.validate(email)
            : false;

        if (isEmailValid && password === MOCK_PASSWORD) {
            const userId = faker.string.uuid();

            await setUserData(email, userId);

            updateUserData();
        } else {
            throw new Error("Invalid credentials");
        }

        return;
    }

    async function logout() {
        await secureStore.removeItem("USER_EMAIL");
        await secureStore.removeItem("USER_ID");

        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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
