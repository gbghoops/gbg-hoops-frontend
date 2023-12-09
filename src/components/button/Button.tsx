import { ActivityIndicator, FlexAlignType } from "react-native";
import usePressInteractionStates from "@src/hooks/usePressInteractionStates";
import {
    heightNormalized as hn,
    widthNormalized as wn,
} from "@src/utils/normalize-dimensions";
import { MotiPressable } from "moti/interactions";
import { View } from "tamagui";

import { StyledButton, StyledText } from "./Button.styles";

type JustifyType =
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-evenly"
    | "space-around";

export interface ButtonProps {
    text: string;
    fullWidth?: boolean;
    fontSize?: number;
    loading?: boolean;
    secondary_white?: boolean;
    secondary_transparent?: boolean;
    onPress?: () => void;
    Icon?: () => React.ReactElement;
    iconPosition?: "left" | "right";
    justifyContent?: JustifyType;
    alignItems?: FlexAlignType;
    height?: number;
    isDisabled?: boolean;
}

// Moti Loading Animation
const loadingAnimation = (loading: boolean) =>
    loading && {
        opacity: 1,
        from: {
            opacity: 0.5,
        },
        animate: {
            opacity: 0.25,
        },
        transition: {
            loop: true,
            type: "spring" as const,
            mass: 20,
            damping: 10,
        },
    };

export default function Button(props: ButtonProps) {
    const {
        loading = false,
        text,
        fontSize,
        Icon,
        iconPosition = "left",
        justifyContent = "center",
        secondary_transparent = false,
        secondary_white = false,
        isDisabled = false,
        fullWidth = false,

        onPress,
    } = props;

    const { animateState, transitionStyle } = usePressInteractionStates({
        opacity: 0.85,
        scale: 0.9925,
        duration: 200,
    });

    // We are wrapping the button component with a MotiPressable component
    // So we can handle micro-interactions. The Tamagui View component isn't making
    // Changes based on `pressStyle` after upgrading past `1.65.0`.
    // This is a workaround for that issue.
    return (
        <MotiPressable
            transition={transitionStyle}
            animate={animateState}
            disabled={isDisabled || loading}
            onPress={onPress}
            style={{
                width: props.fullWidth ? "100%" : undefined,
            }}
            {...loadingAnimation(loading)}
        >
            <StyledButton
                isDisabled={isDisabled}
                justifyContent={justifyContent}
                minHeight={props.height ?? hn(54)}
                fullWidth={fullWidth}
                secondary_transparent={secondary_transparent}
                secondary_white={secondary_white}
                animation={"medium"}
            >
                {Icon && iconPosition === "left" ? <Icon /> : <EmptyView />}
                {!loading ? (
                    <StyledText
                        fontSize={fontSize ?? wn(20)}
                        secondary_transparent={secondary_transparent}
                    >
                        {text}
                    </StyledText>
                ) : (
                    <View
                        width={30}
                        height={30}
                        f={1}
                        jc={"center"}
                        ai={"center"}
                        p={0}
                    >
                        <ActivityIndicator size={"small"} />
                    </View>
                )}
                {Icon && iconPosition === "right" ? <Icon /> : <EmptyView />}
            </StyledButton>
        </MotiPressable>
    );
}

function EmptyView() {
    return <View width={12} height={12} />;
}
