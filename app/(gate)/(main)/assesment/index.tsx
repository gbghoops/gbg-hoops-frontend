import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import AssesmentHeader from "@src/components/screen-components/Assesment/AssesmentHeader";
import { AssesmentWrapper } from "@src/components/screen-components/Assesment/AssesmentWrapper";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Stack } from "expo-router";
import { AnimatePresence, Text, View, XStack, YStack } from "tamagui";
export default function AssesmentScreen() {
    const [[page, going], setPage] = useState([0, 0]);
    const { bottom } = useSafeAreaInsets();

    const NUM_PAGES = 4;

    const pageNext = () => {
        setPage((prev) => {
            if (prev[0] === NUM_PAGES - 1) return prev;

            return [prev[0] + 1, 1];
        });
    };

    const pageBack = () => {
        setPage((prev) => {
            if (prev[0] === 0) return prev;

            return [prev[0] - 1, -1];
        });
    };

    return (
        <YStack pos="relative">
            <Stack.Screen
                options={{
                    header: () => (
                        <AssesmentHeader onBackPressed={() => pageBack()} />
                    ),
                }}
            />
            <XStack
                overflow="hidden"
                position="relative"
                height="100%"
                width="100%"
                alignItems="center"
            >
                <AnimatePresence initial={false} custom={{ going }}>
                    <AssesmentWrapper
                        key={page}
                        going={going}
                        animation={"fast"}
                    >
                        <View
                            width="100%"
                            height="100%"
                            backgroundColor={"$surface_background"}
                        >
                            <Text>Assesment Screen {page}</Text>
                        </View>
                    </AssesmentWrapper>
                </AnimatePresence>
            </XStack>
            <View
                w="100%"
                px="$20"
                pos="absolute"
                borderWidth={1}
                borderColor={"red"}
                bottom={bottom + wn(20)}
            >
                <Button text="Next" fullWidth onPress={pageNext} />
            </View>
        </YStack>
    );
}
