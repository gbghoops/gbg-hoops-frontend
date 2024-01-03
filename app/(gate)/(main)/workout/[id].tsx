import { useEffect, useState } from "react";
import ReadyScreen from "@src/components/screen-components/Workout/ReadyScreen";
import RotateDeviceModal from "@src/components/screen-components/Workout/RotateDeviceModal";
import { WorkoutHeader } from "@src/components/stack-header/WorkoutScreenHeader";
import { Stack } from "expo-router";
import { AnimatePresence, Text, View } from "tamagui";

export default function WorkoutScreen() {
    const [showReadyScreen, setShowReadyScreen] = useState(true);
    const [showRotateScreen, setShowRotateScreen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowReadyScreen(false);
            setShowRotateScreen(true);
        }, 3000);
    }, []);

    useEffect(() => {
        if (showRotateScreen) {
            setTimeout(() => {
                setShowRotateScreen(false);
            }, 3000);
        }
    }, [showRotateScreen]);
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
            <AnimatePresence>
                {showReadyScreen ? <ReadyScreen key={"ready-screen"} /> : null}
                {showRotateScreen ? (
                    <RotateDeviceModal
                        key={"rotate-device-screen"}
                        isVisible={showRotateScreen}
                    />
                ) : null}
            </AnimatePresence>
            <Text>Workout Screen</Text>
        </View>
    );
}
