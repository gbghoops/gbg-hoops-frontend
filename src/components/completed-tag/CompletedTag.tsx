import { Octicons } from "@expo/vector-icons";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";

const CompletedTag = () => {
    return (
        <View
            backgroundColor="$surface_accent"
            py="$2"
            px="$5"
            mb="$5"
            br="$6"
            fd="row"
            ai="center"
        >
            <View mr={wn(5)}>
                <Octicons
                    name="check-circle"
                    size={12}
                    color={colors.text_secondary}
                />
            </View>
            <Text
                fontFamily={"$acuminProSemibold"}
                color="$text_secondary"
                textTransform="uppercase"
                mt={wn(2)}
            >
                Completed
            </Text>
        </View>
    );
};

export default CompletedTag;
