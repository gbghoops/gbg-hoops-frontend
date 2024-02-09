import { createAnimations } from "@tamagui/animations-react-native";
import { createFont, createTamagui, createTokens } from "@tamagui/core";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";

import { colors } from "@/src/styles/theme/colors";
import { defaultSpacing, sizes } from "@/src/styles/theme/sizes";

const tokens = createTokens({
    color: colors,
    size: { ...sizes.default },
    space: { ...sizes.default },
    radius: sizes.default,
    zIndex: {
        0: 0,
        1: 1,
        10: 10,
        100: 100,
        99999: 99999,
        true: 1,
    },
});

const darkTheme = {
    background: tokens.color.surface_primary,
    color: tokens.color.surface_secondary,
};

const animations = createAnimations({
    fast: {
        type: "spring",
        damping: 20,
        mass: 1.2,
        stiffness: 250,
    },
    medium: {
        type: "spring",
        damping: 10,
        mass: 0.9,
        stiffness: 100,
    },
    slow: {
        type: "spring",
        damping: 20,
        stiffness: 60,
    },
    slider: {
        type: "spring",
        mass: 1,
        damping: 60,
        stiffness: 255,
    },
    "100ms": {
        type: "timing",
        duration: 100,
    },
});

const appConfig = createTamagui({
    themes: {
        dark: darkTheme,
    },
    tokens,
    shorthands,
    animations,
    defaultTheme: "dark",
    fonts: {
        heading: createFont({
            family: "acumin_pro_bold",
            size: sizes.headings,
        }),
        body: createFont({
            family: "acumin_pro_regular",
            size: sizes.p,
            lineHeight: {
                small: 8,
                medium: 12,
                large: 16,
                true: 12,
            },
            color: tokens.color,
        }),
        acuminProBold: createFont({
            family: "acumin_pro_bold",
            size: sizes.p,
            lineHeight: {
                small: 8,
                medium: 12,
                large: 16,
                true: 12,
            },
            color: tokens.color,
        }),
        acuminProSemibold: createFont({
            family: "acumin_pro_semibold",
            size: sizes.p,
            lineHeight: {
                small: 8,
                medium: 12,
                large: 16,
                true: 12,
            },
            color: tokens.color,
        }),
        acuminProRegular: createFont({
            family: "acumin_pro_regular",
            size: sizes.p,
            lineHeight: {
                small: 8,
                medium: 12,
                large: 16,
                true: 12,
            },
            color: tokens.color,
        }),
    },

    media: createMedia({
        xs: { maxWidth: 660 },
        sm: { maxWidth: 800 },
        md: { maxWidth: 1020 },
        lg: { maxWidth: 1280 },
        xl: { maxWidth: 1420 },
        xxl: { maxWidth: 1600 },
        gtXs: { minWidth: 660 + 1 },
        gtSm: { minWidth: 800 + 1 },
        gtMd: { minWidth: 1020 + 1 },
        gtLg: { minWidth: 1280 + 1 },
        short: { maxHeight: 820 },
        tall: { minHeight: 820 },
        hoverNone: { hover: "none" },
        pointerCoarse: { pointer: "coarse" },
    }),
});

export type AppConfig = typeof appConfig;

declare module "tamagui" {
    interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
