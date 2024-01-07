import { useMemo } from "react";
import { AnimateStates } from "@src/types/moti";

interface PressInteractionStatesProps {
    opacity?: number;
    scale?: number;
    duration?: number;
    delay?: number;
}
export default function usePressInteractionStates({
    opacity,
    scale,
    duration,
    delay,
}: PressInteractionStatesProps = {}) {
    const animateState = useMemo(
        () =>
            ({ pressed }: AnimateStates) => {
                "worklet";

                return {
                    opacity: pressed ? opacity ?? 0.5 : 1,
                    scale: pressed ? scale ?? 0.985 : 1,
                };
            },
        [],
    );

    const transitionStyle = {
        type: "timing" as const,
        duration: duration ?? 100,
        delay: delay ?? 25,
    };

    return {
        animateState,
        transitionStyle,
    };
}
