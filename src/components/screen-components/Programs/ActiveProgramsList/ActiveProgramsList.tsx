import { useEffect } from "react";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { View } from "tamagui";

import ProgramProgressCard from "./ActiveProgramCard";

const ActiveProgramsList = () => {
    const { programs, refetchPrograms } = usePrograms();

    useEffect(() => {
        refetchPrograms && refetchPrograms();
    }, []);

    const programsWithProgress = programs.filter(
        (p) => !("is_locked" in p) && p.progress,
    );

    return programsWithProgress.length > 0 ? (
        <View>
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
