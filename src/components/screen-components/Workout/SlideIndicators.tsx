import { View } from "tamagui";

interface SlideIndicatorsProps {
    totalSlides: number;
    currentSlideIndex: number;
}
const SlideIndicators = ({
    totalSlides,
    currentSlideIndex,
}: SlideIndicatorsProps) => {
    return (
        <View fd="row" width={"100%"}>
            {Array.from({ length: totalSlides }).map((_, _index) => (
                <View
                    f={1}
                    key={_index}
                    pr={_index + 1 !== totalSlides ? `$10` : "0%"}
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
                            width={`${_index <= currentSlideIndex ? 100 : 0}%`}
                        />
                    </View>
                </View>
            ))}
        </View>
    );
};

export default SlideIndicators;
