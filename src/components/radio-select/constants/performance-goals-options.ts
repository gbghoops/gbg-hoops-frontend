import { PerformanceGoalType } from "@src/context/UserContext/types";

interface PerformanceGoalSelectOptionProps {
    id: number;
    label: string;
    performance_goal: PerformanceGoalType;
}

const PerformanceGoalSelectOptions: PerformanceGoalSelectOptionProps[] = [
    {
        id: 1,
        label: "To address my durability",
        performance_goal: "durability",
    },
    {
        id: 2,
        label: "To focus on my performance qualities",
        performance_goal: "performance",
    },
    {
        id: 3,
        label: "To be better prepared on the court",
        performance_goal: "preparation",
    },
    {
        id: 4,
        label: "To be a better mover",
        performance_goal: "mover",
    },
];

export default PerformanceGoalSelectOptions;
