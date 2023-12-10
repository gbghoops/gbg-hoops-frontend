import Button from "@src/components/button/Button";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Text, View } from "tamagui";
const ReferAFriend = () => (
    <View mt={wn(35)} mx={wn(20)}>
        <View backgroundColor={"$surface_primary"} p={wn(20)} pb={wn(30)}>
            <Text
                textTransform="uppercase"
                textAlign="center"
                fontSize={wn(24)}
                fontFamily={"$heading"}
                my={wn(10)}
            >
                Refer a Friend
            </Text>
            <Text
                textAlign="center"
                fontFamily={"$body"}
                fontSize={wn(16)}
                px={wn(20)}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <View fd="row" jc="center" mt="$20">
                <Button text="EMAIL" />
                <View mx={wn(5)} />
                <Button text="SHARE" secondary_transparent />
            </View>
        </View>
    </View>
);

export default ReferAFriend;
