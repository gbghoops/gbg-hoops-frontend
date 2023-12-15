import { Text, View } from "tamagui";

interface ProgressIndicatorProps {
    totalDays: number;
    currentDay: number;
}
const ProgressIndicator = ({
    totalDays,
    currentDay,
}: ProgressIndicatorProps) => {
    return (
        <View p="$20" backgroundColor="$surface_primary">
            <Text
                ff="$heading"
                fontSize={"$24"}
                mb={"$15"}
            >{`Week ${currentDay}`}</Text>
            {/* Progress Rows */}
            <View fd="row">
                {Array.from({ length: totalDays }).map((_, index) => (
                    <View
                        f={1}
                        key={index}
                        pr={index + 1 !== totalDays ? `$10` : "0"}
                    >
                        <View
                            height={"$5"}
                            width={"100%"}
                            overflow={"hidden"}
                            backgroundColor={"$accent_grey"}
                        >
                            <View
                                height={"100%"}
                                backgroundColor={"$gold"}
                                width={`${index + 1 <= currentDay ? 100 : 0}%`}
                            />
                        </View>
                    </View>
                ))}
            </View>
            <View mt="$15" mb="$5">
                <Text
                    ff="$body"
                    fontSize={"$16"}
                >{`${currentDay} out of ${totalDays} days completed`}</Text>
            </View>
        </View>
    );
};

export default ProgressIndicator;
