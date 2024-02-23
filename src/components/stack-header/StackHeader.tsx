import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { View } from "tamagui";

import Avatar from "../avatar/Avatar";

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
                    <Avatar />
                </View>
            ) : null}
        </View>
    );
};
