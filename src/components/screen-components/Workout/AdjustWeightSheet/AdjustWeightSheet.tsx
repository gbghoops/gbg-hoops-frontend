import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Button from "@src/components/button/Button";
import { StyledImage } from "@src/components/styled-components";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Sheet, Text, View, XStack } from "tamagui";

interface AdjustWeightSheetProps {
    open: boolean;
    currentWeight: number;
    onOpenStateChange: (isOpen: boolean) => void;

    onWeightChange: (weight: number) => void;
}
const AdjustWeightSheet = ({
    onOpenStateChange,
    open,
    currentWeight,
    onWeightChange,
}: AdjustWeightSheetProps) => {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [weight, setWeight] = useState(currentWeight);

    useEffect(() => {
        setSheetOpen(open);
    }, [open]);

    useEffect(() => {
        onOpenStateChange(sheetOpen);
    }, [sheetOpen]);

    useEffect(() => {
        onWeightChange(weight);
    }, [weight]);

    const AddWeight = () => {
        setWeight(weight + 5);
    };

    const RemoveWeight = () => {
        if (weight <= 0) return;

        setWeight(weight - 5);
    };

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
                <View my={"$20"} px={"$20"} minHeight={wn(200)}>
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$24"}
                        textTransform="uppercase"
                        textAlign="center"
                    >
                        Adjust Weight
                    </Text>

                    <XStack mt={"$20"} mb={"$4"} ai="center" jc="center">
                        <View
                            ai="center"
                            jc="center"
                            w="$30"
                            h="$30"
                            p={"$5"}
                            borderWidth={1}
                            borderColor="$gold"
                            animation="fast"
                            onPress={RemoveWeight}
                            opacity={weight <= 0 ? 0.5 : 1}
                            pressStyle={{
                                opacity: 0.75,
                                scale: 0.9,
                            }}
                        >
                            <StyledImage
                                source={require("@assets/icon/remove.png")}
                                style={styles.adjustButtonImage}
                            />
                        </View>
                        <XStack>
                            <Text
                                mx="$15"
                                fontSize={"$24"}
                                fontFamily="$heading"
                            >{`${currentWeight} LBS`}</Text>
                        </XStack>
                        <View
                            ai="center"
                            jc="center"
                            w="$30"
                            h="$30"
                            p={"$5"}
                            borderWidth={1}
                            borderColor="$gold"
                            animation="fast"
                            onPress={AddWeight}
                            pressStyle={{
                                opacity: 0.75,
                                scale: 0.9,
                            }}
                        >
                            <StyledImage
                                source={require("@assets/icon/add.png")}
                                style={styles.adjustButtonImage}
                            />
                        </View>
                    </XStack>

                    <XStack mt={"auto"} mb={"$4"}>
                        <View f={1} pr={"$4"}>
                            <Button
                                text="RESET"
                                secondary_transparent
                                onPress={() => {
                                    setWeight(5);
                                    setSheetOpen(false);
                                }}
                                fullWidth
                            />
                        </View>
                        <View f={1} pl="$4">
                            <Button
                                text="Save"
                                fullWidth
                                onPress={() => {
                                    setSheetOpen(false);
                                }}
                            />
                        </View>
                    </XStack>
                </View>
            </Sheet.Frame>
        </Sheet>
    );
};

const styles = StyleSheet.create({
    adjustButtonImage: {
        width: wn(15),
        height: wn(15),
    },
});

export default AdjustWeightSheet;
