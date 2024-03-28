import { useLocalSearchParams } from "expo-router";
import { Text, View } from "tamagui";

export default function CustomWorkout() {
    const { custom_workout_id } = useLocalSearchParams();

    return (
        <View>
            <Text>CustomWorkout</Text>
        </View>
    );
}
