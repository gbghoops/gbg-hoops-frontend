import { EquipmentData, ProgramDay } from "@src/context/ProgramsContext/types";

const getEquipmentFromExerciseData = (exercises: ProgramDay["exercises"]) => {
    // get unique equipments from dayData > daydata.exercises > activities > equipment

    const equipments = exercises
        .reduce((acc: EquipmentData[][], exercise) => {
            if (exercise && !("activities" in exercise)) return acc;

            const equipments = exercise.activities
                .map((activity) => activity.equipment)
                .filter((equipment) => equipment);
            return [...acc, ...equipments];
        }, [])
        .flat() as EquipmentData[];

    const uniqueEquipments = equipments.reduce(
        (acc: EquipmentData[], equipment) => {
            if (
                acc.find(
                    (accEquipment) =>
                        accEquipment.contentful_id === equipment.contentful_id,
                )
            ) {
                return acc;
            }
            return [...acc, equipment];
        },
        [],
    );

    return uniqueEquipments;
};

export default getEquipmentFromExerciseData;
