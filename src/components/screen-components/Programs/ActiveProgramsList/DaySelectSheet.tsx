import { Sheet, Text, View } from "tamagui";

interface DaySelectSheetProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const DaySelectSheet = ({ isVisible, setIsVisible }: DaySelectSheetProps) => {
    return (
        <Sheet
            modal
            zIndex={100_000}
            animation="fast"
            snapPointsMode="fit"
            open={isVisible}
            onOpenChange={setIsVisible}
        >
            <Sheet.Overlay
                animation="slow"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
                backgroundColor={"rgba(20,20,20,0.75)"}
            />
            {/* Day Select Sheet Content */}
            <Sheet.Frame padding="$10" backgroundColor={"$surface_primary"}>
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
                <View my={"$20"}>
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$24"}
                        textTransform="uppercase"
                        textAlign="center"
                    >
                        Select the Day and Week you want to jump tow
                    </Text>
                    <View mt="$30" width={"100%"}></View>
                </View>
            </Sheet.Frame>
        </Sheet>
    );
};

export default DaySelectSheet;
