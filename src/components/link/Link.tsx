import { PropsWithChildren } from "react";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text } from "tamagui";
interface LinkProps extends PropsWithChildren {
    onPress: () => void;
    fontSize?: number;
    color?: string;
    textAlignment?: "left" | "center" | "right";
}

export default function Link({
    onPress,
    fontSize,
    children,
    color,
    textAlignment,
}: LinkProps) {
    return (
        <Text
            fontSize={fontSize ?? wn(16)}
            color={color ?? "$gold"}
            fontFamily={"$body"}
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
