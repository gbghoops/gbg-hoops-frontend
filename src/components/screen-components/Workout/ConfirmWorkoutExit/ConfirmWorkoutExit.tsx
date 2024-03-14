import React from "react";
import Button from "@src/components/button/Button";
import { Sheet, Text, View } from "tamagui";

interface ConfirmWorkoutExitProps {
    open: boolean;
    messageHeading?: string;
    message?: string;
    onOpenStateChange: (isOpen: boolean) => void;
    confirmExit: (state: boolean) => void;
}

const DEFAULT_MESSAGE_HEADING = "Are you sure you want to quit?";
const DEFAULT_MESSAGE = `You don’t really want to quit… \nAll of the shots you don’t take are misses!`;

const ConfirmWorkoutExit = ({
    onOpenStateChange,
    open,
    confirmExit,
    messageHeading = DEFAULT_MESSAGE_HEADING,
    message = DEFAULT_MESSAGE,
}: ConfirmWorkoutExitProps) => {
    return (
        <Sheet
            forceRemoveScrollEnabled={open}
            modal={true}
            open={open}
            snapPointsMode="fit"
            onOpenChange={onOpenStateChange}
            dismissOnSnapToBottom
            zIndex={100_000}
            animation="fast"
        >
            <Sheet.Overlay
                animation="slow"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
                backgroundColor={"rgba(20,20,20,0.75)"}
            />

            <Sheet.Frame padding="$10" backgroundColor={"$surface_primary"}>
                <Sheet.Handle
                    mb="$10"
                    height={"$4"}
                    width={"$80"}
                    mx="auto"
                    backgroundColor={"rgb(220, 220, 220)"}
                    opacity={0.35}
                    animation={"fast"}
                />
                <View my={"$20"} px={"$20"}>
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$24"}
                        textTransform="uppercase"
                        textAlign="left"
                    >
                        {messageHeading.length
                            ? messageHeading
                            : DEFAULT_MESSAGE_HEADING}
                    </Text>
                    <Text
                        mt="$16"
                        fontFamily="$heading"
                        fontSize="$20"
                        lineHeight={28}
                    >
                        {message.length ? message : DEFAULT_MESSAGE}
                    </Text>
                    <View mt="$30" mb="$10" width={"100%"}>
                        <Button
                            text="NO, RETURN TO WORKOUT"
                            fullWidth
                            onPress={() => {
                                confirmExit(false);
                                onOpenStateChange(false);
                            }}
                        />
                    </View>
                    <View mt="$10" mb="$10" width={"100%"}>
                        <Button
                            text="YES, QUIT"
                            fullWidth
                            secondary_transparent
                            onPress={() => {
                                confirmExit(true);
                            }}
                        />
                    </View>
                </View>
            </Sheet.Frame>
        </Sheet>
    );
};

export default ConfirmWorkoutExit;
