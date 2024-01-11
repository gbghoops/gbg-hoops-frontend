import React, { useEffect, useState } from "react";
import Button from "@src/components/button/Button";
import Link from "@src/components/link/Link";
import { Sheet, Text, View } from "tamagui";

interface ConfirmWorkoutExitProps {
    open: boolean;
    onOpenStateChange: (isOpen: boolean) => void;
    confirmExit: (state: boolean) => void;
}
const ConfirmWorkoutExit = ({
    onOpenStateChange,
    open,
    confirmExit,
}: ConfirmWorkoutExitProps) => {
    const [sheetOpen, setSheetOpen] = useState(false);

    useEffect(() => {
        setSheetOpen(open);
    }, [open]);

    useEffect(() => {
        onOpenStateChange(sheetOpen);
    }, [sheetOpen]);

    return (
        <Sheet
            forceRemoveScrollEnabled={sheetOpen}
            modal={true}
            open={sheetOpen}
            snapPointsMode="fit"
            onOpenChange={setSheetOpen}
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

            <Sheet.Frame
                padding="$10"
                space="$5"
                backgroundColor={"$surface_primary"}
            >
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
                        Are you sure you want to quit?
                    </Text>
                    <Text
                        mt="$16"
                        fontFamily="$heading"
                        fontSize="$20"
                        lineHeight={28}
                    >
                        {`You don’t really want to quit… \nAll of the shots you don’t take are misses!`}
                    </Text>
                    <View mt="$30" mb="$10" width={"100%"}>
                        <Button
                            text="NO, RETURN TO WORKOUT"
                            fullWidth
                            onPress={() => {
                                confirmExit(false);
                                setSheetOpen(false);
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
