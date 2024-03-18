import { WorkoutPhases } from "@src/context/ProgramsContext/types";
import { colors } from "@src/styles/theme/colors";
import { Text, View } from "tamagui";

interface PhaseIndicatorProps {
    phase?: WorkoutPhases;
}
export default function PhaseIndicator({ phase }: PhaseIndicatorProps) {
    return phase ? (
        <View
            width="auto"
            backgroundColor={phaseIndicatorColorsMapping[phase]}
            ai="center"
            justifyContent="center"
            p={"$4"}
            pt={"$5"}
        >
            <Text
                fontFamily={"$acuminProBold"}
                textTransform="uppercase"
                color="$text_secondary"
                fontSize={"$12"}
            >
                {phase}
            </Text>
        </View>
    ) : null;
}

const phaseIndicatorColorsMapping: { [key in WorkoutPhases]: string } = {
    "3d_strength": colors["3d_strength_indicator"],
    athleticism: colors.athleticism_indicator,
    force: colors.force_indicator,
    recovery: colors.recovery_indicator,
    warmup: colors.warm_up_indicator,
};
