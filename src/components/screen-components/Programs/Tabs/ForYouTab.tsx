import { Tabs } from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { View } from "tamagui";

import BuildYoutWorkoutCards from "../BuildYourWorkoutCard";

export const ForYouTab = () => {
    const { bottom } = useSafeAreaInsets();

    return (
        <Tabs.ScrollView style={{ flex: 1, minHeight: "100%" }}>
            <View f={1} pb={bottom + wn(120)}>
                <BuildYoutWorkoutCards />
            </View>
        </Tabs.ScrollView>
    );
};
