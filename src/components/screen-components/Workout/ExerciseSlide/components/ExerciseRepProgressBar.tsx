import { useEffect, useState } from "react";
import { colors } from "@src/styles/theme/colors";
import {
    heightNormalized as hn,
    widthNormalized as wn,
} from "@src/utils/normalize-dimensions";
import { View as MView } from "moti";
import { Text, View } from "tamagui";

interface Props {
    reps: number;
    isPlaying: boolean;
    seconds_up: number;
    seconds_down: number;
    seconds_hold: number;
    isLandscape: boolean;
    onRepsCompleted?: () => void;
}
const RepProgress = ({
    reps,
    isPlaying,
    onRepsCompleted,
    isLandscape = false,
    seconds_up: _seconds_up,
    // seconds_down: _seconds_down,
    seconds_hold: _seconds_hold,
}: Props) => {
    const seconds_up = _seconds_up * 1000;
    // const seconds_down = _seconds_down * 1000;
    const seconds_hold = _seconds_hold * 1000;
    const [currentRep, setCurrentRep] = useState(reps);
    const [currentUpTime, setCurrentUpTime] = useState(0);
    const progressUp = Math.floor((currentUpTime / seconds_up) * 100);
    const [repsCompleted, setRepsCompleted] = useState(false);
    const [isHolding, setIsHolding] = useState(false);
    const [progressWidth, setProgressWidth] = useState(0);

    useEffect(() => {
        if (!isPlaying || repsCompleted) {
            return;
        }

        const timer = setInterval(() => {
            if (currentUpTime >= seconds_up) {
                return;
            }

            return setCurrentUpTime((time) =>
                time < seconds_up ? time + 100 : seconds_up,
            );
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, [isPlaying, currentRep]);

    useEffect(() => {
        if (currentUpTime === seconds_up) {
            setTimeout(() => {
                setIsHolding(true);
            }, 100);
        }
    }, [currentUpTime]);

    useEffect(() => {
        if (!isHolding || !isPlaying) {
            return;
        }

        const currentRepTimer: NodeJS.Timeout | null = null;
        const timer = setTimeout(() => {
            setIsHolding(false);
            setTimeout(() => {
                setCurrentUpTime(0);
                setCurrentRep((rep) => (rep > 0 ? rep - 1 : 0));
            }, 100);
        }, seconds_hold - 100);

        return () => {
            clearTimeout(timer);
            currentRepTimer && clearTimeout(currentRepTimer);
        };
    }, [isHolding]);

    useEffect(() => {
        if (currentRep <= 0) {
            setRepsCompleted(true);
            setCurrentUpTime(0);
        }
    }, [currentRep]);

    useEffect(() => {
        if (repsCompleted) {
            onRepsCompleted && onRepsCompleted();
        }
    }, [repsCompleted]);

    useEffect(() => {
        if (isPlaying) {
            return;
        }

        if (repsCompleted) {
            setRepsCompleted(false);
            setCurrentRep(reps);
            return;
        }
    }, [isPlaying]);

    const currentProgress = progressUp;
    const maxProgress = 100;

    return (
        <View
            width={"100%"}
            height={isLandscape ? hn(40) : "$60"}
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
                mt={"$2"}
            >
                {isHolding ? (
                    <View
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text fontFamily={"$heading"} fontSize={"$40"}>
                            HOLD!
                        </Text>
                    </View>
                ) : (
                    <View
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text fontFamily={"$heading"} fontSize={"$40"}>
                            {currentRep}
                        </Text>
                        <Text
                            fontFamily={"$heading"}
                            ml={wn(5)}
                            fontSize={"$20"}
                        >
                            reps remaining
                        </Text>
                    </View>
                )}
            </View>
            {
                <MView
                    onLayout={(evt) => {
                        const { width } = evt.nativeEvent.layout;
                        setProgressWidth(width);
                    }}
                    key={"stack-progress-bar"}
                    from={{
                        translateX: -progressWidth,
                    }}
                    animate={{
                        translateX:
                            -progressWidth +
                            (progressWidth * currentProgress) / maxProgress,
                    }}
                    transition={{
                        type: "spring",
                        mass: 1,
                        damping: 35,
                        stiffness: 186,
                    }}
                    style={{
                        backgroundColor: isHolding
                            ? colors.gold_hot
                            : colors.gold,
                        height: "100%",
                        width: "100%",
                    }}
                />
            }
        </View>
    );
};

export default RepProgress;
