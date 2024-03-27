import { ActivityIndicator } from "react-native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { Exercise } from "@src/context/ProgramsContext/types";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

const ExerciseListItem = ({ exercise }: { exercise: Exercise }) => {
    const router = useRouter();
    return (
        <View
            fd="row"
            ai="center"
            py="$15"
            borderBottomWidth={0.25}
            borderBottomColor={"$border_primary"}
            animation={"fast"}
            pressStyle={{
                opacity: 0.75,
                scale: 0.995,
            }}
            onPress={() => {
                router.push(
                    `/exercise-details?exercise_id=${exercise.contentful_id}`,
                );
            }}
        >
            <View width={wn(100)} height={wn(100)}>
                <CachedImage
                    source={`http:${exercise.thumbnail}`}
                    loadingImageComponent={() => (
                        <ActivityIndicator size="small" color={colors.gold} />
                    )}
                    style={{ width: wn(100), height: wn(100) }}
                />
            </View>
            <Text
                fontFamily={"$heading"}
                color={"$gold"}
                fontSize={"$20"}
                numberOfLines={2}
                textOverflow="ellipsis"
                flexShrink={1}
                ml="$10"
            >
                {exercise.name}
            </Text>
        </View>
    );
};

export default ExerciseListItem;
