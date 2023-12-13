import Button from "@src/components/button/Button";
import { Text, View } from "tamagui";
const ReferAFriend = () => (
    <View mt="$35" mx="$20">
        <View backgroundColor={"$surface_primary"} p="$20" pb="$30">
            <Text
                textTransform="uppercase"
                textAlign="center"
                fontSize="$24"
                fontFamily={"$heading"}
                my="$10"
            >
                Refer a Friend
            </Text>
            <Text
                textAlign="center"
                fontFamily={"$body"}
                fontSize="$16"
                lineHeight={22}
                px="$20"
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <View fd="row" jc="center" mt="$20">
                <Button text="EMAIL" />
                <View mx="$5" />
                <Button text="SHARE" secondary_transparent />
            </View>
        </View>
    </View>
);

export default ReferAFriend;
