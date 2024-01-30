import { useEffect, useState } from "react";
import { colors } from "@src/styles/theme/colors";
import { heightNormalized as hn } from "@src/utils/normalize-dimensions";
import { View as MView } from "moti";
import { Text, View } from "tamagui";

interface IMobilityProgressBarProps {
    seconds_release: number;
    seconds_hold: number;
    isPlaying: boolean;
    isLandscape: boolean;
    onTimerCompleted?: () => void;
}
const MobilityProgressBar = ({
    seconds_hold: _seconds_hold,
    seconds_release: _seconds_release,
    isPlaying,
    onTimerCompleted,
    isLandscape = false,
}: IMobilityProgressBarProps) => {
    const seconds_hold = _seconds_hold * 1000;
    const seconds_release = _seconds_release * 1000;

    const totalDuration = seconds_hold + seconds_release;

    const [currentTimerDuration, setCurrentTimerDuration] =
        useState(totalDuration);

    const [holdProgressWidth, setHoldProgressWidth] = useState(0);
    const [releaseProgressWidth, setReleaseProgressWidth] = useState(0);

    const [timerCompleted, setTimerCompleted] = useState(false);
    const [holdProgressTimerComplete, setHoldProgressTimerComplete] =
        useState(false);

    const [releaseProgressTimerComplete, setReleaseProgressTimerComplete] =
        useState(false);

    const [holdProgress, setHoldProgress] = useState(0);
    const [releaseProgress, setReleaseProgress] = useState(0);

    useEffect(() => {
        if (!isPlaying || timerCompleted) {
            return;
        }

        const timer = setInterval(() => {
            setCurrentTimerDuration((duration) => {
                if (duration <= 0) {
                    setTimerCompleted(true);
                }

                return duration <= 0 ? 0 : duration - 100;
            });
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, [isPlaying, timerCompleted]);

    // Hold Progress timer effect
    useEffect(() => {
        if (!isPlaying || holdProgressTimerComplete) {
            return;
        }

        const timer = setInterval(() => {
            setHoldProgress((progress) => {
                if (progress >= seconds_hold) {
                    setHoldProgressTimerComplete(true);
                    return seconds_hold;
                }
                return progress + 100;
            });
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, [isPlaying, holdProgressTimerComplete]);

    // Release Progress timer effect
    useEffect(() => {
        if (
            !isPlaying ||
            !holdProgressTimerComplete ||
            releaseProgressTimerComplete
        ) {
            return;
        }

        const timer = setInterval(() => {
            setReleaseProgress((progress) => {
                if (progress >= seconds_release) {
                    setReleaseProgressTimerComplete(true);
                    return seconds_release;
                }
                return progress + 100;
            });
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, [holdProgressTimerComplete, releaseProgressTimerComplete]);

    useEffect(() => {
        if (timerCompleted) {
            setCurrentTimerDuration(totalDuration);
            onTimerCompleted && onTimerCompleted();
            setTimerCompleted(false);
            setHoldProgress(0);
            setReleaseProgress(0);
            setHoldProgressTimerComplete(false);
            setReleaseProgressTimerComplete(false);
        }
    }, [timerCompleted]);

    useEffect(() => {
        if (!isPlaying) {
            return;
        }

        if (timerCompleted) {
            setTimerCompleted(false);
            setCurrentTimerDuration(totalDuration);
            setHoldProgress(0);
            setReleaseProgress(0);
            return;
        }
    }, [isPlaying]);

    const currentTimeDisplay = Math.floor(currentTimerDuration / 1000);

    const currentHoldProgress = (holdProgress / seconds_hold) * 100;

    const currentReleaseProgress = (releaseProgress / seconds_release) * 100;

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
            >
                <Text
                    fontFamily={"$heading"}
                    fontSize={"$40"}
                    display="flex"
                    mt={"$2"}
                >
                    {`${currentTimeDisplay} `}
                </Text>
                <Text
                    fontFamily={"$heading"}
                    fontSize={"$20"}
                    display="flex"
                    mt={"$2"}
                >{`second${currentTimeDisplay > 1 ? "s" : ""}`}</Text>
            </View>
            <View flexDirection="row" f={1}>
                <View f={1} overflow="hidden">
                    <MView
                        key={"hold-progress-bar"}
                        onLayout={(evt) => {
                            const { width } = evt.nativeEvent.layout;
                            setHoldProgressWidth(width);
                        }}
                        from={{
                            translateX: -holdProgressWidth,
                        }}
                        animate={{
                            translateX:
                                -holdProgressWidth +
                                (holdProgressWidth * currentHoldProgress) /
                                    maxProgress,
                        }}
                        transition={{
                            type: "spring",
                            mass: 1,
                            damping: 35,
                            stiffness: 186,
                        }}
                        style={{
                            backgroundColor: colors.gold,
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </View>
                <View f={1} overflow="hidden">
                    <MView
                        key={"release-progress-bar"}
                        onLayout={(evt) => {
                            const { width } = evt.nativeEvent.layout;
                            setReleaseProgressWidth(width);
                        }}
                        from={{
                            translateX: -releaseProgressWidth,
                        }}
                        animate={{
                            translateX:
                                -releaseProgressWidth +
                                (releaseProgressWidth *
                                    currentReleaseProgress) /
                                    maxProgress,
                        }}
                        transition={{
                            type: "spring",
                            mass: 1,
                            damping: 35,
                            stiffness: 186,
                        }}
                        style={{
                            backgroundColor: colors.gold_hot,
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default MobilityProgressBar;
