import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import * as EmailValidator from "email-validator";
import LargeSecureStore from "@src/utils/large-secure-store";
import { faker } from "@faker-js/faker";

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

	const { setItem, getItem, removeItem } = new LargeSecureStore();

	const updateUserData = async () => {
		const email = await getItem("USER_EMAIL");
		const userId = await getItem("USER_ID");

		if (!email || !userId) {
			return;
		}

		setUser({
			email,
			id: userId,
		});
	};

	const setUserData = async (email: string, id: string) => {
		await setItem("USER_EMAIL", email);
		await setItem("USER_ID", id);
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
		} else {
			throw new Error("Invalid credentials");
		}

		return;
	}

	async function logout() {
		await removeItem("USER_EMAIL");
		await removeItem("USER_ID");

		setUser(null);
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
