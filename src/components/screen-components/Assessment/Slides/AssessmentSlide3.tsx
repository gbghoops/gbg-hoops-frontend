import { useMemo } from "react";
import { environmentSelectOptions } from "@src/components/multi-selector/constants/environment-select-data";
import MultiSelector from "@src/components/multi-selector/MultiSelector";
import { EnvironmentsType } from "@src/context/UserContext/types";
import { Text, View } from "tamagui";

interface AssesmentSlide3Props {
    isActiveSlide: boolean;
    selectedEnvironments: EnvironmentsType[];
    onValuesChange: (environments: EnvironmentsType[]) => void;
}

export default function AssesmentSlide3({
    isActiveSlide,
    selectedEnvironments,
    onValuesChange,
}: AssesmentSlide3Props) {
    const selectedEnvironmentIds = useMemo(() => {
        return selectedEnvironments
            .map((e) => environmentSelectOptions.find((o) => o.value === e)?.id)
            .filter((e) => !!e) as number[];
    }, [selectedEnvironments]);

    const onEnvironmentSelect = (id: number) => {
        const isSelected = selectedEnvironmentIds.includes(id);

        const newSelectedEnvironmentIds = isSelected
            ? selectedEnvironmentIds.filter((e) => e !== id)
            : [...selectedEnvironmentIds, id];

        const newSelectedEnvironments = newSelectedEnvironmentIds
            .map((e) => environmentSelectOptions.find((o) => o.id === e)?.value)
            .filter((e) => !!e) as EnvironmentsType[];

        return onValuesChange(newSelectedEnvironments);
    };

    return isActiveSlide ? (
        <View my="$20" mx="$20">
            <Text fontFamily="$heading" fontSize="$20" mb="$10">
                What Environments do you normally play in?
            </Text>
            <Text fontFamily="$heading" fontSize="$20" mb="$10">
                (Select all that apply)
            </Text>
            <View>
                <MultiSelector
                    data={environmentSelectOptions}
                    selectedOptions={selectedEnvironmentIds}
                    onOptionSelect={onEnvironmentSelect}
                />
            </View>
        </View>
    ) : null;
}
