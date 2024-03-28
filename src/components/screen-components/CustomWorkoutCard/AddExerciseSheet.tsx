import { useState } from "react";
import { ActivityIndicator, Keyboard } from "react-native";
import { AvoidSoftInputView } from "react-native-avoid-softinput";
import { Octicons } from "@expo/vector-icons";
import { CachedImage } from "@georstat/react-native-image-cache";
import { FlashList } from "@shopify/flash-list";
import Button from "@src/components/button/Button";
import {
    FieldType,
    TitledTextField,
} from "@src/components/titled-text-field/TitledTextField";
import { Exercise, ProgramActivity } from "@src/context/ProgramsContext/types";
import useCustomWorkout from "@src/hooks/custom-workout/useCustomWorkout";
import useCustomWorkouts from "@src/hooks/custom-workout/useCustomWorkouts";
import { useExerciseList } from "@src/hooks/exercise-list/useExerciseList";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { toast } from "burnt";
import { useRouter } from "expo-router";
import {
    debounce,
    Sheet,
    styled,
    Text,
    useWindowDimensions,
    View,
} from "tamagui";

interface AddExerciseSheetProps {
    open: boolean;
    name: string;
    workoutId: string;
    exercises: ProgramActivity[];
    onOpenStateChange: (open: boolean) => void;
}

const AddExerciseSheet = ({
    open,
    name,
    workoutId,
    exercises: customWorkoutExercises,
    onOpenStateChange,
}: AddExerciseSheetProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
    const {
        exercises = [],
        fetchNextPage,
        hasNextPage,
        isLoading: isExerciseListLoading,
        refetch,
        isFetching: isExerciseListFetching,
    } = useExerciseList({
        searchTerm,
    });

    const { updateCustomWorkout, updateCustomWorkoutPending } =
        useCustomWorkout(workoutId);

    const { fetchCustomWorkouts } = useCustomWorkouts();

    const { height } = useWindowDimensions();
    const router = useRouter();

    const loadNextPage = async () => {
        if (hasNextPage) {
            await fetchNextPage();
        }
    };

    const refetchOnchange = debounce(async () => {
        await refetch();
    }, 300);

    const onChange = (text: string) => {
        setSearchTerm(text);

        refetchOnchange();
    };

    // TODO: Implement add functionality complete with loading state

    const handleExerciseAdd = async () => {
        if (!selectedExercises.length) return;

        const activities: Exercise[] = selectedExercises
            .map((id) => {
                return exercises.find(
                    (exercise) => exercise.contentful_id === id,
                );
            })
            .filter(
                (exercise) => !!exercise || exercise !== undefined,
            ) as Exercise[];

        try {
            await updateCustomWorkout({
                workout_id: workoutId,
                name,
                activities: [...customWorkoutExercises, ...activities].flat(),
            });

            await fetchCustomWorkouts();

            onOpenStateChange(false);

            setTimeout(() => {
                router.push(`/custom-workouts/${workoutId}`);
            }, 300);
        } catch (e) {
            return toast({
                title: "We were unable to add the exercises to this workout.",
                preset: "error",
                message: "Please try again later.",
            });
        }
    };

    const isListLoading = isExerciseListLoading || isExerciseListFetching;

    return (
        <Sheet
            forceRemoveScrollEnabled={open}
            modal={true}
            open={open}
            snapPointsMode="fit"
            disableDrag
            onOpenChange={onOpenStateChange}
            dismissOnSnapToBottom={true}
            zIndex={100_000}
            animation="fast"
        >
            <Sheet.Overlay
                animation="slow"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
                backgroundColor={"$modal_overlay"}
            />
            {updateCustomWorkoutPending ? <LoadingScreenSection /> : null}
            <AvoidSoftInputView>
                <Sheet.Frame
                    padding="$10"
                    paddingBottom={0}
                    space="$5"
                    backgroundColor={"$surface_primary"}
                    position="relative"
                    onPress={Keyboard.dismiss}
                >
                    <Sheet.Handle
                        mb="$10"
                        height={"$4"}
                        width={"$80"}
                        mx="auto"
                        backgroundColor={"rgb(220, 220, 220)"}
                        opacity={0.35}
                        animation={"fast"}
                    />
                    <View my={"$20"} position="relative">
                        <View px="$5">
                            <Text
                                fontFamily={"$heading"}
                                fontSize={"$24"}
                                textTransform="uppercase"
                                textAlign="left"
                            >
                                Add Exercise
                            </Text>
                            <View fd="row" jc="flex-end" py={"$10"}>
                                <View f={1} height={"$54"}>
                                    <TitledTextField
                                        key={"search-field"}
                                        title={"Search"}
                                        type={FieldType.TEXT}
                                        height={wn(54)}
                                        value={searchTerm}
                                        placeholder="e.g Deadlift..."
                                        handleChange={onChange}
                                        maxCharacters={128}
                                    />
                                </View>
                            </View>
                        </View>
                        <View height={height * 0.65}>
                            <FlashList
                                data={exercises}
                                onEndReached={loadNextPage}
                                refreshing={isExerciseListLoading}
                                showsVerticalScrollIndicator={false}
                                estimatedItemSize={wn(136.3)}
                                ListHeaderComponent={
                                    <ListHeaderComponent
                                        isLoading={isListLoading}
                                    />
                                }
                                contentContainerStyle={{
                                    paddingHorizontal: wn(5),
                                }}
                                ListEmptyComponent={
                                    !isExerciseListLoading ? (
                                        <ListEmptyComponent />
                                    ) : null
                                }
                                renderItem={({ item }) => (
                                    <AddExerciseItem
                                        exercise={item}
                                        isExerciseSelected={selectedExercises.includes(
                                            item.contentful_id,
                                        )}
                                        onPress={() => {
                                            if (
                                                selectedExercises.includes(
                                                    item.contentful_id,
                                                )
                                            ) {
                                                return setSelectedExercises(
                                                    selectedExercises.filter(
                                                        (id) =>
                                                            id !==
                                                            item.contentful_id,
                                                    ),
                                                );
                                            }

                                            setSelectedExercises([
                                                ...selectedExercises,
                                                item.contentful_id,
                                            ]);
                                        }}
                                    />
                                )}
                            />
                        </View>
                        <View
                            position="absolute"
                            zIndex={10}
                            bottom={wn(20)}
                            width={"100%"}
                            jc={"center"}
                            ai={"center"}
                        >
                            <View fd="row" jc="flex-end" w="70%">
                                <Button
                                    text={`Add ${selectedExercises.length ? selectedExercises.length : ""} Exercise${
                                        selectedExercises.length > 1 ? "s" : ""
                                    }`}
                                    isDisabled={selectedExercises.length === 0}
                                    onPress={handleExerciseAdd}
                                    loading={updateCustomWorkoutPending}
                                    fullWidth
                                />
                            </View>
                        </View>
                    </View>
                </Sheet.Frame>
            </AvoidSoftInputView>
        </Sheet>
    );
};

const LoadingScreenSection = () => {
    return (
        <View
            top={0}
            left={0}
            w="100%"
            h="100%"
            backgroundColor={"$modal_overlay"}
            jc={"center"}
            ai={"center"}
            pos={"absolute"}
            zIndex={100_000}
        >
            <ActivityIndicator size="small" color={colors.gold} />
        </View>
    );
};

interface ListHeaderComponentProps {
    isLoading: boolean;
}
const ListHeaderComponent = ({ isLoading }: ListHeaderComponentProps) => {
    return (
        <View>
            {isLoading ? (
                <ActivityIndicator size="small" color={colors.gold} />
            ) : null}
        </View>
    );
};

interface AddExerciseItemProps {
    exercise: Exercise;
    isExerciseSelected: boolean;
    onPress: (selected: boolean) => void;
}
const AddExerciseItem = ({
    exercise,
    isExerciseSelected,
    onPress,
}: AddExerciseItemProps) => {
    return (
        <View
            fd="row"
            ai="center"
            py="$15"
            animation={"fast"}
            pressStyle={{
                opacity: 0.75,
                scale: 0.995,
            }}
            onPress={() => onPress(!isExerciseSelected)}
        >
            <View width={wn(60)} height={wn(60)}>
                <CachedImage
                    source={`http:${exercise.thumbnail}`}
                    loadingImageComponent={() => (
                        <ActivityIndicator size="small" color={colors.gold} />
                    )}
                    style={{
                        width: wn(60),
                        height: wn(60),
                    }}
                />
            </View>
            <Text
                fontFamily={"$heading"}
                color={"$gold"}
                fontSize={"$16"}
                lineHeight={20}
                numberOfLines={2}
                textOverflow="ellipsis"
                flexShrink={1}
                maxWidth={"65%"}
                ml="$10"
            >
                {exercise.name}
            </Text>
            <View ml="auto">
                <Checkbox isSelected={isExerciseSelected} w="$15" h="$15">
                    {isExerciseSelected ? (
                        <Octicons name="check" size={10} color="black" />
                    ) : null}
                </Checkbox>
            </View>
        </View>
    );
};

const ListEmptyComponent = () => {
    return (
        <View
            p="$20"
            borderRadius="$10"
            backgroundColor={"rgba(80, 80, 80, 0.25)"}
            borderWidth={0.25}
            borderColor={"rgba(250, 250, 250, 0.5)"}
            jc={"center"}
            ai={"center"}
            h={wn(200)}
        >
            <View mb={"$10"}>
                <Octicons name="search" size={wn(30)} color={colors.gold} />
            </View>
            <Text fontSize={"$20"} fontFamily={"$heading"} color={"$gold"}>
                No exercises found
            </Text>
        </View>
    );
};

export const Checkbox = styled(View, {
    width: wn(24),
    height: wn(24),
    borderCurve: "circular",
    borderRadius: wn(4),
    borderWidth: wn(1),
    borderColor: "$gold",
    backgroundColor: "$transparent",
    justifyContent: "center",
    alignItems: "center",
    animation: "fast",
    variants: {
        isSelected: {
            true: {
                backgroundColor: "$gold",
                borderColor: "$gold",
            },
        },
    },
});

export default AddExerciseSheet;
