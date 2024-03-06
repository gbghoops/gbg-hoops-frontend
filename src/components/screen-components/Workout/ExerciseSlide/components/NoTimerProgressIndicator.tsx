import { useEffect, useState } from "react";
import { colors } from "@src/styles/theme/colors";
import { heightNormalized as hn } from "@src/utils/normalize-dimensions";
import { View as MView } from "moti";
import { Text, View } from "tamagui";
interface NoTimerProgressIndicatorProps {
    isPlaying: boolean;
    isLandscape: boolean;
    onMarkCompleted?: () => void;
}

const NoTimerProgressIndicator = ({
    isPlaying,
    onMarkCompleted,
    isLandscape = false,
}: NoTimerProgressIndicatorProps) => {
    const [markCompleted, setMarkCompleted] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            return;
        }

        setMarkCompleted(true);
    }, [isPlaying]);

    useEffect(() => {
        if (markCompleted) {
            onMarkCompleted && onMarkCompleted();
        }
    }, [markCompleted]);

    return (
        <View
            width={"100%"}
            height={isLandscape ? hn(40) : "$60"}
            backgroundColor={"$surface_primary"}
            overflow="hidden"
            position="relative"
            collapsable={false}
        >
            <View
                position="absolute"
                top={0}
                left={0}
                width={"100%"}
                height={"100%"}
                zIndex={1}
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
            >
                <Text
                    fontFamily={"$heading"}
                    fontSize={"$24"}
                    display="flex"
                    mt={"$2"}
                >
                    {`Go at your own pace!`}
                </Text>
            </View>
            <MView
                key={"stack-progress-bar"}
                style={{
                    backgroundColor: colors.gold,
                    height: "100%",
                    width: "100%",
                }}
            />
        </View>
    );
};

export default NoTimerProgressIndicator;
