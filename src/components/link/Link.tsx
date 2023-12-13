import { PropsWithChildren } from "react";
import { Text } from "tamagui";
interface LinkProps extends PropsWithChildren {
    onPress: () => void;
    fontSize?: number;
    color?: string;
    bold?: boolean;
    textAlignment?: "left" | "center" | "right";
}

export default function Link({
    onPress,
    fontSize,
    children,
    color,
    bold,
    textAlignment,
}: LinkProps) {
    return (
        <Text
            fontSize={fontSize ?? "$16"}
            color={color ?? "$gold"}
            fontFamily={bold ? "$heading" : "$body"}
            onPress={onPress}
            textAlign={textAlignment ?? "left"}
            textDecorationLine="underline"
            pressStyle={{
                opacity: 0.5,
            }}
        >
            {children}
        </Text>
    );
}
