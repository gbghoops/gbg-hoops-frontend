import Button from "@src/components/button/Button";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

const WorkoutPageError = () => {
    const { back, canGoBack, push } = useRouter();

    return (
        <View
            f={1}
            backgroundColor={"$surface_background"}
            ai={"center"}
            pt="$100"
        >
            <Text
                fontFamily={"$acuminProBold"}
                fontSize="$30"
                textAlign="center"
            >
                Oops! Something Went Wrong!
            </Text>
            <Text
                fontFamily={"$acuminProSemibold"}
                fontSize="$15"
                textAlign="center"
            >
                If this issue persists, please contact support.
            </Text>
            <View mt="$20">
                <Button
                    text="Back to Safety"
                    onPress={() => {
                        return canGoBack() ? back() : push("/programs");
                    }}
                />
            </View>
        </View>
    );
};

export default WorkoutPageError;
