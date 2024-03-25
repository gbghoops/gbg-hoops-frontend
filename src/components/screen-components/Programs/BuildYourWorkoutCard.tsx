import { useState } from "react";
import Button from "@src/components/button/Button";
import { Text, View } from "tamagui";

import BeginBuildYourWorkoutSheet from "./BuildYourWorkoutActionSheets/BeginBuildYourWorkoutSheet";

interface BuildYoutWorkoutCardProps {
    isFreeUser?: boolean;
}

const BuildYourWorkoutCard = ({
    isFreeUser = false,
}: BuildYoutWorkoutCardProps) => {
    const [isSheetOpen, setSheetOpen] = useState(false);

    return (
        <View mx="$20" pos="relative" backgroundColor="$surface_primary">
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
                    <Button
                        text="BUILD YOUR WORKOUT"
                        onPress={() => setSheetOpen(true)}
                    />
                </View>
            </View>

            <BeginBuildYourWorkoutSheet
                sheetOpen={isSheetOpen}
                setSheetOpen={setSheetOpen}
                isFreeUser={isFreeUser}
            />
        </View>
    );
};

export default BuildYourWorkoutCard;
