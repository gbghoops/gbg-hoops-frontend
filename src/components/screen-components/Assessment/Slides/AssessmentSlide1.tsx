import { useEffect, useState } from "react";
import GenderSelectOptions from "@src/components/radio-select/constants/gender-select-options";
import RadioSelect from "@src/components/radio-select/RadioSelect";
import { GenderType } from "@src/context/UserContext/types";
import { Text, View } from "tamagui";

interface AssesmentSlide1Props {
    isActiveSlide: boolean;
    selectedGender: GenderType | null;
    onValuesChange: (genderId: number) => void;
}
export default function AssesmentSlide1({
    isActiveSlide,
    selectedGender,
    onValuesChange,
}: AssesmentSlide1Props) {
    const [selectedGenderId, setSelectedGenderId] = useState<number>(0);

    useEffect(() => {
        if (selectedGender) {
            const selectedGenderOption = GenderSelectOptions.find(
                (g) => g.gender === selectedGender,
            );

            if (selectedGenderOption) {
                setSelectedGenderId(selectedGenderOption.id);
            }
        }
    }, [selectedGender]);

    useEffect(() => {
        if (selectedGenderId) {
            onValuesChange(selectedGenderId);
        }
    }, [selectedGenderId]);
    return isActiveSlide ? (
        <View mt="$20" mx="$20">
            <Text fontFamily={"$heading"} fontSize="$24" mb="$10">
                Gender
            </Text>
            <RadioSelect
                options={GenderSelectOptions}
                selectedOption={selectedGenderId}
                onSelectedOption={(id) => {
                    setSelectedGenderId(id);
                }}
            />
        </View>
    ) : null;
}
