import { GenderType } from "@src/context/UserContext/types";

interface GenderSelectOptionProps {
    id: number;
    label: string;
    gender: GenderType;
}

const GenderSelectOptions: GenderSelectOptionProps[] = [
    {
        id: 1,
        label: "Male",
        gender: "male",
    },
    {
        id: 2,
        label: "Female",
        gender: "female",
    },
    {
        id: 3,
        label: "Not Specified",
        gender: "not_specified",
    },
];

export default GenderSelectOptions;
