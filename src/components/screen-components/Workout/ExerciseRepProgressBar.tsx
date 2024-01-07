import { useState } from "react";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { View as MView } from "moti";
import { Text, View } from "tamagui";

interface Props {
    reps: number;
    onRepsCompleted?: () => void;
}
const RepProgress = ({ reps, onRepsCompleted }: Props) => {
    const [currentRep, setCurrentRep] = useState(reps);
    const progress = Math.floor((currentRep / reps) * 100);

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
                    {currentRep}
                </Text>
                <Text fontFamily={"$heading"} ml={wn(5)} fontSize={"$20"}>
                    reps remaining
                </Text>
            </View>
            <MView
                key={"stack-progress-bar"}
                from={{
                    width: "0%",
                }}
                animate={{
                    width: `${progress}%`,
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
                    width: "100%",
                }}
            />
        </View>
    );
};

export default RepProgress;
