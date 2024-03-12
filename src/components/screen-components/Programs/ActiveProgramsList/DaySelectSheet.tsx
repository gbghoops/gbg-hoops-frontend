import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Button from "@src/components/button/Button";
import { widthNormalized } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { Sheet, Text, View } from "tamagui";

interface DaySelectSheetProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    currentDay: number;
    currentWeek: number;
    maxDay: number;
    maxWeek: number;
    programSlug: string;
}

const DaySelectSheet = ({
    isVisible,
    setIsVisible,
    currentDay,
    currentWeek,
    maxDay = 5,
    maxWeek,
    programSlug,
}: DaySelectSheetProps) => {
    const [selectedDay, setSelectedDay] = useState(currentDay);
    const [selectedWeek, setSelectedWeek] = useState(currentWeek);
    const { push } = useRouter();

    useEffect(() => {
        setSelectedDay(currentDay);
        setSelectedWeek(currentWeek);
    }, [currentDay, currentWeek]);

    const dayOptions = Array.from({ length: maxDay }, (_, i) => ({
        label: `Day ${i + 1}`,
        key: `${programSlug}-day-${i}`,
        value: i + 1,
    }));

    const weekOptions = Array.from({ length: maxWeek }, (_, i) => ({
        label: `Week ${i + 1}`,
        key: `${programSlug}-week-${i}`,
        value: i + 1,
    }));

    const canProceed = selectedDay && selectedWeek;

    const onProceed = () => {
        if (!canProceed) return;

        setIsVisible(false);
        return push(
            `/program/workout-details/${programSlug}/${selectedWeek}/${selectedDay}`,
        );
    };

    return (
        <Sheet
            modal
            zIndex={100_000}
            animation="fast"
            snapPointsMode="fit"
            open={isVisible}
            onOpenChange={setIsVisible}
            disableDrag
        >
            <Sheet.Overlay
                animation="slow"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
                backgroundColor={"rgba(20,20,20,0.75)"}
            />
            {/* Day Select Sheet Content */}
            <Sheet.Frame padding="$10" backgroundColor={"$surface_primary"}>
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
                <View my={"$20"}>
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$24"}
                        textTransform="uppercase"
                        textAlign="center"
                    >
                        Select the Day and Week you want to jump tow
                    </Text>
                    <View mt="$30" width={"100%"}>
                        {/* Day Select */}
                        <View
                            fd="column"
                            jc="space-between"
                            mb="$20"
                            ai="center"
                        >
                            <Text fontFamily={"$acuminProBold"} fontSize="$18">
                                Select Day
                            </Text>
                            <View>
                                <RNPickerSelect
                                    onValueChange={(val) => {
                                        setSelectedDay(val);
                                    }}
                                    items={dayOptions}
                                    style={{ ...pickerSelectStyles }}
                                    placeholder={{
                                        label: "Press to select",
                                        value: currentDay,
                                    }}
                                />
                            </View>
                        </View>

                        {/* Week Seledt */}
                        <View
                            fd="column"
                            jc="space-between"
                            mb="$20"
                            ai="center"
                        >
                            <Text fontFamily={"$acuminProBold"} fontSize="$18">
                                Select Week
                            </Text>
                            <View>
                                <RNPickerSelect
                                    onValueChange={(val) => {
                                        setSelectedWeek(val);
                                    }}
                                    items={weekOptions}
                                    style={{ ...pickerSelectStyles }}
                                    placeholder={{
                                        label: "Press to select",
                                        value: currentWeek,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View my="$20" px="$20" mb="$30">
                    <Button
                        text="Go to Workout"
                        fullWidth
                        isDisabled={!canProceed}
                        onPress={onProceed}
                    />
                </View>
            </Sheet.Frame>
        </Sheet>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        color: "white",
        paddingRight: 30, // to ensure the text is never behind the icon
        width: widthNormalized(200),
        marginTop: widthNormalized(5),
        fontFamily: "acumin_pro_regular",
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
        width: widthNormalized(200),
        marginTop: widthNormalized(5),
        fontFamily: "acumin_pro_regular",
    },
});

export default DaySelectSheet;
