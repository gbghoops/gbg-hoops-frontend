import { ImageURISource } from "react-native";
import { StyledImage } from "@src/components/styled-components";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";

interface WorkoutOfTheDayCardProps {
    onPress: () => void;
    title: string;
    programDuration: string;
    programImage: ImageURISource;
}
const WorkoutOfTheDayCard = ({
    onPress,
    title,
    programDuration,
    programImage,
}: WorkoutOfTheDayCardProps) => {
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
            <View width={"100%"} height={wn(200)}>
                <StyledImage
                    source={programImage}
                    resizeMode={"cover"}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>
            {/* Title */}
            <View jc={"space-between"} fd={"row"} ai={"center"} mt={wn(15)}>
                <Text fontFamily={"$heading"} fontSize={wn(20)} color={"$gold"}>
                    {title}
                </Text>
                <Text fontFamily={"$heading"} fontSize={wn(20)}>
                    {programDuration}
                </Text>
            </View>
        </View>
    );
};

export default WorkoutOfTheDayCard;
