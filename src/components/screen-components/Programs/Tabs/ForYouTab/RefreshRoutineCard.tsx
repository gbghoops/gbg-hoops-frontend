import Button from "@src/components/button/Button";
import { useRouter } from "expo-router";
import { Text, View } from "tamagui";

const RefreshRoutineCard = () => {
    const router = useRouter();
    return (
        <View mt="$20" px="$20">
            <View backgroundColor="$surface_primary" py="$20" px="$15" pb="$30">
                <Text
                    textTransform="uppercase"
                    textAlign="center"
                    fontSize="$24"
                    fontFamily="$heading"
                    my="$10"
                >
                    Need to refresh your routine?
                </Text>
                <Text
                    textAlign="center"
                    fontFamily="$body"
                    fontSize="$16"
                    lineHeight={22}
                    px="$20"
                >
                    {`Retake your performance assessment to unlock new recommendations for your training.`}
                </Text>
                <View fd="row" jc="center" mt="$20">
                    <Button
                        text="RETAKE ASSESSMENT"
                        onPress={() => {
                            router.replace("/assessment");
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default RefreshRoutineCard;
