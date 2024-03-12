import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Octicons } from "@expo/vector-icons";
import Button from "@src/components/button/Button";
import PageError from "@src/components/screen-components/PageError/PageError";
import { useAuthState } from "@src/context/auth-context";
import { useUser } from "@src/context/UserContext/user-context";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Stack as RouterStack, useRouter } from "expo-router";
import { ScrollView, Stack, Text, View } from "tamagui";

export default function SettingsScreen() {
    const authState = useAuthState();
    const userContext = useUser();
    const { bottom } = useSafeAreaInsets();
    const { replace } = useRouter();

    if (!userContext || !userContext.user) return <PageError />;

    const { user } = userContext;

    const fullName = `${user.given_name} ${user.family_name}`;

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
                            onPress={() => {
                                console.log("Account");
                            }}
                        />
                        <SettingsListItem
                            title="Notification Preferences"
                            onPress={() => {
                                console.log("Notifications");
                            }}
                        />
                        <SettingsListItem
                            title="FAQs"
                            onPress={() => {
                                console.log("Privacy");
                            }}
                        />
                        <SettingsListItem
                            title="Help and Support Center"
                            onPress={() => {
                                console.log("Security");
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
                        <Text
                            color="$gold"
                            fontFamily="$heading"
                            fontSize={"$20"}
                            textTransform="uppercase"
                            animation={"medium"}
                            pressStyle={{
                                opacity: 0.85,
                                scale: 0.985,
                            }}
                        >
                            About GBG
                        </Text>
                        <View mt="$10" fd="row">
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
                        </View>
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

interface SettingsListItemProps {
    title: string;
    onPress: () => void;
}

const SettingsListItem = ({ title, onPress }: SettingsListItemProps) => {
    return (
        <View
            w={"100%"}
            py="$18"
            borderBottomWidth={0.5}
            borderBottomColor="$border_primary"
            flexDirection="row"
            ai="center"
            animation={"medium"}
            pressStyle={{
                opacity: 0.85,
                scale: 0.985,
            }}
            onPress={onPress}
        >
            <Text fontFamily={"$heading"} fontSize={"$20"}>
                {title}
            </Text>
            <View ml="auto">
                <Octicons
                    name="chevron-right"
                    size={wn(26)}
                    color={colors.gold}
                />
            </View>
        </View>
    );
};

interface SettingsHeaderProps {
    showBackButton?: boolean;
}

const SettingsHeader = ({ showBackButton = false }: SettingsHeaderProps) => {
    const { top } = useSafeAreaInsets();
    const { back, replace } = useRouter();

    return (
        <View
            ac="center"
            ai={"center"}
            justifyContent="space-between"
            height={wn(60) + top}
            fd={"row"}
            paddingTop={top}
            paddingHorizontal={"$20"}
            backgroundColor={"$surface_background"}
        >
            {showBackButton ? (
                <View
                    width={"$36"}
                    height={"$36"}
                    animation={"slow"}
                    onPress={back}
                    pressStyle={{
                        opacity: 0.15,
                        scale: 0.95,
                    }}
                >
                    <Octicons name="arrow-left" size={36} color={colors.gold} />
                </View>
            ) : null}
            <View
                ml="auto"
                w="$40"
                h="$40"
                animation="medium"
                pressStyle={{
                    opacity: 0.85,
                    scale: 0.985,
                }}
                onPress={() => replace("/home")}
            >
                <Octicons name="x" size={36} color={colors.gold} />
            </View>
        </View>
    );
};
