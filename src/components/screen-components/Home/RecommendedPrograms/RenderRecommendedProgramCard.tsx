import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";

import RecommendedProgramCard from "./RecommendedProgramCard";

const RenderRecommendedProgramCard = () => {
    const [visibleIndicies, setVisibleIndicies] = useState<number[]>([]);
    const { programs } = usePrograms();

    if (!programs || !programs.length) {
        return null;
    }

    const recommendedPrograms = programs.slice(0, 5);

    return (
        <FlashList
            data={recommendedPrograms}
            extraData={{ visibleIndicies }}
            horizontal
            estimatedItemSize={wn(220)}
            onViewableItemsChanged={({ viewableItems }) => {
                const visibleIndicies = viewableItems.map(
                    ({ index, isViewable }) => (isViewable ? index : null),
                ) as number[];

                setVisibleIndicies(visibleIndicies);
            }}
            showsHorizontalScrollIndicator={false}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 80,
            }}
            renderItem={({ item, index }) => (
                <RecommendedProgramCard
                    isVisible={visibleIndicies.includes(index)}
                    renderIndex={index}
                    isLastItem={index === programs.length - 1}
                    video={item.teaser}
                    programTitle={item.name}
                    slug={item.slug}
                    id={index}
                />
            )}
        />
    );
};

export default RenderRecommendedProgramCard;
