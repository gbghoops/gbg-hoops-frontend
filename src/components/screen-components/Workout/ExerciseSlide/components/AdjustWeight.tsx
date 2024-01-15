import { StyledImage, styles } from "@src/components/styled-components";
import { Text, View } from "tamagui";

interface AdjustWeightProps {
    currentWeight: number;
    weightUnit: "kg" | "lbs";
    onPress: () => void;
}
const AdjustWeight = ({
    onPress,
    weightUnit = "lbs",
    currentWeight = 5,
}: AdjustWeightProps) => {
    return (
        <View
            fd="row"
            px="$16"
            py="$8"
            jc="space-between"
            ai="center"
            animation={"fast"}
            flexDirection="row"
            pressStyle={{
                opacity: 0.95,
                scale: 0.98,
            }}
            onPress={onPress}
            backgroundColor={"$surface_primary"}
        >
            <View>
                <Text
                    fontFamily={"$heading"}
                    fontSize={"$20"}
                >{`${currentWeight} ${weightUnit}`}</Text>
            </View>
            <View width={"$24"} height={"$24"}>
                <StyledImage
                    source={require("@assets/icon/edit.png")}
                    style={styles.styledImage}
                />
            </View>
        </View>
    );
};

export default AdjustWeight;
