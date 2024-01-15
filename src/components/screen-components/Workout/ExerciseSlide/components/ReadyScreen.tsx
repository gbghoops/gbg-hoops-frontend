import { useSafeAreaInsets } from "react-native-safe-area-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";

const ReadyScreen = () => {
    const { top } = useSafeAreaInsets();

    const innerMargin = -(top + wn(60));
    return (
        <View
            f={1}
            top={0}
            left={0}
            jc="center"
            ai="center"
            height={"100%"}
            width={"100%"}
            position="absolute"
            bg="$surface_background"
            zIndex={1000}
            key="ready-screen"
            animation={"fast"}
            enterStyle={{
                opacity: 0,
            }}
            exitStyle={{
                opacity: 0,
                y: -10,
            }}
        >
            <View mt={innerMargin} jc="center" ai="center">
                <Text
                    fontFamily={"$heading"}
                    color="$white"
                    fontSize={"$40"}
                    textTransform="uppercase"
                >
                    Ready?
                </Text>
                <Text
                    fontFamily={"$heading"}
                    color="$gold"
                    fontSize={"$64"}
                    textTransform="uppercase"
                >
                    {`Let's Go!`}
                </Text>
            </View>
        </View>
    );
};

export default ReadyScreen;
