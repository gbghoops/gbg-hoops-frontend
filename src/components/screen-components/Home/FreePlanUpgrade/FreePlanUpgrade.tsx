import React from "react";
import { Linking } from "react-native";
import Button from "@src/components/button/Button";
import { Text, View } from "tamagui";

const FreePlanUpgrade = () => {
    const websiteUrl = process.env.EXPO_PUBLIC_SIGNUP_URL ?? "";
    return (
        <View backgroundColor={"$surface_primary"} p={"$20"} pb="$30">
            <Text
                textTransform="uppercase"
                textAlign="center"
                fontSize="$24"
                fontFamily={"$heading"}
                my="$10"
            >
                Ready to Level Up?
            </Text>
            <Text
                textAlign="center"
                fontFamily="$body"
                fontSize="$16"
                lineHeight={20}
                px="$20"
            >
                Enjoy the full experience with the GBG Family Plan.
            </Text>
            <View fd="row" jc="center" mt="$20">
                <Button
                    text="UPGRADE NOW"
                    onPress={() => Linking.openURL(websiteUrl)}
                />
            </View>
        </View>
    );
};

export default FreePlanUpgrade;
