import { useRouter, Redirect } from "expo-router";
import { useAuthState } from "@src/context/auth-context";

export default function Entry() {
	const authState = useAuthState();

	if (!authState?.user) {
		return <Redirect href="/login" />;
	}

	return <Redirect href="/home" />;
}
