import React from "react";
import { Octicons } from "@expo/vector-icons";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Stack, Text, View, XStack } from "tamagui";

import { Radio } from "./RadioSelect.styles";

interface BaseRadioSelectOptionProps {
    id: number;
    label: string;
}
interface RadioOptionProps {
    index: number;
    label: string;
    selected: boolean;
    onSelected: (selected: boolean) => void;
}

interface RadioSelectProps<T extends BaseRadioSelectOptionProps> {
    options: T[];
    selectedOption: number;
    onSelectedOption: (id: number) => void;
}

const RadioSelect = <T extends BaseRadioSelectOptionProps>({
    options,
    selectedOption,
    onSelectedOption,
}: RadioSelectProps<T>) => {
    return (
        <Stack
            width={"100%"}
            animation={"slow"}
            enterStyle={{
                y: 10,
                opacity: 0,
            }}
        >
            {options.map((option, index) => (
                <RadioOption
                    key={`option-${index}`}
                    index={index + 1}
                    label={option.label}
                    selected={selectedOption === option.id}
                    onSelected={(selected) => {
                        selected ? onSelectedOption(option.id) : null;
                    }}
                />
            ))}
        </Stack>
    );
};

const RadioOption = ({
    label,
    index: id,
    selected,
    onSelected,
}: RadioOptionProps) => {
    return (
        <XStack
            justifyContent="space-between"
            alignItems="center"
            py={"$12"}
            onPress={() => onSelected(true)}
            enterStyle={{
                y: 10,
                opacity: 0,
            }}
            exitStyle={{
                y: -10,
                opacity: 0,
            }}
            animation={[
                "slow",
                {
                    opacity: {
                        delay: id * 50,
                    },
                    y: { delay: id * 50 },
                },
            ]}
            borderRadius={wn(10)}
            backgroundColor={"$transparent"}
            pressStyle={{
                opacity: 0.85,
                scale: 0.98,
                backgroundColor: "rgba(255,255,255,0.05)",
            }}
        >
            <XStack ai="center">
                <View mr="$5">
                    <Radio isSelected={selected}>
                        {selected ? (
                            <Octicons name="check" size={15} color="black" />
                        ) : null}
                    </Radio>
                </View>
                <Text fontFamily={"$acuminProBold"} fontSize="$14">
                    {label}
                </Text>
            </XStack>
        </XStack>
    );
};

export default RadioSelect;
