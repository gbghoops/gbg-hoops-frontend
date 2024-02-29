import { StyledImage, styles } from "@src/components/styled-components";
import { Text, View } from "tamagui";

interface InstructionVideoButtonProps {
    onPress: () => void;
}
const InstructionVideoButton = ({ onPress }: InstructionVideoButtonProps) => {
    return (
        <View
            fd="row"
            borderWidth={1}
            borderColor="$gold"
            p={"$10"}
            jc="center"
            ai={"center"}
            animation={"fast"}
            onPress={onPress}
            pressStyle={{
                opacity: 0.95,
                scale: 0.98,
            }}
            f={1}
        >
            <View width={"$24"} height={"$24"}>
                <StyledImage
                    source={require("@assets/icon/whistle.png")}
                    style={styles.styledImage}
                />
            </View>
            <Text
                textTransform="uppercase"
                fontFamily={"$heading"}
                fontSize={"$16"}
                ml="$10"
            >
                See Instructional Video
            </Text>
        </View>
    );
};

export default InstructionVideoButton;
