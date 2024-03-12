import { Octicons } from "@expo/vector-icons";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";
interface SettingsListItemProps {
    title: string;
    onPress: () => void;
}

const SettingsListItem = ({ title, onPress }: SettingsListItemProps) => {
    return (
        <View
            w={"100%"}
            py="$18"
            borderBottomWidth={0.5}
            borderBottomColor="$border_primary"
            flexDirection="row"
            ai="center"
            animation={"medium"}
            pressStyle={{
                opacity: 0.85,
                scale: 0.985,
            }}
            onPress={onPress}
        >
            <Text fontFamily={"$heading"} fontSize={"$20"}>
                {title}
            </Text>
            <View ml="auto">
                <Octicons
                    name="chevron-right"
                    size={wn(26)}
                    color={colors.gold}
                />
            </View>
        </View>
    );
};

export default SettingsListItem;
