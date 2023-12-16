import { ImageURISource, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { StyledImage } from "@src/components/styled-components";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";

interface EquipmentProps {
    id: number;
    equipmentTitle: string;
    equipmentImage: ImageURISource;
}

const EquipmentData: EquipmentProps[] = [
    {
        id: 1,
        equipmentTitle: "Exercise Mat",
        equipmentImage: require("@assets/programs/equipment/mat.png"),
    },
    {
        id: 2,
        equipmentTitle: "Tennis Ball",
        equipmentImage: require("@assets/programs/equipment/tennis-ball.png"),
    },
    {
        id: 3,
        equipmentTitle: "Foam Roller",
        equipmentImage: require("@assets/programs/equipment/foam-roller.png"),
    },
    {
        id: 4,
        equipmentTitle: "Tall Sticks or Dowels",
        equipmentImage: require("@assets/programs/equipment/stick.png"),
    },
    {
        id: 5,
        equipmentTitle: "Yoga Block or Foam Pad",
        equipmentImage: require("@assets/programs/equipment/yoga-block.png"),
    },
];

const EquipmentList = () => {
    const estimatedItemSize = wn(100);
    return (
        <FlashList
            data={EquipmentData}
            estimatedItemSize={estimatedItemSize}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={EquipmentListStyles.container}
            renderItem={({ item, index }) => (
                <EquipmentItem
                    {...item}
                    isLastItem={index === EquipmentData.length - 1}
                />
            )}
        />
    );
};

const EquipmentListStyles = StyleSheet.create({
    container: {
        paddingLeft: wn(20),
        paddingRight: wn(20),
    },
});

interface EquipmentItemProps extends EquipmentProps {
    isLastItem: boolean;
}
const EquipmentItem = ({
    equipmentImage,
    equipmentTitle,
    isLastItem = false,
}: EquipmentItemProps) => {
    const imageDimensions = wn(50);

    return (
        <View pr={!isLastItem ? "$12" : 0}>
            <View>
                <View fd="row" ai="center" width={"$120"} height={"$120"}>
                    <StyledImage
                        source={equipmentImage}
                        width={imageDimensions}
                        height={imageDimensions}
                        resizeMode="contain"
                    />
                </View>
                <Text
                    ff="$body"
                    fontSize="$16"
                    mt="$10"
                    maxWidth="$120"
                    lineHeight={20}
                >
                    {equipmentTitle}
                </Text>
            </View>
        </View>
    );
};

export default EquipmentList;
