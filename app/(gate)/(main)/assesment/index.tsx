import { useEffect, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import GenderSelectOptions from "@src/components/radio-select/constants/gender-select-options";
import HoopLevelSelectOptions from "@src/components/radio-select/constants/hoop-level-select-options";
import PerformanceGoalSelectOptions from "@src/components/radio-select/constants/performance-goals-options";
import AssesmentHeader from "@src/components/screen-components/Assesment/AssesmentHeader";
import { AssesmentWrapper } from "@src/components/screen-components/Assesment/AssesmentWrapper";
import AssesmentSlide1 from "@src/components/screen-components/Assesment/Slides/AssesmentSlide1";
import AssesmentSlide2, {
    AssesmentSlide2OnChanageProps,
} from "@src/components/screen-components/Assesment/Slides/AssesmentSlide2";
import AssesmentSlide3 from "@src/components/screen-components/Assesment/Slides/AssesmentSlide3";
import {
    EnvironmentsType,
    GenderType,
    HoopLevelType,
    PerformanceGoalType,
} from "@src/context/UserContext/types";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Stack } from "expo-router";
import {
    AnimatePresence,
    ScrollView,
    Text,
    View,
    XStack,
    YStack,
} from "tamagui";

interface AssesmentState {
    selectedGender: GenderType | undefined;
    selectedHoopLevel: HoopLevelType | undefined;
    selectedPerformanceGoal: PerformanceGoalType | undefined;
    environments: EnvironmentsType[] | undefined;
}

const assesmentDefaultState: AssesmentState = {
    selectedGender: undefined,
    selectedHoopLevel: undefined,
    selectedPerformanceGoal: undefined,
    environments: undefined,
};

export default function AssesmentScreen() {
    const [[page, going], setPage] = useState([0, 0]);
    const { bottom } = useSafeAreaInsets();

    const [assesmentState, setAssesmentState] = useState<AssesmentState>(
        assesmentDefaultState,
    );

    const onSlide1ValuesChange = (selectedGenderId: number) => {
        const selectedGender = GenderSelectOptions.find(
            (g) => g.id === selectedGenderId,
        );

        if (selectedGender) {
            setAssesmentState((prev) => ({
                ...prev,
                selectedGender: selectedGender.gender,
            }));
        }
    };

    const onSlide2ValuesChange = ({
        selectedHoopLevelId,
        selectedPerformanceGoalId,
    }: AssesmentSlide2OnChanageProps) => {
        const selectedHoopLevel = HoopLevelSelectOptions.find(
            (g) => g.id === selectedHoopLevelId,
        );

        const selectedPerformanceGoal = PerformanceGoalSelectOptions.find(
            (g) => g.id === selectedPerformanceGoalId,
        );

        setAssesmentState((prev) => ({
            ...prev,
            selectedHoopLevel: selectedHoopLevel?.hoop_level,
            selectedPerformanceGoal: selectedPerformanceGoal?.performance_goal,
        }));
    };

    const onSlide3ValuesChange = (environments: EnvironmentsType[]) => {
        setAssesmentState((prev) => ({
            ...prev,
            environments: environments.length ? environments : undefined,
        }));
    };

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

    const canContinue = useMemo(() => {
        if (page === 0 && !assesmentState.selectedGender) return false;

        if (
            page === 1 &&
            (!assesmentState.selectedHoopLevel ||
                !assesmentState.selectedPerformanceGoal)
        )
            return false;

        if (page === 2 && !assesmentState.environments?.length) return false;

        return true;
    }, [assesmentState, page]);

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
                <ScrollView
                    f={1}
                    width={"100%"}
                    height={"100%"}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
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
                                <View mt="$20" mx="$20">
                                    <View>
                                        <Text
                                            fontFamily={"$heading"}
                                            fontSize="$24"
                                            textTransform="uppercase"
                                        >{`Let us get to know you better`}</Text>
                                        <Text
                                            my="$20"
                                            fontFamily={"$body"}
                                            fontSize="$16"
                                        >
                                            {`Answer a few questions below so we can recommend some programs for you to get you started!`}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    {/* Gender Select slide */}
                                    <AssesmentSlide1
                                        isActiveSlide={page === 0}
                                        onValuesChange={onSlide1ValuesChange}
                                        selectedGender={
                                            assesmentState.selectedGender ??
                                            null
                                        }
                                    />

                                    {/* Hoop Level and Performance goals */}
                                    <AssesmentSlide2
                                        isActiveSlide={page === 1}
                                        onValuesChange={onSlide2ValuesChange}
                                        selectedHoopLevel={
                                            assesmentState.selectedHoopLevel ??
                                            null
                                        }
                                        selectedPerformanceGoal={
                                            assesmentState.selectedPerformanceGoal ??
                                            null
                                        }
                                    />

                                    {/* Environments */}
                                    <AssesmentSlide3
                                        isActiveSlide={page === 2}
                                        onValuesChange={onSlide3ValuesChange}
                                        selectedEnvironments={
                                            assesmentState.environments ?? []
                                        }
                                    />
                                </View>
                            </View>
                        </AssesmentWrapper>
                    </AnimatePresence>
                </ScrollView>
            </XStack>
            <View w="100%" px="$20" pos="absolute" bottom={bottom + wn(20)}>
                <Button
                    text="Continue"
                    fullWidth
                    onPress={() => {
                        canContinue && pageNext();
                    }}
                    isDisabled={!canContinue}
                />
            </View>
        </YStack>
    );
}
