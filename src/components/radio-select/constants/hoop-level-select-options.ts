import { HoopLevelType } from "@src/context/UserContext/types";

interface HoopLevelSelectOptionProps {
    id: number;
    label: string;
    hoop_level: HoopLevelType;
}

const HoopLevelSelectOptions: HoopLevelSelectOptionProps[] = [
    {
        id: 1,
        label: "Youth (9-13yrs)",
        hoop_level: "youth",
    },
    {
        id: 2,
        label: "High School (14-18yrs)",
        hoop_level: "high_school",
    },
    {
        id: 3,
        label: "College / Pro (19+)",
        hoop_level: "college",
    },
    {
        id: 4,
        label: "Pickup Legend (22+)",
        hoop_level: "pickup_legend",
    },
];

export default HoopLevelSelectOptions;
