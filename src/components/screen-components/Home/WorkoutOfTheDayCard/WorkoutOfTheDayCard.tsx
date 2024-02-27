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

    const isProgramLocked = "is_locked" in workoutOfTheDayProgram;

    const getNewestProgramImage = () => {
        // Use first exercise image:
        const firstWeek = !isProgramLocked
            ? workoutOfTheDayProgram.weeks[0]
            : null;

        const firstExercise = firstWeek
            ? getProgramDayInfo({
                  week: firstWeek,
                  day: 1,
              })?.dayData?.exercises[0]
            : null;

        return firstExercise?.activities[2].thumbnail;
    };

    const programImage = getNewestProgramImage();

    return !isProgramLocked ? (
        <View>
            {/* Heading */}
            <View fd={"row"} jc={"space-between"} ai={"center"} mt={"$30"}>
                <Text
                    ff={"$heading"}
                    fontSize={"$24"}
                    textTransform="uppercase"
                >
                    Workout of the day
                </Text>
            </View>
            <View
                mt={"$18"}
                onPress={() => {
                    push(
                        `/program/workout-details/${workoutOfTheDayProgram.slug}/1/1`,
                    );
                }}
                animation="medium"
                borderWidth={1}
                borderColor="red"
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
                    <Text
                        fontFamily={"$heading"}
                        fontSize="$20"
                        color={"$gold"}
                    >
                        {workoutOfTheDayProgram.name}
                    </Text>
                </View>
            </View>
        </View>
    ) : null;
};

export default WorkoutOfTheDayCard;
