import { ResizeMode, Video } from "expo-av";
import { View } from "tamagui";

const BackgroundVideo = () => {
    return (
        <View
            pos="absolute"
            top={0}
            left={0}
            width={"100%"}
            height={"100%"}
            zIndex={0}
        >
            <View
                pos="absolute"
                height={"100%"}
                width={"100%"}
                zIndex={1}
                backgroundColor={"rgba(20, 20, 20, 0.75)"}
            />
            <Video
                shouldPlay
                isLooping
                resizeMode={ResizeMode.COVER}
                source={require("@assets/video/gbg-reel-landscape.mp4")}
                style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                }}
            />
        </View>
    );
};

export default BackgroundVideo;
