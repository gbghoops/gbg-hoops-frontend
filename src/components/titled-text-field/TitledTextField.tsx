import { useEffect, useState } from "react";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Input, Text, View, XStack, YStack } from "tamagui";
import { styled } from "tamagui";

import { StyledImage } from "../styled-components";

export enum FieldType {
    EMAIL = "EMAIL",
    PASSWORD = "PASSWORD",
    TEXT = "TEXT",
    NUMERIC = "NUMERIC",
}

interface TitledTextFieldProps {
    title: string;
    isPassword?: boolean;
    showHidePassword?: boolean;
    isEmail?: boolean;
    placeholder?: string;
    delayIndex?: number;
    type: FieldType;
    value?: string;
    errorMessage?: string;
    handleChange?: (value: string) => void;
    handleFocus?: () => void;
    handleBlur?: () => void;
}

export const TitledTextField = ({
    title,
    placeholder,

    type,
    value: initialValue,
    handleChange,
    handleBlur,
    handleFocus,
    errorMessage = "",
}: TitledTextFieldProps) => {
    const [value, setValue] = useState(initialValue ?? "");

    useEffect(() => {
        handleChange && handleChange(value);
    }, [value]);

    useEffect(() => {
        setValue(initialValue ?? "");
    }, [initialValue]);

    const resolveKeyboardType = (fieldType: FieldType) => {
        switch (fieldType) {
            case FieldType.EMAIL:
                return "email-address";
            case FieldType.NUMERIC:
                return "numeric";
            case FieldType.PASSWORD:
                return "default";
            case FieldType.TEXT:
                return "default";
            default:
                return "default";
        }
    };

    return (
        <View>
            <StyledInputContainer
                animation={"medium"}
                height={wn(60)}
                errored={errorMessage.length > 0}
            >
                <XStack justifyContent="space-between" alignItems="center">
                    <Text
                        fontFamily={"$body"}
                        fontSize={wn(13)}
                        mt={wn(10)}
                        ml={wn(10)}
                        color={"$white"}
                    >
                        {title}
                    </Text>
                </XStack>
                <StyledInput
                    secureTextEntry={type === FieldType.PASSWORD}
                    autoCapitalize={
                        type === FieldType.EMAIL ? "none" : "sentences"
                    }
                    placeholder={placeholder}
                    keyboardType={resolveKeyboardType(type)}
                    value={value}
                    onChangeText={(value) => {
                        // First Handle Numeric values...
                        if (type === FieldType.NUMERIC) {
                            if (
                                /^\d+$/.test(value.toString()) ||
                                value === ""
                            ) {
                                return setValue(value);
                            }
                            return;
                        }

                        setValue(value);
                    }}
                    onFocus={() => {
                        handleFocus && handleFocus();
                    }}
                    onBlur={() => {
                        handleBlur && handleBlur();
                    }}
                />
                {/* Error Icon  */}
                <View
                    w={wn(30)}
                    h={wn(30)}
                    justifyContent="center"
                    alignItems="center"
                    marginLeft={"auto"}
                    position="absolute"
                    right={wn(10)}
                    top={wn(12.5)}
                >
                    {errorMessage.length > 0 ? (
                        <StyledImage
                            source={require("@assets/icon/error.png")}
                            w={wn(20)}
                            h={wn(20)}
                        />
                    ) : null}
                </View>
            </StyledInputContainer>
            {/* Error Message container */}
            <View mt={wn(5)}>
                {errorMessage ? (
                    <Text
                        fontFamily={"$body"}
                        color={"$error_primary"}
                        fontSize={wn(14)}
                    >
                        {errorMessage}
                    </Text>
                ) : null}
            </View>
        </View>
    );
};

const StyledInputContainer = styled(YStack, {
    borderWidth: 1,
    borderColor: "$surface_brand",
    backgroundColor: "$transparent",
    borderRadius: 0,
    position: "relative",
    zIndex: 1,
    overflow: "hidden",
    variants: {
        errored: {
            true: {
                borderColor: colors.error_primary,
            },
            false: {
                borderColor: colors.surface_brand,
            },
        },
    },
});

const StyledInput = styled(Input, {
    borderRadius: 0,
    position: "absolute",
    zIndex: 0,
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "$transparent",
    borderColor: "$transparent",
    paddingTop: wn(18),
    paddingLeft: wn(8),
    width: "88%",
    height: "100%",
    fontSize: wn(16),
    placeholderTextColor: "rgba(179, 185, 196, 0.5)",
    focusStyle: {
        borderColor: `$transparent`,
    },
});
