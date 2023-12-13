import { useCallback } from "react";
import { StyleSheet } from "react-native";
import {
    MaterialTabBar,
    MaterialTabItem,
    Tabs,
} from "react-native-collapsible-tab-view";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { Stack, styled, Text, View } from "tamagui";

export default function ProgramsPage() {
    return (
        <Stack backgroundColor={"$surface_background"} f={1}>
            <ProgramTabs />
        </Stack>
    );
}

const ProgramTabs = () => {
    const renderProgramsPageHeader = useCallback(
        () => (
            <PageHeaderWrapper>
                <PageHeader>Programs</PageHeader>
            </PageHeaderWrapper>
        ),
        [],
    );
    return (
        <Tabs.Container
            renderHeader={renderProgramsPageHeader}
            revealHeaderOnScroll
            snapThreshold={0.5}
            renderTabBar={(props) => (
                <MaterialTabBar
                    {...props}
                    scrollEnabled
                    style={styles.tabBarStyle}
                    tabStyle={styles.tabsStyle}
                    indicatorStyle={styles.indicatorStyle}
                    activeColor={colors.white}
                    inactiveColor={colors.white}
                    labelStyle={styles.labelStyle}
                    TabItemComponent={(props) => <MaterialTabItem {...props} />}
                />
            )}
        >
            {/* For You */}
            <Tabs.Tab name="For you">
                <Tabs.ScrollView style={{ borderWidth: 1, borderColor: "red" }}>
                    <View
                        f={1}
                        width={"100%"}
                        borderWidth={1}
                        borderColor={"$gold"}
                    >
                        <View style={[styles.box, styles.boxA]}>
                            <Text color={"$text_primary"}>Tab 1</Text>
                        </View>
                        <View style={[styles.box, styles.boxB]} />
                    </View>
                </Tabs.ScrollView>
            </Tabs.Tab>

            {/* All Programs */}
            <Tabs.Tab name="All">
                <Tabs.ScrollView>
                    <View f={1} jc={"center"} ai={"center"}>
                        <Text>Tab 1</Text>
                    </View>
                </Tabs.ScrollView>
            </Tabs.Tab>

            <Tabs.Tab name="Favorites">
                <Tabs.ScrollView>
                    <View f={1} jc={"center"} ai={"center"}>
                        <Text>Tab 1</Text>
                    </View>
                </Tabs.ScrollView>
            </Tabs.Tab>

            <Tabs.Tab name="Offline">
                <Tabs.ScrollView>
                    <View f={1} jc={"center"} ai={"center"}>
                        <Text>Tab 1</Text>
                    </View>
                </Tabs.ScrollView>
            </Tabs.Tab>

            <Tabs.Tab name="Library">
                <Tabs.ScrollView>
                    <View f={1} jc={"center"} ai={"center"}>
                        <Text>Tab 1</Text>
                    </View>
                </Tabs.ScrollView>
            </Tabs.Tab>

            <Tabs.Tab name="History">
                <Tabs.ScrollView>
                    <View f={1} jc={"center"} ai={"center"}>
                        <Text>Tab 1</Text>
                    </View>
                </Tabs.ScrollView>
            </Tabs.Tab>
        </Tabs.Container>
    );
};

const PageHeaderWrapper = styled(View, {
    px: "$20",
    height: wn(80),
    justifyContent: "center",
    backgroundColor: "$surface_background",
});

const PageHeader = styled(Text, {
    fontFamily: "$heading",
    fontSize: "$40",
    color: "$text_primary",
    marginTop: "$10",
    marginBottom: "$10",
    textTransform: "uppercase",
});

const styles = StyleSheet.create({
    box: {
        height: 250,
        width: "100%",
    },
    tabBarStyle: {
        backgroundColor: colors.surface_background,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(164, 164, 164, 0.4)",
        shadowColor: "rgba(0, 0, 0, 0)",
    },
    tabsStyle: {
        backgroundColor: colors.surface_background,
        minWidth: wn(90),
        marginVertical: 0,
        height: wn(45),
        color: colors.white,
    },
    labelStyle: {
        color: colors.white,
        fontFamily: "acumin_pro_bold",
    },
    indicatorStyle: {
        backgroundColor: colors.gold,
        height: wn(3),
        color: "rgba(255, 255, 255, 0.5)",
    },
    boxA: {
        backgroundColor: "white",
    },
    boxB: {
        backgroundColor: "#D8D8D8",
    },
    header: {
        height: wn(100),
        width: "100%",
        backgroundColor: "#2196f3",
    },
});
