import React from "react";
import { Dimensions, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized } from "@src/utils/normalize-dimensions";
import {
    MotiTransitionProp,
    StyleValueWithReplacedTransforms,
    View as MotiView,
} from "moti";
import { Text, View } from "tamagui";

import { tabBarRoutes } from "@/src/constants/tab-bar-routes";

const WINDOW_WIDTH = Dimensions.get("window").width;
const TAB_ITEM_WIDTH = (WINDOW_WIDTH / 4) * 0.45;

const TabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    const { bottom } = useSafeAreaInsets();
    const indicatorTransition: MotiTransitionProp<
        StyleValueWithReplacedTransforms<ViewStyle>
    > = {
        type: "spring",
        mass: 1.5,
        damping: 30,
        stiffness: 320,
        delay: 100,
    };

    return (
        <View
            height={widthNormalized(70)}
            backgroundColor={"$transparent"}
            flexDirection={"row"}
            justifyContent={"center"}
            position="absolute"
            bottom={bottom + widthNormalized(10)}
            left={0}
            right={0}
            width={"100%"}
        >
            <View
                zIndex={3}
                width={"95%"}
                flexDirection="row"
                backgroundColor={"$surface_primary"}
                borderRadius={widthNormalized(15)}
                position="relative"
            >
                {state.routes
                    .filter((route) => {
                        if (tabBarRoutes.includes(route.name)) {
                            return route;
                        }
                        return null;
                    })
                    .map((route, index) => {
                        const { options } = descriptors[route.key];

                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : route.name;

                        const icon = options.tabBarIcon;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: "tabPress",
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        return (
                            <View
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                                width={"100%"}
                                height={"100%"}
                                position="relative"
                                zIndex={1}
                                key={route.key}
                                onPress={onPress}
                                animation={"medium"}
                                pressStyle={{
                                    opacity: 0.6,
                                }}
                            >
                                <View
                                    flex={1}
                                    alignItems="center"
                                    justifyContent="center"
                                    opacity={isFocused ? 1 : 0.75}
                                >
                                    {icon &&
                                        icon({
                                            focused: isFocused,
                                            size: 24,
                                            color: isFocused
                                                ? colors.gold
                                                : colors.white,
                                        })}
                                    <Text
                                        fontFamily={"$heading"}
                                        marginTop={5}
                                        color={
                                            isFocused
                                                ? colors.gold
                                                : colors.white
                                        }
                                    >
                                        {label as string}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                {/* Background gradient */}
                <MotiView
                    from={{
                        translateX: 0,
                    }}
                    animate={{
                        translateX: deriveGradientPosition(state.index),
                    }}
                    transition={{ ...indicatorTransition }}
                    style={{
                        position: "absolute",
                        width: TAB_ITEM_WIDTH,
                        top: 0,
                        height: widthNormalized(4),
                        zIndex: 2,
                        left: TAB_ITEM_WIDTH * 0.5,
                    }}
                >
                    <View h={widthNormalized(4)} backgroundColor={"$gold"} />
                </MotiView>
            </View>
        </View>
    );
};

const deriveGradientPosition = (index: number) => {
    return WINDOW_WIDTH * 0.95 * (index / 4);
};

export default TabBar;
