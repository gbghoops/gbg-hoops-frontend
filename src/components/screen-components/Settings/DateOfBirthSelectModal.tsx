import { ActivityIndicator, Modal } from "react-native";
import { StyleSheet } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { Octicons } from "@expo/vector-icons";
import { colors } from "@src/styles/theme/colors";
import { sizes } from "@src/styles/theme/sizes";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import dayjs from "dayjs";
import { Text, View } from "tamagui";

interface DateOfBirthSelectModalProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    dateOfBirth: string;
    setDateOfBirth: (date: string) => void;
}
export default function DateOfBirthSelectModal({
    isVisible,
    setIsVisible,
    dateOfBirth,
    setDateOfBirth,
}: DateOfBirthSelectModalProps) {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isVisible}
            supportedOrientations={[
                "portrait",
                "landscape-left",
                "landscape-right",
            ]}
        >
            <View
                f={1}
                left={0}
                jc="center"
                ai="center"
                width={"100%"}
                height={"100%"}
                position="absolute"
                bg="$transclucent_dark_80"
                key="rotate-device-screen"
                animation={"fast"}
                zIndex={200000}
                onPress={() => setIsVisible(false)}
            >
                <View
                    width={"80%"}
                    backgroundColor={"$surface_primary"}
                    borderRadius={"$10"}
                    pressStyle={{
                        scale: 1, // <-- ADD THIS TO PREVENT OVERLAY PRESS OVERRIDE.
                    }}
                >
                    {/* Header */}
                    <View
                        fd="row"
                        jc="space-between"
                        ai="center"
                        borderBottomWidth={0.25}
                        borderBottomColor={"$border_primary"}
                        p="$15"
                    >
                        <View
                            w="$30"
                            h="$30"
                            jc={"center"}
                            ai="center"
                            animation={"medium"}
                            pressStyle={{
                                opacity: 0.5,
                                scale: 0.95,
                            }}
                            onPress={() => setIsVisible(false)}
                        >
                            <Octicons
                                name="x"
                                size={wn(25)}
                                color={colors.gold}
                            />
                        </View>
                        <View>
                            <Text
                                fontSize={"$20"}
                                fontFamily={"$acuminProBold"}
                                ml="$10"
                            >
                                {"Select Date of Birth"}
                            </Text>
                        </View>
                        <View width={"$30"} />
                    </View>
                    {/* Body */}
                    <View px="$20" mt="$20" pb="$15">
                        <DateTimePicker
                            mode="single"
                            selectedItemColor={colors.gold_indicator}
                            onChange={(newDate) =>
                                setDateOfBirth(
                                    dayjs(newDate.date).format("YYYY-MM-DD"),
                                )
                            }
                            selectedTextStyle={{
                                ...styles.calendarText,
                                ...styles.calendarTextGold,
                            }}
                            date={dayjs(dateOfBirth)}
                            calendarTextStyle={{
                                ...styles.calendarText,
                                ...styles.calendarTextWhite,
                            }}
                            headerTextStyle={{
                                ...styles.calendarText,
                                ...styles.calendarTextWhite,
                            }}
                            weekDaysTextStyle={{
                                ...styles.calendarText,
                                ...styles.calendarTextGold,
                            }}
                            buttonPrevIcon={
                                <Octicons
                                    name="chevron-left"
                                    size={wn(16)}
                                    color={colors.gold}
                                />
                            }
                            buttonNextIcon={
                                <Octicons
                                    name="chevron-right"
                                    size={wn(16)}
                                    color={colors.gold}
                                />
                            }
                            weekDaysContainerStyle={{
                                borderBottomWidth: 0.25,
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    calendarText: {
        fontFamily: "acumin_pro_semibold",
        fontSize: wn(18),
    },
    calendarTextBlack: {
        color: colors.black,
    },
    calendarTextWhite: {
        color: colors.white,
    },
    calendarTextGold: {
        color: colors.gold,
    },
});
