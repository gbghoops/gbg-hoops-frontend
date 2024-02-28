import { ActivityIndicator, StyleSheet } from "react-native";
import Image from "react-native-image-progress";
import { FlashList } from "@shopify/flash-list";
import { EquipmentData } from "@src/context/ProgramsContext/types";
import { colors } from "@src/styles/theme/colors";
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
    image: {
        width: wn(120),
        height: wn(120),
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
                    <Image
                        source={{ uri: `https:${thumbnail}` }}
                        indicator={() => (
                            <ActivityIndicator
                                size="small"
                                color={colors.gold}
                            />
                        )}
                        style={EquipmentListStyles.image}
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
