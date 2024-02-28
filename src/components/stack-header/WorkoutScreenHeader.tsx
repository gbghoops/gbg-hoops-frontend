import { Octicons } from "@expo/vector-icons";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { View } from "tamagui";

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

export const WorkoutHeader = ({
    onBackPressed,
    canGoBack = true,
}: HeaderProps) => {
    const { back, canGoBack: checkCanGoBack, replace } = useRouter();

    const canRouterGoBack = checkCanGoBack();

    const defaultOnBackPressed = () => {
        canRouterGoBack ? back() : replace("/home");
    };

    return (
        <View
            ac="center"
            ai={"center"}
            justifyContent="space-between"
            height={60}
            fd={"row"}
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

            {/* More */}
            <View ml={"auto"}>
                <View
                    animation={"medium"}
                    pressStyle={{
                        opacity: 0.15,
                        scale: 0.95,
                    }}
                >
                    <Octicons
                        name={"kebab-horizontal"}
                        color={colors.gold}
                        size={wn(24)}
                    />
                </View>
            </View>
        </View>
    );
};
