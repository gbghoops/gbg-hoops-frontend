import { useMemo } from "react";
import { painAreasSelectOptions } from "@src/components/multi-selector/constants/pain-areas-select-data";
import MultiSelector from "@src/components/multi-selector/MultiSelector";
import { PainAreasType } from "@src/context/UserContext/types";
import { Text, View } from "tamagui";

interface AssesmentSlide4Props {
    isActiveSlide: boolean;
    selectedPainAreas: PainAreasType[];
    onValuesChange: (painAreas: PainAreasType[]) => void;
}

export default function AssesmentSlide4({
    isActiveSlide,
    selectedPainAreas,
    onValuesChange,
}: AssesmentSlide4Props) {
    const selectedPainAreaIds = useMemo(() => {
        return selectedPainAreas
            .map((e) => painAreasSelectOptions.find((o) => o.value === e)?.id)
            .filter((e) => !!e) as number[];
    }, [selectedPainAreas]);

    const onPainAreaSelect = (id: number) => {
        const isSelected = selectedPainAreaIds.includes(id);

        const newSelectedPainAreaIds = isSelected
            ? selectedPainAreaIds.filter((e) => e !== id)
            : [...selectedPainAreaIds, id];

        const newSelectedPainAreas = newSelectedPainAreaIds
            .map((e) => painAreasSelectOptions.find((o) => o.id === e)?.value)
            .filter((e) => !!e) as PainAreasType[];

        return onValuesChange(newSelectedPainAreas);
    };

    return isActiveSlide ? (
        <View my="$20" mx="$20">
            <Text fontFamily="$heading" fontSize="$20" mb="$10">
                Any Pain in these areas? (Select all that apply)
            </Text>

            <View>
                <MultiSelector
                    data={painAreasSelectOptions}
                    selectedOptions={selectedPainAreaIds}
                    onOptionSelect={onPainAreaSelect}
                />
            </View>
        </View>
    ) : null;
}
