import { FlashList, FlatList, Tabs } from "react-native-collapsible-tab-view";
import Button from "@src/components/button/Button";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";

export const AllProgramsTab = () => {
    const { programs } = usePrograms();

    if (!programs) return null;

    return (
        <>
            {/* Filter Header */}

            <View borderWidth={1} borderColor={"red"} f={1}>
                <FlashList
                    data={[
                        ...programs,
                        ...programs,
                        ...programs,
                        ...programs,
                        ...programs,
                    ]}
                    numColumns={2}
                    keyExtractor={(item, index) =>
                        `${item.contentful_id}-${index}`
                    }
                    contentContainerStyle={
                        {
                            // backgroundColor: "blue",
                        }
                    }
                    ListHeaderComponent={() => (
                        <View fd="row" jc="flex-end" px={"$20"}>
                            <Button text={`Filter`} secondary_transparent />
                        </View>
                    )}
                    ListHeaderComponentStyle={{
                        marginVertical: wn(10),
                    }}
                    renderItem={({ item: program }) => (
                        <View width={"50%"}>
                            <Text>{program.name}</Text>
                        </View>
                    )}
                />
            </View>
        </>
    );
};
