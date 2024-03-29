import { useEffect, useState } from "react";
import { colors } from "@src/styles/theme/colors";
import { heightNormalized as hn } from "@src/utils/normalize-dimensions";
import { View as MView } from "moti";
import { Text, View } from "tamagui";
interface ExerciseProgressBarProps {
    duration: number;
    isPlaying: boolean;
    isLandscape: boolean;
    onTimerCompleted?: () => void;
}

const ExerciseProgressBar = ({
    duration: _duration,
    isPlaying,
    onTimerCompleted,
    isLandscape = false,
}: ExerciseProgressBarProps) => {
    const [time, setTime] = useState<{ minutes: string; seconds: string }>({
        minutes: "00",
        seconds: "00",
    });

    const duration = _duration * 1000;

    const [timerCompleted, setTimerCompleted] = useState(false);

    const [currentExerciseDuration, setCurrentExerciseDuration] =
        useState(duration);

    const [progressWidth, setProgressWidth] = useState(0);

    useEffect(() => {
        if (!isPlaying || timerCompleted) {
            return;
        }

        const timer = setInterval(() => {
            setCurrentExerciseDuration((duration) =>
                duration <= 0 ? 0 : duration - 100,
            );
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, [isPlaying, timerCompleted]);

    useEffect(() => {
        if (!isPlaying) {
            return;
        }

        if (timerCompleted) {
            setTimerCompleted(false);
            setCurrentExerciseDuration(duration);
            return;
        }
        return;
    }, [isPlaying]);

    useEffect(() => {
        if (timerCompleted) {
            onTimerCompleted && onTimerCompleted();
        }
    }, [timerCompleted]);

    useEffect(() => {
        if (currentExerciseDuration <= 0) {
            setTimerCompleted(true);
        }

        let minutes = Math.floor((currentExerciseDuration / (1000 * 60)) % 60);
        let extraSeconds = (currentExerciseDuration / 1000) % 60;
        minutes = minutes < 10 ? 0 + minutes : minutes;
        extraSeconds = extraSeconds < 10 ? 0 + extraSeconds : extraSeconds;

        setTime({
            minutes: formatTimeUnit(Math.floor(minutes)),
            seconds: formatTimeUnit(Math.floor(extraSeconds)),
        });
    }, [currentExerciseDuration]);

    const currentProgress = (currentExerciseDuration / duration) * 100;
    const maxProgress = 100;

    return (
        <View
            width={"100%"}
            height={isLandscape ? hn(40) : "$60"}
            backgroundColor={"$surface_primary"}
            overflow="hidden"
            position="relative"
            collapsable={false}
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
                    {time.minutes}:{time.seconds}
                </Text>
                {/* <Text fontFamily={"$heading"} ml={wn(5)} fontSize={"$20"}>
                    Seconds
                </Text> */}
            </View>
            <MView
                key={"stack-progress-bar"}
                onLayout={(evt) => {
                    const { width } = evt.nativeEvent.layout;
                    setProgressWidth(width);
                }}
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
                    backgroundColor: colors.gold,
                    height: "100%",
                    width: "100%",
                }}
            />
        </View>
    );
};

const formatTimeUnit = (time: number) => {
    return time.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
};
export default ExerciseProgressBar;
