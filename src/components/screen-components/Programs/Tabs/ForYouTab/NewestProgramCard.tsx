import { StyledImage } from "@src/components/styled-components";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import getProgramDayInfo from "@src/context/ProgramsContext/utils/getProgramDayInfo";
import { Text, View } from "tamagui";

interface NewestProgramCardProps {
    onPress: () => void;
}
const NewestProgramCard = ({ onPress }: NewestProgramCardProps) => {
    const { programs } = usePrograms();

    // TODO: Add proper logic to get Newest program
    const newestProgram = programs[programs.length - 1];

    if (!newestProgram) return null;

    const getNewestProgramImage = () => {
        // Use first exercise image:
        const firstWeek = newestProgram.weeks[0];
        const firstExercise = getProgramDayInfo({
            week: firstWeek,
            day: 1,
        })?.dayData?.exercises[0];

        return firstExercise?.activities[0].thumbnail;
    };

    const programImage = getNewestProgramImage();

    return (
        <View
            onPress={onPress}
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
                    {newestProgram.name}
                </Text>
            </View>
        </View>
    );
};

export default NewestProgramCard;
