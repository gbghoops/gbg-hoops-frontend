import { useCallback } from "react";
import { StyleSheet } from "react-native";
import {
    MaterialTabBar,
    MaterialTabItem,
    Tabs,
} from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WorkoutPageError from "@src/components/screen-components/Workout/PageError/WorkoutPageError";
import { usePrograms } from "@src/context/ProgramsContext/programs-context";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styled, Text, View } from "tamagui";

export default function CompletedProgramDetails() {
    const router = useRouter();
    const { programs, addProgramToUser } = usePrograms();
    const { bottom } = useSafeAreaInsets();
    const { slug } = useLocalSearchParams();

    const currentProgram = programs.find((program) => program.slug === slug);

    const renderProgramDetailsHeader = useCallback(
        () =>
            currentProgram ? (
                <PageHeaderWrapper>
                    <PageHeader>{currentProgram.name}</PageHeader>
                </PageHeaderWrapper>
            ) : null,
        [],
    );

    if (!currentProgram) return <WorkoutPageError />;

    const headerHeight = wn(80);

    return (
        <Tabs.Container
            renderHeader={renderProgramDetailsHeader}
            headerHeight={headerHeight}
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
            <Tabs.Tab name="Workout">
                <View>
                    <Text>Workout</Text>
                </View>
            </Tabs.Tab>
        </Tabs.Container>
    );
}

const WeekTab = () => {};

const PageHeaderWrapper = styled(View, {
    px: "$20",
    height: "$80",
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
    numberOfLines: 2,
    textOverflow: "ellipsis",
});

const styles = StyleSheet.create({
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
    header: {
        height: wn(100),
        width: "100%",
        backgroundColor: "#2196f3",
    },
});
