import { heightNormalized as hn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";
interface SetsCounterProps {
    totalSetCount: number;
    totalRepsCount: number;
    subBlockTitle?: string;
    isLandScape?: boolean;
}
const SetsCounter = ({
    totalRepsCount,
    totalSetCount,
    subBlockTitle,
    isLandScape = false,
}: SetsCounterProps) => {
    return (
        <View
            fd="row"
            px={isLandScape ? "$8" : "$16"}
            py="$8"
            jc="space-between"
            ai="center"
            h={isLandScape ? hn(40) : "$40"}
            backgroundColor={"$surface_primary"}
        >
            <View f={1} flexDirection="row">
                <View px="$10">
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$20"}
                    >{`${totalSetCount} Set${
                        totalSetCount > 1 ? "s" : ""
                    }`}</Text>
                </View>
                {totalRepsCount ? (
                    <View
                        borderLeftWidth={0.5}
                        px={"$10"}
                        borderLeftColor={"$border_primary"}
                    >
                        <Text
                            fontFamily={"$heading"}
                            fontSize={"$20"}
                        >{`${totalRepsCount} Rep${
                            totalSetCount > 1 ? "s" : ""
                        }`}</Text>
                    </View>
                ) : null}
            </View>
            <View>
                {/* Parent block title tag. */}
                {subBlockTitle ? (
                    <View
                        width="auto"
                        backgroundColor="$gold"
                        ai="center"
                        justifyContent="center"
                        p={"$4"}
                        pt={"$5"}
                    >
                        <Text
                            fontFamily={"$acuminProBold"}
                            textTransform="uppercase"
                            color="$text_secondary"
                            fontSize={"$12"}
                        >
                            {subBlockTitle}
                        </Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

export default SetsCounter;
