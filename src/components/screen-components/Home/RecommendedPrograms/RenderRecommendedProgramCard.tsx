import { useState } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { FlashList } from "@shopify/flash-list";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";

import RecommendedProgramCard from "./RecommendedProgramCard";

const RenderRecommendedProgramCard = () => {
    const [visibleIndicies, setVisibleIndicies] = useState<number[]>([]);
    const { programs } = usePrograms();

    if (!programs || !programs.length) {
        return null;
    }

    const recommendedPrograms = programs.slice(0, 5);

    return recommendedPrograms?.length > 0 ? (
        <FlashList
            data={recommendedPrograms}
            extraData={{ visibleIndicies }}
            ListEmptyComponent={() => <RecommendedProgramsLoadingSkeleton />}
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
    ) : (
        <RecommendedProgramsLoadingSkeleton />
    );
};

const RecommendedProgramsLoadingSkeleton = () => {
    return (
        <SkeletonPlaceholder
            backgroundColor={colors.surface_primary}
            highlightColor={colors.surface_background}
        >
            <SkeletonPlaceholder.Item
                width={wn(180)}
                height={wn(240)}
                marginRight={wn(20)}
                marginLeft={wn(20)}
                flexDirection="row"
            >
                {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonPlaceholder.Item
                        key={i}
                        width={wn(220)}
                        height={wn(220)}
                        marginRight={wn(20)}
                        style={{
                            backgroundColor: colors.surface_primary,
                        }}
                    />
                ))}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    );
};

export default RenderRecommendedProgramCard;
