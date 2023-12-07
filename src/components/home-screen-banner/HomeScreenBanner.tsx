import { PropsWithChildren, useState } from "react";
import { View } from "tamagui";

interface HomeScreenBannerProps extends PropsWithChildren {
    onPress?: () => void;
}

export default function HomeScreenBanner({
    onPress,
    children,
}: HomeScreenBannerProps) {
    const [bannerHeight, setBannerHeight] = useState<number>(0);

    return (
        <View
            bc="$surface_primary"
            onLayout={(layout) => {
                setBannerHeight(layout.nativeEvent.layout.height);
            }}
            mt={-(bannerHeight / 1.75)}
            onPress={onPress}
            animation={"medium"}
            pressStyle={{
                scale: 0.95,
                opacity: 0.85,
            }}
        >
            {children}
        </View>
    );
}
