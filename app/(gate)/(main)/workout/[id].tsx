import { WorkoutHeader } from "@src/components/stack-header/WorkoutScreenHeader";
import { Stack } from "expo-router";
import { Text, View } from "tamagui";

export default function WorkoutScreen() {
    return (
        <View f={1} bg="$surface_background" jc="center" ai="center">
            <Stack.Screen
                options={{
                    header: () => <WorkoutHeader />,
                }}
            />
            <Text>Workout Screen</Text>
        </View>
    );
}
