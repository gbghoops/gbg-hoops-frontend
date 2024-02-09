import { StyledImage } from "@src/components/styled-components";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import getProgramDayInfo from "@src/context/ProgramsContext/utils/getProgramDayInfo";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

const WorkoutOfTheDayCard = () => {
    const { programs } = usePrograms();
    const { push } = useRouter();

    // TODO: Add proper logic to get the workout of the day.
    const workoutOfTheDayProgram = programs[programs.length - 1];

    if (!workoutOfTheDayProgram) return null;

    const getNewestProgramImage = () => {
        // Use first exercise image:
        const firstWeek = workoutOfTheDayProgram.weeks[0];
        const firstExercise = getProgramDayInfo({
            week: firstWeek,
            day: 1,
        })?.dayData?.exercises[0];

        return firstExercise?.activities[2].thumbnail;
    };

    const programImage = getNewestProgramImage();

    return (
        <View
            onPress={() => {
                push(
                    `/program/workout-details/${workoutOfTheDayProgram.slug}/1/1`,
                );
            }}
            animation="medium"
            pressStyle={{
                opacity: 0.85,
                scale: 0.995,
            }}
        >
            {/* Image */}
            <View width={"100%"} height="$200">
                <StyledImage
                    source={{ uri: `https:${programImage}` }}
                    resizeMode={"cover"}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>
            {/* Title */}
            <View jc={"space-between"} fd={"row"} ai={"center"} mt="$15">
                <Text fontFamily={"$heading"} fontSize="$20" color={"$gold"}>
                    {workoutOfTheDayProgram.name}
                </Text>
            </View>
        </View>
    );
};

export default WorkoutOfTheDayCard;
