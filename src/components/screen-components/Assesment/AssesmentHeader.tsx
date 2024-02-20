import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { colors } from "@src/styles/theme/colors";
import { View } from "tamagui";

interface AssesmentHeaderProps {
    onBackPressed: () => void;
}
const AssesmentHeader = ({ onBackPressed }: AssesmentHeaderProps) => {
    const { top } = useSafeAreaInsets();
    return (
        <View mt={top} h="$60" mx="$20" ai="center" fd="row">
            <View
                width={"$40"}
                height={"$40"}
                backgroundColor={"$transparent"}
                justifyContent="center"
                alignItems="center"
                animation={"slow"}
                onPress={onBackPressed}
                pressStyle={{
                    opacity: 0.15,
                    scale: 0.95,
                }}
            >
                <Octicons name="arrow-left" size={36} color={colors.gold} />
            </View>
        </View>
    );
};

export default AssesmentHeader;
