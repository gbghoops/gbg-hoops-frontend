export type PerformanceGoalType =
    | "durability"
    | "performance"
    | "preparation"
    | "mover";

export type GenderType = "male" | "female" | "not_specified";

export type HoopLevelType =
    | "youth"
    | "high_school"
    | "pickup_legend"
    | "college";

export type EnvironmentsType =
    | "court"
    | "weight_room"
    | "outside_field"
    | "outside_park"
    | "home"
    | "pool"
    | "hill";

export type PainAreasType =
    | "ankle"
    | "knee"
    | "hip"
    | "lower_back"
    | "neck"
    | "shoulder";

export interface User {
    performance_goal: PerformanceGoalType;
    given_name: string;
    environments: EnvironmentsType[];
    family_name: string;
    email: string;
    gender: GenderType;
    email_verified: boolean;
    hoop_level: HoopLevelType;
    birthdate: string;
    pain_areas: PainAreasType[];
    isPrivilegedUser?: boolean;
    id: string;
}
