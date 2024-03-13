import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import PageError from "@src/components/screen-components/PageError/PageError";
import DateOfBirthSelectModal from "@src/components/screen-components/Settings/DateOfBirthSelectModal";
import { StyledImage } from "@src/components/styled-components";
import {
    FieldType,
    TitledTextField,
} from "@src/components/titled-text-field/TitledTextField";
import { useUser } from "@src/context/UserContext/user-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { fetchAuthSession } from "aws-amplify/auth";
import { toast } from "burnt";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Stack as TStack, Text, View, XStack } from "tamagui";

interface ErrorProps {
    state: boolean;
    message: string;
}
function EditProfile() {
    const { user } = useUser();
    const [firstName, setFirstName] = useState<string>(user?.given_name ?? "");
    const [lastName, setLastName] = useState<string>(user?.family_name ?? "");
    const [dateOfBirth, setDateOfBirth] = useState<string>(
        user?.birthdate ? dayjs(user.birthdate).format("YYYY-MM-DD") : "",
    );
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<ErrorProps | null>(null);
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();

    if (!user) return <PageError returnPath="/settings" />;

    const canProceed = !!(firstName && lastName && dateOfBirth);

    const onSubmit = async () => {
        if (!canProceed) return;

        try {
            setIsSubmitting(true);

            const idToken = (
                await fetchAuthSession()
            ).tokens?.idToken?.toString();

            const response = await fetch(
                `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/me`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${idToken}`,
                    },
                    body: JSON.stringify({
                        given_name: firstName,
                        family_name: lastName,
                        birthdate: dateOfBirth,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to update profile, please try again or contact support",
                );
            }

            toast({
                title: "Profile updated successfully",
                preset: "done",
            });

            return router.replace("/settings");
        } catch (e) {
            if (e instanceof Error) {
                setError({ state: true, message: e.message });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            handleFocus={() => setError(null)}
                            handleChange={(text) => setFirstName(text)}
                        />
                    </View>
                    <View mt="$10">
                        <TitledTextField
                            title="Last Name"
                            type={FieldType.TEXT}
                            value={lastName}
                            handleFocus={() => setError(null)}
                            placeholder="Enter your first name"
                            handleChange={(text) => setLastName(text)}
                        />
                    </View>
                    <View mt="$10">
                        <DateSelectorTrigger
                            date={dateOfBirth}
                            onPress={() => {
                                setError(null);
                                setShowDatePicker(true);
                            }}
                        />
                    </View>
                </View>
                {/* Error container */}
                <View mt={wn(20)} px="$20">
                    {error && error?.state ? (
                        <XStack
                            borderWidth={1}
                            borderColor="$error_primary"
                            py={wn(10)}
                            px={wn(10)}
                            justifyContent="flex-start"
                            alignItems="center"
                            animation={"medium"}
                            enterStyle={{
                                opacity: 0,
                                y: 10,
                            }}
                            exitStyle={{
                                opacity: 0,
                                y: -10,
                            }}
                        >
                            <View w={wn(24)} h={wn(24)} jc="center" ai="center">
                                <StyledImage
                                    source={require("@assets/icon/error.png")}
                                />
                            </View>
                            <View f={1} ml={wn(5)}>
                                <Text
                                    fontFamily={"$body"}
                                    fontSize={wn(17)}
                                    lineHeight={wn(18)}
                                >
                                    {error.message}
                                </Text>
                            </View>
                        </XStack>
                    ) : null}
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
                    onPress={onSubmit}
                    fullWidth
                    loading={isSubmitting}
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
