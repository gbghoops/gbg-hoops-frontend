import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";

import { MultiSelectProps } from "./types";

interface MultiSelectorProps {
    data: MultiSelectProps[];
    selectedOptions: number[];
    onOptionSelect: (day: number) => void;
}
const MultiSelector = ({
    data,
    onOptionSelect,
    selectedOptions,
}: MultiSelectorProps) => {
    return (
        <View
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="flex-start"
            width={"100%"}
        >
            {data.map(({ id, value, label }) => {
                const isSelected = selectedOptions.includes(id);
                return (
                    <OptionPill
                        id={id}
                        key={id}
                        value={value}
                        label={label}
                        isSelected={isSelected}
                        onPress={() => {
                            onOptionSelect(id);
                        }}
                    />
                );
            })}
        </View>
    );
};

interface OptionPillProps {
    id: number;
    value: string;
    label: string;
    onPress: () => void;
    isSelected?: boolean;
}

const OptionPill = ({
    label,
    onPress,
    isSelected = false,
    id,
}: OptionPillProps) => {
    return (
        <View
            pr={wn(9)}
            pb={wn(9)}
            enterStyle={{
                y: 10,
                opacity: 0,
            }}
            exitStyle={{
                y: -10,
                opacity: 0,
            }}
            animation={[
                "fast",
                {
                    opacity: {
                        delay: id * 30,
                    },
                    y: { delay: id * 30 },
                },
            ]}
        >
            <View
                onPress={onPress}
                padding="$12"
                minWidth="$70"
                borderRadius="$24"
                backgroundColor={isSelected ? "$gold" : "$transparent"}
                justifyContent="center"
                alignItems="center"
                animation={"medium"}
                borderWidth={1}
                borderColor={isSelected ? "$transparent" : "$gold"}
                pressStyle={{
                    scale: 0.95,
                    opacity: 0.85,
                }}
            >
                <Text
                    ff="$acuminProBold"
                    fontSize={wn(14)}
                    color={isSelected ? "$background" : "$light_secondary"}
                >
                    {label}
                </Text>
            </View>
        </View>
    );
};

export default MultiSelector;
