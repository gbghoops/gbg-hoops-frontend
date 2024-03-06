import { ActivityIndicator, Modal } from "react-native";
import { colors } from "@src/styles/theme/colors";
import { View } from "tamagui";

interface WorkoutCompleteLoadingProps {
    isVisible: boolean;
}
const WorkoutCompleteLoading = ({ isVisible }: WorkoutCompleteLoadingProps) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isVisible}
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
                position="absolute"
                bg="$transclucent_dark_80"
                key="rotate-device-screen"
                animation={"fast"}
                zIndex={200000}
            >
                <View alignItems="center" justifyContent="center" width={"70%"}>
                    <ActivityIndicator size="large" color={colors.gold} />
                </View>
            </View>
        </Modal>
    );
};

export default WorkoutCompleteLoading;
