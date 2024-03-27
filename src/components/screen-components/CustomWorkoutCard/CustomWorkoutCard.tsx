import { Octicons } from "@expo/vector-icons";
import { CustomWorkout } from "@src/context/ProgramsContext/types";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

interface CustomWorkoutCardProps {
    workout: CustomWorkout;
}
export default function CustomWorkoutCard({ workout }: CustomWorkoutCardProps) {
    const exerciseCount = workout.summary.length;
    const workoutTitle = workout.name || "Custom Workout";
    const { push } = useRouter();

    const handlePress = () => {
        return push(`/custom-workouts/${workout.workout_id}`);
    };
    return (
        <View
            backgroundColor={"$surface_primary"}
            flexDirection="row"
            pressStyle={{
                opacity: 0.85,
                scale: 0.995,
            }}
            mb="$20"
            alignItems="center"
            p="$15"
            justifyContent="space-between"
            onPress={handlePress}
        >
            <View>
                <Text
                    fontSize={"$14"}
                    fontFamily={"$acuminProRegular"}
                    mt="$10"
                >
                    {exerciseCount} Exercises
                </Text>
                <Text
                    fontSize={"$20"}
                    fontFamily={"$acuminProBold"}
                    mt="$10"
                    numberOfLines={2}
                    textOverflow="ellipsis"
                    textTransform="uppercase"
                    borderWidth={1}
                    borderColor="red"
                >
                    {workoutTitle}
                </Text>
                <View
                    p="$6"
                    backgroundColor={"$accent_grey"}
                    width={"auto"}
                    alignSelf="flex-start"
                    jc={"center"}
                    ai={"center"}
                    borderRadius={"$6"}
                    mt="$10"
                >
                    <Text
                        fontSize={"$12"}
                        fontFamily={"$acuminProSemibold"}
                        color="$surface_background"
                    >
                        Custom Workout
                    </Text>
                </View>
            </View>
            <View ml="auto">
                <Octicons
                    name="arrow-right"
                    color={colors.gold}
                    size={wn(26)}
                />
            </View>
        </View>
    );
}
