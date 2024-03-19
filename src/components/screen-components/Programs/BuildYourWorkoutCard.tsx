import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "@src/components/button/Button";
import { Text, View } from "tamagui";

interface BuildYoutWorkoutCardProps {
    isLocked?: boolean;
}

const BuildYoutWorkoutCard = ({
    isLocked = false,
}: BuildYoutWorkoutCardProps) => (
    <View mx="$20" pos="relative" backgroundColor="$surface_primary">
        {isLocked ? (
            <View
                width={"100%"}
                height={"100%"}
                pos="absolute"
                zIndex={2}
                backgroundColor={"$surface_primary_transparent"}
                jc="center"
                ai="center"
            >
                <View width="$24" height="$24">
                    <MaterialCommunityIcons
                        name="lock-outline"
                        color="white"
                        size={24}
                    />
                </View>
            </View>
        ) : null}
        <View py="$20" px="$15" pb="$30" position="relative" zIndex={0}>
            <Text
                textTransform="uppercase"
                textAlign="center"
                fontSize="$24"
                fontFamily="$heading"
                my="$10"
            >
                Build your own workout
            </Text>
            <Text
                textAlign="center"
                fontFamily="$body"
                fontSize="$16"
                lineHeight={22}
                px="$20"
            >
                {`Hoopers harness the strength of personalized workouts to match their vibe. Adjust them accordingly to the demands of the season, how your body feels, or your performance goals. It's like having your own game plan to dominate your opps.`}
            </Text>
            <View fd="row" jc="center" mt="$20">
                <Button text="BUILD YOUR WORKOUT" />
            </View>
        </View>
    </View>
);

export default BuildYoutWorkoutCard;
