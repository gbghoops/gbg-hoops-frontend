import { ActivityIndicator, FlexAlignType } from "react-native";
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

    return (
        <StyledButton
            isDisabled={isDisabled || loading}
            justifyContent={justifyContent}
            minHeight={props.height ?? "$54"}
            fullWidth={fullWidth}
            secondary_transparent={secondary_transparent}
            secondary_white={secondary_white}
            onPress={onPress}
            animation={"medium"}
        >
            {Icon && iconPosition === "left" ? <Icon /> : <EmptyView />}
            {!loading ? (
                <StyledText
                    fontSize={fontSize ?? "$20"}
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
    );
}

function EmptyView() {
    return <View width={12} height={12} />;
}
