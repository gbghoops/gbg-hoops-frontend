import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
} from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { RefreshControl } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import Button from "@src/components/button/Button";
import LegendSheet from "@src/components/screen-components/Programs/ProgramDetails/LegendSheet";
import {
    FieldType,
    TitledTextField,
} from "@src/components/titled-text-field/TitledTextField";
import { Exercise } from "@src/context/ProgramsContext/types";
import { useExerciseList } from "@src/hooks/exercise-list/useExerciseList";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { debounce, Text, View } from "tamagui";

import ExerciseListItem from "../../ExerciseList/ExerciseListItem";

export function ExerciseLibrary() {
    const [searchTerm, setSearchTerm] = useState("");
    const { bottom, top } = useSafeAreaInsets();

    const {
        exercises = [],
        fetchNextPage,
        hasNextPage,
        isLoading,
        refetch,
        isFetching,
    } = useExerciseList({
        searchTerm,
    });

    const loadNextPage = async () => {
        if (hasNextPage) {
            await fetchNextPage();
        }
    };

    const refetchOnchange = debounce(async () => {
        await refetch();
    }, 300);

    const onChange = (text: string) => {
        setSearchTerm(text);

        refetchOnchange();
    };

    return (
        <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={top + wn(80)}
            style={{ flex: 1 }}
        >
            <Tabs.FlashList
                data={exercises}
                onEndReached={loadNextPage}
                refreshing={isLoading}
                estimatedItemSize={wn(136.3)}
                ListHeaderComponent={
                    <FlashListHeader
                        onTextChange={onChange}
                        isLoading={isFetching}
                    />
                }
                contentContainerStyle={styles(bottom).exerciseListContainer}
                onRefresh={async () => await refetch()}
                onEndReachedThreshold={0.25}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        title={"Pull to refresh"}
                        tintColor={colors.gold}
                        titleColor={colors.gold}
                        onRefresh={refetch}
                    />
                }
                renderItem={({ item }) => (
                    <ExerciseListItem exercise={item as Exercise} />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    !isLoading ? (
                        <View mt="$30">
                            <ListEmptyComponent />
                        </View>
                    ) : null
                }
            />
        </KeyboardAvoidingView>
    );
}

interface FlashListHeaderProps {
    onTextChange: (text: string) => void;
    isLoading: boolean;
}
const FlashListHeader = ({
    onTextChange,
    isLoading = false,
}: FlashListHeaderProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showLegendSheet, setShowLegendSheet] = useState(false);

    const onChange = (text: string) => {
        setSearchTerm(text);
        onTextChange(text);
    };
    return (
        <View>
            <View fd="row" jc="flex-end" py={"$10"}>
                <View f={1} height={"$54"}>
                    <TitledTextField
                        key={"search-field"}
                        title={"Search"}
                        type={FieldType.TEXT}
                        height={wn(54)}
                        value={searchTerm}
                        placeholder="e.g Deadlift..."
                        handleChange={onChange}
                        maxCharacters={128}
                    />
                </View>
                <View ml={"$10"}>
                    <Button text="Filter" secondary_transparent />
                </View>
            </View>
            <View alignItems="flex-end">
                <View
                    fd="row"
                    onPress={() => setShowLegendSheet(true)}
                    animation={"fast"}
                    ai="center"
                    pressStyle={{
                        opacity: 0.75,
                        scale: 0.995,
                    }}
                >
                    <View>
                        <Octicons
                            name="info"
                            size={wn(20)}
                            color={colors.gold}
                        />
                    </View>
                    <Text
                        fontFamily={"$heading"}
                        fontSize={"$20"}
                        color={"$white"}
                        ml="$5"
                        mt="$5"
                        textTransform="uppercase"
                    >
                        Legend
                    </Text>
                </View>
            </View>

            {/* Activity Indicator */}
            <View>
                {isLoading ? (
                    <ActivityIndicator size="small" color={colors.gold} />
                ) : null}
            </View>

            <LegendSheet
                sheetOpen={showLegendSheet}
                setSheetOpen={setShowLegendSheet}
            />
        </View>
    );
};

const ListEmptyComponent = () => {
    return (
        <View
            p="$20"
            borderRadius="$10"
            backgroundColor={"rgba(80, 80, 80, 0.25)"}
            borderWidth={0.25}
            borderColor={"rgba(250, 250, 250, 0.5)"}
            jc={"center"}
            ai={"center"}
            height={wn(200)}
        >
            <View mb={"$10"}>
                <Octicons name="search" size={wn(30)} color={colors.gold} />
            </View>
            <Text fontSize={"$20"} fontFamily={"$heading"} color={"$gold"}>
                No exercises found
            </Text>
        </View>
    );
};

const styles = (bottom: number) =>
    StyleSheet.create({
        exerciseListContainer: {
            paddingBottom: bottom + wn(100),
            padding: wn(20),
        },
    });
