import { styled, Text, View } from "tamagui";

export const StyledButton = styled(View, {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "$gold",
    padding: 16,
    flex: 0,
    height: 48,
    alignSelf: "flex-start",
    flexDirection: "row",
    zIndex: 1,
    scale: 1,
    opacity: 1,
    variants: {
        fullWidth: {
            true: {
                width: "100%",
            },
        },
        loading: {
            true: {
                opacity: 0.5,
                disabled: true,
            },
        },
        secondary_white: {
            true: {
                backgroundColor: "$white",
            },
        },
        secondary_transparent: {
            true: {
                backgroundColor: "$surface_primary",
                borderWidth: 1,
                borderColor: "$gold",
                pressStyle: {
                    backgroundColor: "$transparent",
                    opacity: 0.5,
                },
            },
        },
        isDisabled: {
            true: {
                opacity: 0.5,
                disabled: true,
            },
        },
    },
    pressStyle: {
        backgroundColor: "#98781B",
    },
});

export const StyledText = styled(Text, {
    color: "$surface_primary",
    fontFamily: "$heading",
    fontSize: 20,
    textTransform: "uppercase",
    variants: {
        secondary_transparent: {
            true: {
                color: "$white",
            },
        },
    },
});
