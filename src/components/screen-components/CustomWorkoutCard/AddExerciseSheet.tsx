import { useState } from "react";
import { AvoidSoftInputView } from "react-native-avoid-softinput";
import { useExerciseList } from "@src/hooks/exercise-list/useExerciseList";
import { debounce, Sheet, Text, View } from "tamagui";

interface AddExerciseSheetProps {
    open: boolean;
    onOpenStateChange: (open: boolean) => void;
}

const AddExerciseSheet = ({
    open,
    onOpenStateChange,
}: AddExerciseSheetProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const {
        exercises = [],
        fetchNextPage,
        hasNextPage,
        isLoading,
        refetch,
        isFetching,
    } = useExerciseList({
        searchTerm,
    });

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

    return (
        <Sheet
            forceRemoveScrollEnabled={open}
            modal={true}
            open={open}
            snapPointsMode="fit"
            onOpenChange={onOpenStateChange}
            dismissOnSnapToBottom
            zIndex={100_000}
            animation="fast"
        >
            <Sheet.Overlay
                animation="slow"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
                backgroundColor={"rgba(20,20,20,0.75)"}
            />
            <AvoidSoftInputView>
                <Sheet.Frame
                    padding="$10"
                    space="$5"
                    backgroundColor={"$surface_primary"}
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
                    <View my={"$20"} px={"$20"}>
                        <Text
                            fontFamily={"$heading"}
                            fontSize={"$24"}
                            textTransform="uppercase"
                            textAlign="left"
                        >
                            Add Exercise
                        </Text>
                        <Text
                            fontFamily={"$heading"}
                            fontSize={"$16"}
                            textTransform="uppercase"
                            textAlign="left"
                        >
                            Exercise Name
                        </Text>
                    </View>
                </Sheet.Frame>
            </AvoidSoftInputView>
        </Sheet>
    );
};

export default AddExerciseSheet;
