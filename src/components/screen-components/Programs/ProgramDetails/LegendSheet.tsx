import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Sheet, Text, View } from "tamagui";

interface LegendSheetProps {
    sheetOpen: boolean;
    setSheetOpen: (open: boolean) => void;
}
const LegendSheet = ({ sheetOpen, setSheetOpen }: LegendSheetProps) => {
    return (
        <Sheet
            forceRemoveScrollEnabled={sheetOpen}
            modal={true}
            open={sheetOpen}
            snapPointsMode="fit"
            onOpenChange={setSheetOpen}
            disableDrag
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
                        LEGEND
                    </Text>
                    <View mt="$30" width={"100%"}>
                        <ScrollView style={styles.scrollView}>
                            {legendData.map((item, index) => {
                                return (
                                    <View
                                        key={index}
                                        fd={"row"}
                                        ai={"center"}
                                        mb={"$10"}
                                    >
                                        <Text
                                            fontFamily={"$heading"}
                                            fontSize={"$18"}
                                            width={"$40"}
                                            textAlign="left"
                                        >
                                            {item.key}
                                        </Text>
                                        <Text
                                            fontFamily={"$body"}
                                            fontSize={"$16"}
                                            width={"100%"}
                                            ml={"$30"}
                                        >
                                            {item.value}
                                        </Text>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            </Sheet.Frame>
        </Sheet>
    );
};

const legendData = [
    {
        key: "+",
        value: "Loaded",
    },
    {
        key: "1L",
        value: "Single Leg",
    },
    {
        key: "1A",
        value: "Single Arm",
    },
    {
        key: "2L",
        value: "Two Leg",
    },
    {
        key: "2A",
        value: "Two Arm",
    },
    {
        key: "BB",
        value: "Barbell",
    },
    {
        key: "DB",
        value: "Dumbbell",
    },
    {
        key: "DF",
        value: "Dorsi Flexion",
    },
    {
        key: "Ecc",
        value: "Eccentric",
    },
    {
        key: "Ext",
        value: "Extended",
    },
    {
        key: "Explo",
        value: "Exploration",
    },
    {
        key: "FFE",
        value: "Front Foot Elevated",
    },
    {
        key: "GHD",
        value: "Glute Hamstring Developer",
    },
    {
        key: "HAM",
        value: "Hamstring",
    },
    {
        key: "KB",
        value: "Kettlebell",
    },
    {
        key: "MVMT",
        value: "Movement",
    },
    {
        value: "Overhead",
        key: "Ovhd",
    },
    {
        value: "Touchdown",
        key: "TD",
    },
    {
        value: "Tensor Fasciae Latae",
        key: "TFL",
    },
    {
        value: "Romanian Deadlift",
        key: "RDL",
    },
    {
        value: "Rate of Force Development",
        key: "RFD",
    },
    {
        value: "Rear Foot Elevated",
        key: "RFE",
    },
    {
        value: "Rear Foot Elevated Split Squat",
        key: "RFESS",
    },
    {
        value: "Right Right Left Left",
        key: "RRL",
    },
    {
        value: "Quadratus Lumborum",
        key: "QL",
    },
];

const styles = StyleSheet.create({
    scrollView: {
        width: "100%",
        flex: 1,
        maxHeight: wn(450),
        marginBottom: wn(5),
        paddingHorizontal: wn(10),
    },
});

export default LegendSheet;
