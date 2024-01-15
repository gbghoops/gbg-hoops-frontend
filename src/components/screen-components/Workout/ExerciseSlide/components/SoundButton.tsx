import { StyledImage, styles } from "@src/components/styled-components";
import { View } from "tamagui";
interface SoundButtonProps {
    isMuted?: boolean;
    onMuteStateChange?: (isMuted: boolean) => void;
}
const SoundButton = ({ isMuted, onMuteStateChange }: SoundButtonProps) => {
    return (
        <View
            borderWidth={1}
            borderColor="$gold"
            jc="center"
            ai={"center"}
            p={"$10"}
            animation={"fast"}
            pressStyle={{
                opacity: 0.95,
                scale: 0.98,
            }}
            onPress={() => {
                onMuteStateChange && onMuteStateChange(!isMuted);
            }}
        >
            <View width={"$24"} height={"$24"}>
                {isMuted ? (
                    <StyledImage
                        source={require("@assets/icon/sound-off.png")}
                        style={styles.styledImage}
                    />
                ) : (
                    <StyledImage
                        source={require("@assets/icon/sound.png")}
                        style={styles.styledImage}
                    />
                )}
            </View>
        </View>
    );
};

export default SoundButton;
