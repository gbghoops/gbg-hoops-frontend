import { useState } from "react";
import { Linking } from "react-native";
import { AvoidSoftInputView } from "react-native-avoid-softinput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import { StyledImage } from "@src/components/styled-components";
import {
    FieldType,
    TitledTextField,
} from "@src/components/titled-text-field/TitledTextField";
import useCustomWorkouts from "@src/hooks/custom-workout/useCustomWorkouts";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { toast } from "burnt";
import { useRouter } from "expo-router";
import { Sheet, Text, View, XStack } from "tamagui";

interface BeginBuildYourWorkoutSheetProps {
    sheetOpen: boolean;
    isFreeUser: boolean;
    setSheetOpen: (open: boolean) => void;
}

const BeginBuildYourWorkoutSheet = ({
    sheetOpen,
    isFreeUser,
    setSheetOpen,
}: BeginBuildYourWorkoutSheetProps) => {
    const websiteUrl = process.env.EXPO_PUBLIC_SIGNUP_URL ?? "";
    const [exerciseName, setExerciseName] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { top } = useSafeAreaInsets();
    const { createCustomWorkout, createCustomWorkoutLoading } =
        useCustomWorkouts();
    const { push } = useRouter();

    const handleFreeUserUpgradeAction = () => {
        setSheetOpen(false);

        setTimeout(() => {
            Linking.openURL(websiteUrl);
        }, 300);
    };

    const onCustomWorkoutCreate = async () => {
        try {
            const res = await createCustomWorkout({ name: exerciseName });

            setSheetOpen(false);

            return setTimeout(() => {
                return push(`/custom-workouts/${res.workout_id}`);
            }, 300);
        } catch (e) {
            if (e instanceof Error) {
                setErrorMessage(e.message);

                return toast({
                    title: e.message,
                    preset: "error",
                });
            }
        }
    };

    return (
        <Sheet
            modal
            disableDrag
            open={sheetOpen}
            zIndex={100_000}
            animation="fast"
            snapPointsMode={"fit"}
            onOpenChange={setSheetOpen}
            forceRemoveScrollEnabled={sheetOpen}
        >
            <Sheet.Overlay
                animation="fast"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
                backgroundColor={"rgba(20,20,20,0.75)"}
            />
            <AvoidSoftInputView
                avoidOffset={top + wn(10)}
                easing="easeIn"
                enabled={true}
                hideAnimationDelay={100}
                hideAnimationDuration={300}
            >
                <Sheet.Frame
                    padding="$10"
                    space="$5"
                    backgroundColor={"$surface_primary"}
                    zIndex={200_000}
                >
                    <Sheet.Handle
                        mb="$10"
                        height={"$4"}
                        width={"$80"}
                        mx="auto"
                        backgroundColor={"rgb(220, 220, 220)"}
                        opacity={0.35}
                        animation={"fast"}
                        pressStyle={{
                            opacity: 1,
                        }}
                    />
                    {isFreeUser ? (
                        <View
                            backgroundColor={"$surface_primary"}
                            p={"$10"}
                            pb="$30"
                        >
                            <Text
                                textTransform="uppercase"
                                textAlign="center"
                                fontSize="$24"
                                fontFamily={"$heading"}
                                my="$10"
                            >
                                Upgrade Your Account to Access This Feature
                            </Text>
                            <Text
                                textAlign="center"
                                fontFamily="$body"
                                fontSize="$16"
                                lineHeight={20}
                                px="$20"
                            >
                                Enjoy the full experience with the GBG Family
                                Plan.
                            </Text>
                            <View fd="row" jc="center" mt="$20">
                                <Button
                                    text="UPGRADE NOW"
                                    onPress={handleFreeUserUpgradeAction}
                                />
                            </View>
                        </View>
                    ) : (
                        <View my={"$10"} mb="$30">
                            <Text
                                fontFamily={"$heading"}
                                fontSize={"$24"}
                                textTransform="uppercase"
                                textAlign="center"
                            >
                                What Should we call this workout?
                            </Text>
                            <View mt="$30" mx="$20">
                                <TitledTextField
                                    type={FieldType.TEXT}
                                    title="Workout Name"
                                    value={exerciseName}
                                    handleChange={setExerciseName}
                                    placeholder="Enter workout name"
                                    handleFocus={() => {
                                        setErrorMessage(null);
                                    }}
                                    handleBlur={() => setErrorMessage(null)}
                                />
                                {/* Error container */}
                                <View mt={"$5"}>
                                    {errorMessage ? (
                                        <XStack
                                            borderWidth={1}
                                            borderColor="$error_primary"
                                            py={wn(10)}
                                            px={wn(10)}
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            animation={"medium"}
                                            enterStyle={{
                                                opacity: 0,
                                                y: 10,
                                            }}
                                            exitStyle={{
                                                opacity: 0,
                                                y: -10,
                                            }}
                                        >
                                            <View
                                                w={wn(24)}
                                                h={wn(24)}
                                                jc="center"
                                                ai="center"
                                            >
                                                <StyledImage
                                                    source={require("@assets/icon/error.png")}
                                                />
                                            </View>
                                            <View f={1} ml={wn(5)}>
                                                <Text
                                                    fontFamily={"$body"}
                                                    fontSize={wn(17)}
                                                    lineHeight={wn(18)}
                                                >
                                                    {errorMessage}
                                                </Text>
                                            </View>
                                        </XStack>
                                    ) : null}
                                </View>
                                <View mt="$10" mb="$10" width={"100%"}>
                                    <Button
                                        fullWidth
                                        text="START BUILDING"
                                        isDisabled={!exerciseName}
                                        onPress={onCustomWorkoutCreate}
                                        loading={createCustomWorkoutLoading}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </Sheet.Frame>
            </AvoidSoftInputView>
        </Sheet>
    );
};

export default BeginBuildYourWorkoutSheet;
