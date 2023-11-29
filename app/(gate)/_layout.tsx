import { useEffect } from "react";
import { useAuthState } from "@src/context/auth-context";
import { Slot, useRouter } from "expo-router";
import { CustomSafeAreaView } from "@src/components/styled-components";

export default function GatingLayout() {
	const authState = useAuthState();
	const router = useRouter();

	useEffect(() => {
		if (authState?.user) {
			return router.replace("/home");
		}

		return router.replace("/login");
	}, [authState?.user]);

	return (
		<CustomSafeAreaView>
			<Slot />
		</CustomSafeAreaView>
	);
}
