import { Octicons } from "@expo/vector-icons";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { View } from "tamagui";

interface ExerciseHeaderButtonProps {
    onPress: () => void;
    iconName: string;
}

const exerciseInfoIconSize = wn(20);

const ExerciseHeaderButton = ({
    onPress,
    iconName,
}: ExerciseHeaderButtonProps) => {
    return (
        <View
            w="$40"
            h="$40"
            bw={1}
            ml="$10"
            jc="center"
            ai="center"
            borderColor="$gold"
            onPress={onPress}
        >
            <Octicons
                name={iconName as any}
                color={colors.gold}
                size={exerciseInfoIconSize}
            />
        </View>
    );
};

export default ExerciseHeaderButton;
