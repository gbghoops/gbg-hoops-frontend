import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { View as MView } from "moti";
import { Text, View } from "tamagui";
interface ExerciseProgressBarProps {
    type: "time" | "stretch-n-hold" | "reps";
    duration: number;
    currentProgress: number;
}

const ExerciseProgressBar = ({
    duration,
    currentProgress,
}: ExerciseProgressBarProps) => {
    let minutes = Math.floor(currentProgress / 60);
    let extraSeconds = currentProgress % 60;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? 0 + extraSeconds : extraSeconds;

    return (
        <View
            width={"100%"}
            height={"$60"}
            backgroundColor={"$surface_primary"}
            overflow="hidden"
            position="relative"
        >
            <View
                position="absolute"
                top={0}
                left={0}
                width={"100%"}
                height={"100%"}
                zIndex={1}
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
            >
                <Text fontFamily={"$heading"} fontSize={"$40"}>
                    {minutes}:{extraSeconds}
                </Text>
                <Text fontFamily={"$heading"} ml={wn(5)} fontSize={"$20"}>
                    Seconds
                </Text>
            </View>
            <MView
                key={"stack-progress-bar"}
                animate={{
                    width: `${(currentProgress / duration) * 100}%`,
                }}
                transition={{
                    type: "spring",
                    mass: 2,
                    damping: 24,
                    stiffness: 186,
                }}
                style={{
                    backgroundColor: colors.gold,
                    height: "100%",
                }}
            />
        </View>
    );
};
export default ExerciseProgressBar;
