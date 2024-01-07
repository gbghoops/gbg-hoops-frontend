import { Modal } from "react-native";
import { StyledImage } from "@src/components/styled-components";
import { Text, View } from "tamagui";

interface RotateDeviceModalProps {
    isVisible: boolean;
}
const RotateDeviceModal = ({ isVisible }: RotateDeviceModalProps) => {
    return (
        <Modal transparent={true} animationType="fade" visible={isVisible}>
            <View
                f={1}
                left={0}
                jc="center"
                ai="center"
                width={"100%"}
                height={"100%"}
                position="absolute"
                bg="$transclucent_dark_80"
                key="rotate-device-screen"
                animation={"fast"}
            >
                <View alignItems="center" justifyContent="center" width={"70%"}>
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$20"}
                        textAlign="center"
                    >
                        Turn your phone to landscape for the optimal experience
                    </Text>
                    <View width={"$60"} height={"$60"} mt={"$20"}>
                        <StyledImage
                            source={require("@assets/icon/rotate-device.gif")}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default RotateDeviceModal;
