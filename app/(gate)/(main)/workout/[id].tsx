import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { WorkoutHeader } from "@src/components/stack-header/WorkoutScreenHeader";
import { Stack } from "expo-router";
import { Text, View } from "tamagui";

export default function WorkoutScreen() {
    const [showReadyScreen, setShowReadyScreen] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowReadyScreen(false);
        }, 3000);
    }, []);

    return (
        <View
            f={1}
            jc="center"
            ai="center"
            position="relative"
            bg="$surface_background"
        >
            <Stack.Screen
                options={{
                    header: () => <WorkoutHeader />,
                }}
            />
            {showReadyScreen ? <ReadyScreen /> : null}
            <Text>Workout Screen</Text>
        </View>
    );
}

const ReadyScreen = () => {
    const { width, height } = Dimensions.get("window");

    return (
        <View
            f={1}
            top={0}
            left={0}
            jc="center"
            ai="center"
            width={width}
            height={"100%"}
            position="absolute"
            bg="$surface_background"
            zIndex={1000}
            borderWidth={1}
            borderColor="red"
        >
            <Text>Ready Screen</Text>
        </View>
    );
};
