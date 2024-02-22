import { EnvironmentsType } from "@src/context/UserContext/types";

import { MultiSelectProps } from "../types";

export interface EnvironmentSelectProps
    extends Omit<MultiSelectProps, "value"> {
    value: EnvironmentsType;
}

export const environmentSelectOptions: EnvironmentSelectProps[] = [
    { id: 1, label: "Court", value: "court" },
    { id: 2, label: "Weight Room", value: "weight_room" },
    { id: 3, label: "Outside Field", value: "outside_field" },
    { id: 4, label: "Outside Park", value: "outside_park" },
    { id: 5, label: "Home", value: "home" },
    { id: 6, label: "Pool", value: "pool" },
    { id: 7, label: "Hill", value: "hill" },
];
