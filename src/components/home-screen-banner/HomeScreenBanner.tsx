import { PropsWithChildren, useState } from "react";
import { View } from "tamagui";

interface HomeScreenBannerProps extends PropsWithChildren {
    onPress?: () => void;
}

export default function HomeScreenBanner({
    onPress,
    children,
}: HomeScreenBannerProps) {
    return (
        <View
            bc="$surface_primary"
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
