import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "tamagui";

export default function CustomWorkout() {
    const { custom_workout_id } = useLocalSearchParams();

    const [showReadyScreen, setShowReadyScreen] = useState(true);
    const [showRotateScreen, setShowRotateScreen] = useState(false);
    const [currentSlidePosition, setCurrentSlidePosition] = useState<number>(0);
    const [showWorkoutExitConfirm, setShowWorkoutExitConfirm] = useState(false);
    const [completedExercises, setCompletedExercises] = useState([]);
    const [backButtonPressed, setBackButtonPressed] = useState(false);
    const [confirmExitHeading, setConfirmExitHeading] = useState<string>("");
    const [confirmExitMessage, setConfirmExitMessage] = useState<string>("");
    const [isCompletingWorkout, setIsCompletingWorkout] = useState(false);

    return (
        <View>
            <Text>CustomWorkout</Text>
        </View>
    );
}
