import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@src/components/button/Button";
import AssessmentHeader from "@src/components/screen-components/Assessment/AssessmentHeader";
import { AssessmentWrapper } from "@src/components/screen-components/Assessment/AssessmentWrapper";
import ConfirmAssessmentExit from "@src/components/screen-components/Assessment/ConfirmAssessmentComplete";
import AssessmentSlide1 from "@src/components/screen-components/Assessment/Slides/AssessmentSlide1";
import AssessmentSlide2 from "@src/components/screen-components/Assessment/Slides/AssessmentSlide2";
import AssessmentSlide3 from "@src/components/screen-components/Assessment/Slides/AssessmentSlide3";
import AssessmentSlide4 from "@src/components/screen-components/Assessment/Slides/AssessmentSlide4";
import useAssessmentPagingState from "@src/hooks/assessment/useAssessmentPagingState";
import useAssessmentState from "@src/hooks/assessment/useAssessmentState";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Stack, useRouter } from "expo-router";
import {
    AnimatePresence,
    ScrollView,
    Text,
    View,
    XStack,
    YStack,
} from "tamagui";

export default function AssessmentScreen() {
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();

    const { canGoBack, back, replace } = router;

    const {
        assessmentState,
        onSlide1ValuesChange,
        onSlide2ValuesChange,
        onSlide3ValuesChange,
        onSlide4ValuesChange,
        onSubmitAssessment,
        submitLoading,
    } = useAssessmentState();

    const {
        canContinue,
        going,
        page,
        pageBack,
        pageNext,
        showAssessmentExitModal,
        setShowAssessmentExitModal,
    } = useAssessmentPagingState({ assessmentState });

    console.log("SHow exit modal", showAssessmentExitModal);

    const performAssessmentNextAction = async () => {
        if (submitLoading) return;

        if (page === 3) {
            try {
                const res = await onSubmitAssessment();

                if (res) {
                    return router.replace("/home");
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            canContinue && pageNext();
        }
    };

    return (
        <YStack pos="relative">
            <Stack.Screen
                options={{
                    header: () => (
                        <AssessmentHeader onBackPressed={() => pageBack()} />
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
                        <AssessmentWrapper
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
                                    <AssessmentSlide1
                                        isActiveSlide={page === 0}
                                        onValuesChange={onSlide1ValuesChange}
                                        selectedGender={
                                            assessmentState.gender ?? null
                                        }
                                    />

                                    {/* Hoop Level and Performance goals */}
                                    <AssessmentSlide2
                                        isActiveSlide={page === 1}
                                        onValuesChange={onSlide2ValuesChange}
                                        selectedHoopLevel={
                                            assessmentState.hoop_level ?? null
                                        }
                                        selectedPerformanceGoal={
                                            assessmentState.performance_goal ??
                                            null
                                        }
                                    />

                                    {/* Environments */}
                                    <AssessmentSlide3
                                        isActiveSlide={page === 2}
                                        onValuesChange={onSlide3ValuesChange}
                                        selectedEnvironments={
                                            assessmentState.environments ?? []
                                        }
                                    />

                                    {/* Pain Areas */}
                                    <AssessmentSlide4
                                        isActiveSlide={page === 3}
                                        onValuesChange={onSlide4ValuesChange}
                                        selectedPainAreas={
                                            assessmentState.pain_areas ?? []
                                        }
                                    />
                                </View>
                            </View>
                        </AssessmentWrapper>
                    </AnimatePresence>
                </ScrollView>
            </XStack>
            <View w="100%" px="$20" pos="absolute" bottom={bottom + wn(20)}>
                <Button
                    text={page === 3 ? "Complete" : "Continue"}
                    fullWidth
                    loading={submitLoading}
                    onPress={performAssessmentNextAction}
                    isDisabled={!canContinue}
                />
            </View>

            <ConfirmAssessmentExit
                confirmExit={(state) => {
                    if (state) {
                        return canGoBack() ? back() : replace("/home");
                    }
                }}
                open={showAssessmentExitModal}
                onOpenStateChange={(state) => {
                    setShowAssessmentExitModal(state);
                }}
            />
        </YStack>
    );
}
