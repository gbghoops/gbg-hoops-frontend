import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { styled, View } from "tamagui";

export const Radio = styled(View, {
    width: wn(24),
    height: wn(24),
    borderCurve: "circular",
    borderRadius: wn(16),
    borderWidth: wn(2),
    borderColor: "$gold",
    backgroundColor: "$transparent",
    justifyContent: "center",
    alignItems: "center",
    animation: "fast",
    variants: {
        isSelected: {
            true: {
                backgroundColor: "$gold",
                borderColor: "$gold",
            },
        },
    },
});
