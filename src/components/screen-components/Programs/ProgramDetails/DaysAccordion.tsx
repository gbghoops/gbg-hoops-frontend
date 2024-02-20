import { useEffect, useState } from "react";
import { StyleSheet, View as RNView } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Octicons } from "@expo/vector-icons";
import { ProgramDay } from "@src/context/ProgramsContext/types";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";

import RenderExerciseList from "../WorkoutDetails/RenderExerciseList/RenderExerciseList";

interface DaysAccordionProps {
    index: number;
    day: ProgramDay;
    onAccordionOpenStateChange?: (isOpen: boolean) => void;
}
const DaysAccordion = ({
    day,
    index,
    onAccordionOpenStateChange,
}: DaysAccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const title = day.exercises[0].title;
    const summary = day.summary;
    const exerciseCount = summary.length;

    useEffect(() => {
        onAccordionOpenStateChange && onAccordionOpenStateChange(isOpen);
    }, [isOpen]);

    const headerHeight = wn(80);

    return (
        <View py="$5" px="$5" height={isOpen ? "auto" : headerHeight}>
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
                        paddingHorizontal={"$15"}
                        animation={"medium"}
                        pressStyle={{
                            opacity: 0.55,
                            scale: 0.99,
                        }}
                        onPress={() => setIsOpen(!isOpen)}
                    >
                        <View maxWidth={"$200"}>
                            <Text fontSize={"$14"} fontFamily={"$body"}>
                                {`Day ${index + 1}`}
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

                        <View fd="row" ai="center">
                            <Text fontSize={"$14"} fontFamily={"$body"}>
                                {exerciseCount} Exercise
                                {exerciseCount > 1 ? "s" : ""}
                            </Text>
                            <View
                                ml="$5"
                                h={"$30"}
                                w={"$30"}
                                jc="center"
                                ai="center"
                            >
                                <View
                                    animation={"medium"}
                                    transform={[
                                        { rotate: isOpen ? "-90deg" : "0deg" },
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
                </RNView>
                {/* Content */}
                <View minHeight={"$50"} px={"$20"}>
                    {isOpen ? <RenderExerciseList exerciseData={day} /> : null}
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
        paddingHorizontal: wn(10),
        paddingVertical: wn(15),
    },
    header: {
        width: "100%",
        // marginBottom: wn(10),
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default DaysAccordion;
