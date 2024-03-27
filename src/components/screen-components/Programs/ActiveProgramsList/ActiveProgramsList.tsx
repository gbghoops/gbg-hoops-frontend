import { useEffect } from "react";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import useCustomWorkouts from "@src/hooks/custom-workout/useCustomWorkouts";
import { View } from "tamagui";

import CustomWorkoutCard from "../../CustomWorkoutCard/CustomWorkoutCard";

import ProgramProgressCard from "./ActiveProgramCard";

const ActiveProgramsList = () => {
    const { programs, refetchPrograms } = usePrograms();
    const { customWorkouts, fetchCustomWorkouts } = useCustomWorkouts();

    useEffect(() => {
        refetchPrograms && refetchPrograms();
        fetchCustomWorkouts && fetchCustomWorkouts();
    }, []);

    const programsWithProgress = programs.filter(
        (p) => !("is_locked" in p) && p.progress,
    );

    return programsWithProgress.length > 0 ? (
        <View>
            {customWorkouts && customWorkouts.length > 0
                ? customWorkouts?.map((workout) => (
                      <CustomWorkoutCard
                          workout={workout}
                          key={workout.workout_id}
                      />
                  ))
                : null}
            {programsWithProgress.map((program) =>
                !("is_locked" in program) ? (
                    <ProgramProgressCard
                        key={program.contentful_id}
                        program={program}
                    />
                ) : null,
            )}
        </View>
    ) : null;
};

export default ActiveProgramsList;
