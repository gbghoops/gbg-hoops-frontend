import { useState } from "react";
import { FlashList } from "@shopify/flash-list";

import { RecommendedPrograms } from "./recommended-programs";
import RecommendedProgramCard from "./RecommendedProgramCard";

const RenderRecommendedProgramCard = () => {
    const [visibleIndicies, setVisibleIndicies] = useState<number[]>([]);

    return (
        <FlashList
            data={RecommendedPrograms}
            extraData={{ visibleIndicies }}
            horizontal
            estimatedItemSize={220}
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
                    isLastItem={index === RecommendedPrograms.length - 1}
                    {...item}
                />
            )}
        />
    );
};

export default RenderRecommendedProgramCard;
