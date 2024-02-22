import { PainAreasType } from "@src/context/UserContext/types";

import { MultiSelectProps } from "../types";

export interface PainAreasSelectProps extends Omit<MultiSelectProps, "value"> {
    value: PainAreasType;
}

export const painAreasSelectOptions: PainAreasSelectProps[] = [
    { id: 1, label: "Knee", value: "knee" },
    { id: 2, label: "Ankle", value: "ankle" },
    { id: 3, label: "Hip", value: "hip" },
    { id: 4, label: "Lower Back", value: "lower_back" },
    { id: 5, label: "Neck", value: "neck" },
    { id: 6, label: "Shoulder", value: "shoulder" },
];
