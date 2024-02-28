import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { FlashList } from "@shopify/flash-list";
import { StyledImage } from "@src/components/styled-components";
import { EquipmentData } from "@src/context/ProgramsContext/types";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";

interface EquipmentListProps {
    equipments: EquipmentData[];
}
const EquipmentList = ({ equipments }: EquipmentListProps) => {
    const estimatedItemSize = wn(100);
    return (
        <FlashList
            data={equipments}
            estimatedItemSize={estimatedItemSize}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={EquipmentListStyles.container}
            renderItem={({ item, index }) => (
                <EquipmentItem
                    {...item}
                    isLastItem={index === equipments.length - 1}
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

interface EquipmentItemProps extends EquipmentData {
    isLastItem: boolean;
}
const EquipmentItem = ({
    thumbnail,
    name,
    isLastItem = false,
}: EquipmentItemProps) => {
    const imageDimensions = wn(120);

    return (
        <View pr={!isLastItem ? "$12" : "0%"}>
            <View>
                <View
                    fd="row"
                    ai="center"
                    jc="center"
                    width={"$120"}
                    height={"$120"}
                    overflow="hidden"
                    backgroundColor={"$surface_primary"}
                >
                    <FastImage
                        source={{ uri: `https:${thumbnail}` }}
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
                    {name}
                </Text>
            </View>
        </View>
    );
};

export default EquipmentList;
