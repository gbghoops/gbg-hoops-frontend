import { useUser } from "@src/context/UserContext/user-context";
import { useRouter } from "expo-router";
import { Avatar as TAvatar, Text } from "tamagui";

interface AvatarProps {
    onPress?: () => void;
    size?: number;
}

export default function Avatar({ size, onPress }: AvatarProps) {
    const { user } = useUser();
    const router = useRouter();

    const initials = user
        ? deriveIinitials(user.given_name, user.family_name)
        : null;

    return user ? (
        <TAvatar
            circular
            size={size ? size : "$40"}
            animation={"medium"}
            onPress={() => {
                onPress ? onPress() : router.push("/settings");
            }}
            pressStyle={{
                opacity: 0.85,
                scale: 0.9,
            }}
        >
            <TAvatar.Image src="http://placekitten123.com/200/300" />
            <TAvatar.Fallback bc="$gold" ai="center" jc="center">
                <Text
                    color="$black"
                    fontFamily={"$body"}
                    fontSize={"$20"}
                    mt="$4"
                >
                    {initials}
                </Text>
            </TAvatar.Fallback>
        </TAvatar>
    ) : null;
}

const deriveIinitials = (first_name: string, last_name: string) => {
    return `${first_name[0]}${last_name[0]}`;
};
