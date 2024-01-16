import { useEffect, useRef, useState } from "react";
import { Dimensions, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { colors } from "@src/styles/theme/colors";
import {
    heightNormalized as hn,
    widthNormalized as wn,
} from "@src/utils/normalize-dimensions";
import { AVPlaybackSource, ResizeMode, Video } from "expo-av";
import { View } from "tamagui";

interface FullscreenVideoModalProps {
    open: boolean;
    onClose: () => void;
    isLandScape: boolean;
    videoSource: AVPlaybackSource;
}
const FullscreenVideoModal = ({
    open,
    onClose,
    videoSource,
    isLandScape = false,
}: FullscreenVideoModalProps) => {
    const { left, right } = useSafeAreaInsets();
    const { width, height } = Dimensions.get("window");
    const [videoLoaded, setVideoLoaded] = useState(false);
    const VideoRef = useRef<Video>(null);

    useEffect(() => {
        if (open && videoLoaded) {
            VideoRef.current?.presentFullscreenPlayer();
        }
    }, [open, videoLoaded]);

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
                f={1}
                left={0}
                jc="center"
                ai="center"
                width={"100%"}
                height={"100%"}
                bg="rgba(0,0,0,1)"
                animation={"fast"}
                position="relative"
            >
                {/* Header */}
                <View
                    fd="row"
                    jc="flex-end"
                    ai="flex-end"
                    w="100%"
                    px={isLandScape ? (right > left ? right : left) : "$5"}
                    py={isLandScape ? "$10" : "$50"}
                    top={isLandScape ? wn(10) : wn(30)}
                    position="absolute"
                    zIndex={20}
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
                <View f={1} jc="center" width={"100%"}>
                    {/* Video Container */}
                    <View jc="center" ai={"center"}>
                        <Video
                            ref={VideoRef}
                            source={videoSource}
                            useNativeControls
                            onLoad={() => {
                                setVideoLoaded(true);
                            }}
                            onFullscreenUpdate={() => {}}
                            style={{
                                height: height,
                                width: width,
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default FullscreenVideoModal;
