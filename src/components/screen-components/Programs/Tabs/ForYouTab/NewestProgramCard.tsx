import { ImageURISource } from "react-native";
import { StyledImage } from "@src/components/styled-components";
import { Text, View } from "tamagui";

interface NewestProgramCardProps {
    onPress: () => void;
    title: string;
    programImage: ImageURISource;
}
const NewestProgramCard = ({
    onPress,
    title,
    programImage,
}: NewestProgramCardProps) => {
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
                    source={programImage}
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
                    {title}
                </Text>
            </View>
        </View>
    );
};

export default NewestProgramCard;
