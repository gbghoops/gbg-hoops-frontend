import { Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { AVPlaybackSource, ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import { View } from "tamagui";

interface FullscreenVideoModalProps {
    open: boolean;
    onClose: () => void;
    videoSource: AVPlaybackSource;
}
const FullscreenVideoModal = ({
    open,
    onClose,
    videoSource,
}: FullscreenVideoModalProps) => {
    const { top, bottom } = useSafeAreaInsets();
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={open}
            supportedOrientations={[
                "portrait",
                "landscape-left",
                "landscape-right",
            ]}
        >
            <View
                pt={top + wn(30)}
                pb={bottom + wn(30)}
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
                {/* Header */}
                <View
                    fd="row"
                    jc="flex-end"
                    ai="flex-end"
                    w="100%"
                    px={"$5"}
                    py={"$10"}
                >
                    <View w="$32" h="$30">
                        <Octicons
                            name="x"
                            color={colors.gold}
                            size={32}
                            onPress={onClose}
                        />
                    </View>
                </View>
                {/* Video */}
                <View f={1} width={"100%"} borderWidth={1} borderColor="red">
                    <VideoPlayer
                        videoProps={{
                            shouldPlay: true,
                            resizeMode: ResizeMode.CONTAIN,
                            // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
                            source: videoSource,
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default FullscreenVideoModal;
