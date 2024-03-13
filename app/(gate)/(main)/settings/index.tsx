import { Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import PageError from "@src/components/screen-components/PageError/PageError";
import SettingsHeader from "@src/components/screen-components/Settings/SettingsHeader";
import SettingsListItem from "@src/components/screen-components/Settings/SettingsItem";
import { useAuthState } from "@src/context/auth-context";
import { useUser } from "@src/context/UserContext/user-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Stack as RouterStack, useRouter } from "expo-router";
import { ScrollView, Stack, Text, View } from "tamagui";

export default function SettingsScreen() {
    const authState = useAuthState();
    const userContext = useUser();
    const { bottom } = useSafeAreaInsets();
    const { replace, push } = useRouter();

    if (!userContext || !userContext.user) return <PageError />;

    const { user } = userContext;

    const fullName = `${user.given_name} ${user.family_name}`;

    const websiteUrl = process.env.EXPO_PUBLIC_GBG_WEBSITE_URL ?? "";

    return (
        <Stack
            backgroundColor={"$surface_background"}
            f={1}
            pb={bottom + wn(10)}
        >
            <RouterStack.Screen
                options={{
                    header: () => <SettingsHeader />,
                }}
            />
            <ScrollView f={1} showsVerticalScrollIndicator={false}>
                <View px="$20" py="$10">
                    <Text
                        color="$text_primary"
                        fontFamily={"$heading"}
                        fontSize={"$40"}
                        textTransform="uppercase"
                    >
                        Settings
                    </Text>
                    {/* Email and Fullname */}
                    <View mt="$30">
                        <Text fontFamily={"$heading"} fontSize="$24">
                            {fullName}
                        </Text>
                        <Text fontFamily={"$body"} mt="$10" fontSize={"$16"}>
                            {user.email}
                        </Text>
                    </View>

                    {/* Settings Item */}
                    <View mt="$30">
                        <SettingsListItem
                            title="Edit Profile"
                            onPress={() => push("/settings/edit-profile")}
                        />
                        {/* <SettingsListItem
                            title="Notification Preferences"
                            onPress={() => {
                                console.log("Notifications");
                            }}
                        /> */}
                        <SettingsListItem
                            title="FAQs"
                            onPress={() => {
                                Linking.openURL(websiteUrl);
                            }}
                        />
                        <SettingsListItem
                            title="Help and Support Center"
                            onPress={() => {
                                Linking.openURL(websiteUrl);
                            }}
                        />
                    </View>
                    <View mt="$20">
                        <Button
                            text="Retake Assessment"
                            fullWidth
                            onPress={() => {
                                replace("/assessment");
                            }}
                        />
                    </View>

                    <View mt="$30">
                        <View
                            animation={"medium"}
                            pressStyle={{
                                opacity: 0.85,
                                scale: 0.985,
                            }}
                            onPress={() => {
                                Linking.openURL(websiteUrl);
                            }}
                        >
                            <Text
                                color="$gold"
                                fontFamily="$heading"
                                fontSize={"$20"}
                                textTransform="uppercase"
                            >
                                About GBG
                            </Text>
                        </View>

                        {/* TODO: Re-add App Store rating link when published */}
                        {/* <View mt="$10" fd="row">
                            <Text
                                color="$gold"
                                fontFamily="$heading"
                                fontSize={"$20"}
                                textTransform="uppercase"
                            >
                                Rate in app store
                            </Text>
                            <View ml="$5" mt={-wn(2)}>
                                <Feather
                                    size={wn(20)}
                                    name="arrow-up-right"
                                    color={colors.gold}
                                />
                            </View>
                        </View> */}
                    </View>
                </View>
                <View px={"$20"} py="$20" mt={"$45"}>
                    <Button
                        text="Logout"
                        secondary_transparent
                        fullWidth
                        onPress={() => {
                            authState?.logout();
                        }}
                    />
                </View>
            </ScrollView>
        </Stack>
    );
}
