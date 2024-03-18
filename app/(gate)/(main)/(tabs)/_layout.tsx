import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Header } from "@src/components/stack-header/StackHeader";
import { CommunityIcon } from "@src/components/tab-bar/tab-icons/CommunityIcon";
import { HomeIcon } from "@src/components/tab-bar/tab-icons/HomeIcon";
import { MoreIcon } from "@src/components/tab-bar/tab-icons/MoreIcon";
import { ProgramsIcon } from "@src/components/tab-bar/tab-icons/ProgramsIcon";
import TabBar from "@src/components/tab-bar/TabBar";
import { User } from "@src/context/UserContext/types";
import { useUser } from "@src/context/UserContext/user-context";
import { colors } from "@src/styles/theme/colors";
import { Tabs, useRouter } from "expo-router";

export default function TabLayout() {
    return <ScreenTabs />;
}

const ScreenTabs = () => {
    const { user: user } = useUser();
    const router = useRouter();

    // Confirm Assessment is complete
    useEffect(() => {
        if (user && !checkIfAssesmentComplete(user)) {
            return router.replace("/assessment");
        }
    }, [user]);

    return (
        <Tabs
            sceneContainerStyle={styles.tabBar}
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="home"
                options={{
                    href: "/",
                    tabBarLabel: "Home",
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <HomeIcon
                                color={focused ? colors.gold : colors.white}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="programs"
                options={{
                    href: "/programs",
                    tabBarLabel: "Programs",
                    title: "Programs",
                    header: () => <Header showAvatar canGoBack={false} />,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <ProgramsIcon
                                color={focused ? colors.gold : colors.white}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="community"
                options={{
                    href: "/community",
                    tabBarLabel: "Community",
                    title: "Community",
                    header: () => <Header showAvatar canGoBack={false} />,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <CommunityIcon
                                color={focused ? colors.gold : colors.white}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="more"
                options={{
                    href: "/more",
                    tabBarLabel: "More",
                    title: "More",
                    header: () => <Header showAvatar canGoBack={false} />,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MoreIcon
                                color={focused ? colors.gold : colors.white}
                            />
                        );
                    },
                }}
            />
        </Tabs>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.surface_background,
    },
});

const checkIfAssesmentComplete = (user: User) => {
    return !!(user.gender && user.hoop_level && user.performance_goal);
};
