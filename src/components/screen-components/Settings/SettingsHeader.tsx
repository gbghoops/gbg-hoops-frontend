import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { View } from "tamagui";

interface SettingsHeaderProps {
    showBackButton?: boolean;
}

const SettingsHeader = ({ showBackButton = false }: SettingsHeaderProps) => {
    const { top } = useSafeAreaInsets();
    const { back, replace } = useRouter();

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
            {showBackButton ? (
                <View
                    width={"$36"}
                    height={"$36"}
                    animation={"slow"}
                    onPress={back}
                    pressStyle={{
                        opacity: 0.15,
                        scale: 0.95,
                    }}
                >
                    <Octicons name="arrow-left" size={36} color={colors.gold} />
                </View>
            ) : null}
            <View
                ml="auto"
                w="$40"
                h="$40"
                animation="medium"
                pressStyle={{
                    opacity: 0.85,
                    scale: 0.985,
                }}
                onPress={() => replace("/home")}
            >
                <Octicons name="x" size={36} color={colors.gold} />
            </View>
        </View>
    );
};

export default SettingsHeader;
