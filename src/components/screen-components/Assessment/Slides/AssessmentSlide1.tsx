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
    const getSelectedGenderId = (selectedGender: GenderType | null) => {
        if (selectedGender) {
            const selectedGenderOption = GenderSelectOptions.find(
                (g) => g.gender === selectedGender,
            );

            if (selectedGenderOption) {
                return selectedGenderOption.id;
            }
        }

        return 0;
    };

    const selectedGenderId = getSelectedGenderId(selectedGender);

    return isActiveSlide ? (
        <View mt="$20" mx="$20">
            <Text fontFamily={"$heading"} fontSize="$24" mb="$10">
                Gender
            </Text>
            <RadioSelect
                options={GenderSelectOptions}
                selectedOption={selectedGenderId}
                onSelectedOption={(id) => {
                    onValuesChange(id);
                }}
            />
        </View>
    ) : null;
}
