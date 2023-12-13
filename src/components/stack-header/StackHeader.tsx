import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { Avatar, Text, View } from "tamagui";

interface ProgressState {
    progress: number;
    maxProgress: number;
}
interface HeaderProps {
    onBackPressed?: () => void;
    progress?: ProgressState;
    canGoBack?: boolean;
    showAvatar?: boolean;
}

export const Header = ({
    onBackPressed,
    canGoBack = true,
    showAvatar = false,
}: HeaderProps) => {
    const { back, canGoBack: checkCanGoBack, replace } = useRouter();
    const { top } = useSafeAreaInsets();
    const router = useRouter();

    const canRouterGoBack = checkCanGoBack();

    const defaultOnBackPressed = () => {
        canRouterGoBack ? back() : replace("/home");
    };

    return (
        <View
            ac="center"
            ai={"center"}
            justifyContent="space-between"
            height={wn(60) + top}
            fd={"row"}
            paddingTop={top}
            paddingHorizontal={"$20"}
            backgroundColor={"$surface_background"}
        >
            {/* Back Button */}
            <View width="$36" height="$36">
                {canGoBack ? (
                    <View
                        width={"100%"}
                        height={"100%"}
                        backgroundColor={"$transparent"}
                        justifyContent="center"
                        alignItems="center"
                        animation={"slow"}
                        onPress={async () => {
                            onBackPressed
                                ? await onBackPressed()
                                : defaultOnBackPressed();
                        }}
                        pressStyle={{
                            opacity: 0.15,
                            scale: 0.95,
                        }}
                    >
                        <Octicons
                            name="arrow-left"
                            size={36}
                            color={colors.gold}
                        />
                    </View>
                ) : null}
            </View>

            {/* Avatar */}
            {showAvatar ? (
                <View ml={"auto"}>
                    <Avatar
                        circular
                        size={"$40"}
                        animation={"medium"}
                        onPress={() => {
                            router.push("/settings");
                        }}
                        pressStyle={{
                            opacity: 0.85,
                            scale: 0.9,
                        }}
                    >
                        <Avatar.Image src="http://placekitten123.com/200/300" />
                        <Avatar.Fallback bc="$gold" ai="center" jc="center">
                            <Text
                                color="$black"
                                fontFamily={"$body"}
                                fontSize="$20"
                                lineHeight={22}
                            >
                                AB
                            </Text>
                        </Avatar.Fallback>
                    </Avatar>
                </View>
            ) : null}
        </View>
    );
};
