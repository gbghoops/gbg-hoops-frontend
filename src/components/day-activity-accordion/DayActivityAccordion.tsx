import { useEffect, useState } from "react";
import { StyleSheet, View as RNView } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Octicons } from "@expo/vector-icons";
import DayActivityExerciseList from "@src/components/day-activity-exercise-list/DayActivityExerciseList";
import { ProgramDay } from "@src/context/ProgramsContext/types";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";

interface DayActivityAccordionProps {
    index: number;
    day: ProgramDay;
    showCompletedTag?: boolean;
    removeHorizontalPadding?: boolean;
    onAccordionOpenStateChange?: (isOpen: boolean) => void;
}
const DayActivityAccordion = ({
    day,
    index,
    showCompletedTag = false,
    removeHorizontalPadding = false,
    onAccordionOpenStateChange,
}: DayActivityAccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const title = day.exercises[0]?.title;
    const summary = day.summary;
    const exerciseCount = summary.length;

    useEffect(() => {
        onAccordionOpenStateChange && onAccordionOpenStateChange(isOpen);
    }, [isOpen]);

    const headerHeight = wn(75);

    return (
        <View
            py="$5"
            px={!removeHorizontalPadding ? "$5" : 0}
            height={isOpen ? "auto" : headerHeight}
        >
            <Animated.View
                layout={LinearTransition.springify()
                    .mass(1)
                    .damping(20)
                    .stiffness(200)}
                style={[
                    styles.container,
                    { height: isOpen ? "auto" : headerHeight },
                ]}
            >
                {/* Header */}
                <RNView style={styles.header}>
                    <View
                        flexDirection="row"
                        ai="center"
                        jc="space-between"
                        width={"100%"}
                        paddingVertical={"$15"}
                        paddingHorizontal={!removeHorizontalPadding ? "$15" : 0}
                        animation={"medium"}
                        pressStyle={{
                            opacity: 0.55,
                            scale: 0.99,
                        }}
                        onPress={() => setIsOpen(!isOpen)}
                    >
                        <View maxWidth={"$200"} h="100%">
                            <Text fontSize={"$14"} fontFamily={"$body"}>
                                {day.dayTitle || `Day ${index + 1}`}
                            </Text>
                            <Text
                                fontSize={"$16"}
                                fontFamily={"$heading"}
                                mt="$10"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {title}
                            </Text>
                        </View>

                        <View height={"100%"} alignSelf="flex-end">
                            {showCompletedTag ? (
                                <View
                                    backgroundColor="$surface_accent"
                                    py="$2"
                                    px="$5"
                                    mb="$5"
                                    br="$6"
                                    fd="row"
                                    ai="center"
                                >
                                    <View mr={wn(5)}>
                                        <Octicons
                                            name="check-circle"
                                            size={12}
                                            color={colors.text_secondary}
                                        />
                                    </View>
                                    <Text
                                        fontFamily={"$acuminProSemibold"}
                                        color="$text_secondary"
                                        textTransform="uppercase"
                                        mt={wn(2)}
                                    >
                                        Completed
                                    </Text>
                                </View>
                            ) : null}
                            <View fd="row" ai="center" alignSelf="flex-end">
                                <Text
                                    fontSize={"$14"}
                                    fontFamily={"$body"}
                                    alignSelf="flex-end"
                                >
                                    {exerciseCount} Exercise
                                    {exerciseCount > 1 ? "s" : ""}
                                </Text>
                                <View
                                    ml="$5"
                                    h={"$20"}
                                    w={"$20"}
                                    jc="center"
                                    ai="center"
                                    alignSelf="flex-end"
                                >
                                    <View
                                        animation={"medium"}
                                        transform={[
                                            {
                                                rotate: isOpen
                                                    ? "-90deg"
                                                    : "0deg",
                                            },
                                        ]}
                                    >
                                        <Octicons
                                            name="chevron-down"
                                            size={18}
                                            color={colors.gold}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </RNView>
                {/* Content */}
                <View
                    minHeight={"$50"}
                    px={!removeHorizontalPadding ? "$20" : 0}
                >
                    {isOpen ? (
                        <DayActivityExerciseList exerciseData={day} />
                    ) : null}
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        overflow: "hidden",
        borderBottomColor: colors.border_primary,
        borderBottomWidth: 0.25,
    },
    header: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default DayActivityAccordion;
