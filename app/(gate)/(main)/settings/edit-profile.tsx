import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import PageError from "@src/components/screen-components/PageError/PageError";
import DateOfBirthSelectModal from "@src/components/screen-components/Settings/DateOfBirthSelectModal";
import {
    FieldType,
    TitledTextField,
} from "@src/components/titled-text-field/TitledTextField";
import { useUser } from "@src/context/UserContext/user-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import dayjs from "dayjs";
import { Stack as TStack, Text, View } from "tamagui";

function EditProfile() {
    const { user } = useUser();
    const [firstName, setFirstName] = useState<string>(user?.given_name ?? "");
    const [lastName, setLastName] = useState<string>(user?.family_name ?? "");
    const [dateOfBirth, setDateOfBirth] = useState<string>(
        user?.birthdate ? dayjs(user.birthdate).format("YYYY-MM-DD") : "",
    );
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const { bottom } = useSafeAreaInsets();

    if (!user) return <PageError returnPath="/settings" />;

    console.log("dateOfBirth", dateOfBirth);

    const canProceed = !!(firstName && lastName && dateOfBirth);

    return (
        <TStack f={1} pos="relative">
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View mx="$20" mt="$20">
                    <Text
                        fontSize={"$30"}
                        fontFamily={"$heading"}
                        textTransform="uppercase"
                    >
                        Edit Profile
                    </Text>
                </View>
                <View mx="$20" mt="$30">
                    <Text fontFamily={"$heading"} fontSize="$20">
                        Personal Info
                    </Text>
                    <View mt="$10">
                        <TitledTextField
                            title="First Name"
                            type={FieldType.TEXT}
                            value={firstName}
                            placeholder="Enter your first name"
                            handleChange={(text) => setFirstName(text)}
                        />
                    </View>
                    <View mt="$10">
                        <TitledTextField
                            title="Last Name"
                            type={FieldType.TEXT}
                            value={lastName}
                            placeholder="Enter your first name"
                            handleChange={(text) => setLastName(text)}
                        />
                    </View>
                    <View mt="$10">
                        <DateSelectorTrigger
                            date={dateOfBirth}
                            onPress={() => {
                                setShowDatePicker(true);
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <View
                position="absolute"
                zIndex={10}
                bottom={bottom ? bottom + wn(20) : wn(50)}
                px={"$20"}
                width={"100%"}
            >
                <Button
                    text="Update Profile"
                    isDisabled={!canProceed}
                    onPress={() => {}}
                    fullWidth
                />
            </View>
            <DateOfBirthSelectModal
                isVisible={showDatePicker}
                setIsVisible={setShowDatePicker}
                dateOfBirth={dateOfBirth}
                setDateOfBirth={setDateOfBirth}
            />
        </TStack>
    );
}

interface DateSelectorTriggerProps {
    onPress: () => void;
    date: string;
}
const DateSelectorTrigger = ({ date, onPress }: DateSelectorTriggerProps) => {
    return (
        <View
            borderWidth={1}
            borderColor="$gold"
            p="$10"
            animation="medium"
            pressStyle={{
                opacity: 0.75,
                scale: 0.985,
            }}
            onPress={onPress}
        >
            <Text fontFamily={"$body"} fontSize="$14">
                Date of Birth
            </Text>
            <Text fontFamily={"$body"} mt={wn(8)} fontSize="$16">
                {date}
            </Text>
        </View>
    );
};

export default EditProfile;
