import { styled, YStack } from "tamagui";

export const AssesmentWrapper = styled(YStack, {
    zIndex: 1,
    x: 0,
    opacity: 1,
    fullscreen: true,
    borderWidth: 1,
    borderColor: "red",
    variants: {
        // 1 = right, 0 = nowhere, -1 = left
        going: {
            ":number": (going) => {
                return {
                    enterStyle: {
                        x: going > 0 ? 200 : -200,
                        opacity: 0,
                    },
                    exitStyle: {
                        zIndex: 0,
                        x: going < 0 ? 200 : -200,
                        opacity: 0,
                    },
                };
            },
        },
    } as const,
});
