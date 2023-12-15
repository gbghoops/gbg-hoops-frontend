import Button from "@src/components/button/Button";
import { Sheet, Text, View } from "tamagui";

interface AddExerciseSheetProps {
    sheetOpen: boolean;
    setSheetOpen: (open: boolean) => void;
}
const AddExerciseSheet = ({
    sheetOpen,
    setSheetOpen,
}: AddExerciseSheetProps) => {
    return (
        <Sheet
            forceRemoveScrollEnabled={sheetOpen}
            modal={true}
            open={sheetOpen}
            snapPointsMode="fit"
            onOpenChange={setSheetOpen}
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
                    pressStyle={{
                        opacity: 1,
                    }}
                />
                <View my={"$20"} px={"$20"}>
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$24"}
                        textTransform="uppercase"
                        textAlign="left"
                    >
                        Add an Exercise
                    </Text>
                    <View mt="$30" mb="$10" width={"100%"}>
                        <Button
                            text="CANCEL"
                            fullWidth
                            secondary_transparent
                            onPress={() => {
                                setSheetOpen(false);
                            }}
                        />
                    </View>
                </View>
            </Sheet.Frame>
        </Sheet>
    );
};

export default AddExerciseSheet;
