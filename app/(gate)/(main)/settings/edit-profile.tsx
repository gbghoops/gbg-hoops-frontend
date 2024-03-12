import PageError from "@src/components/screen-components/PageError/PageError";
import SettingsHeader from "@src/components/screen-components/Settings/SettingsHeader";
import { useUser } from "@src/context/UserContext/user-context";
import { Stack } from "expo-router";
import { ScrollView, Stack as TStack, Text, View } from "tamagui";

function EditProfile() {
    const { user } = useUser();

    if (!user) return <PageError returnPath="/settings" />;

    const firstName = user.given_name;
    const lastName = user.family_name;
    const dateOfBirth = user.birthdate;

    return (
        <TStack f={1} pos="relative">
            <ScrollView f={1} showsVerticalScrollIndicator={false}>
                <View mx="$20" mt="$20">
                    <Text
                        fontSize={"$30"}
                        fontFamily={"$heading"}
                        textTransform="uppercase"
                    >
                        Edit Profile
                    </Text>
                </View>
            </ScrollView>
        </TStack>
    );
}

export default EditProfile;
