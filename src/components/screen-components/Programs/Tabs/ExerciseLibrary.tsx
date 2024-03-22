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
import { CachedImage } from "@georstat/react-native-image-cache";
import {
    FieldType,
    TitledTextField,
} from "@src/components/titled-text-field/TitledTextField";
import {
    Exercise,
    useExerciseList,
} from "@src/hooks/exercise-list/useExerciseList";
import { colors } from "@src/styles/theme/colors";
import { widthNormalized as wn } from "@src/utils/normalize-dimensions";
import { useRouter } from "expo-router";
import { debounce, Text, View } from "tamagui";

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
                ListEmptyComponent={!isLoading ? <ListEmptyComponent /> : null}
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
    const onChange = (text: string) => {
        setSearchTerm(text);
        onTextChange(text);
    };
    return (
        <View>
            <View fd="row" jc="flex-end" py={"$10"}>
                {/* Loading Indicator */}
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
            </View>
            <View>
                {isLoading ? (
                    <ActivityIndicator size="small" color={colors.gold} />
                ) : null}
            </View>
        </View>
    );
};

const ExerciseListItem = ({ exercise }: { exercise: Exercise }) => {
    const router = useRouter();
    return (
        <View
            fd="row"
            ai="center"
            py="$15"
            borderBottomWidth={0.25}
            borderBottomColor={"$border_primary"}
            animation={"fast"}
            pressStyle={{
                opacity: 0.75,
                scale: 0.995,
            }}
            onPress={() => {
                router.push(
                    `/exercise-details?exercise_id=${exercise.contentful_id}`,
                );
            }}
        >
            <View width={wn(100)} height={wn(100)}>
                <CachedImage
                    source={`http:${exercise.thumbnail}`}
                    loadingImageComponent={() => (
                        <ActivityIndicator size="small" color={colors.gold} />
                    )}
                    style={{ width: wn(100), height: wn(100) }}
                />
            </View>
            <Text
                fontFamily={"$heading"}
                color={"$gold"}
                fontSize={"$20"}
                numberOfLines={2}
                textOverflow="ellipsis"
                flexShrink={1}
                ml="$10"
            >
                {exercise.name}
            </Text>
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
        >
            <View mb={"$10"}>
                <Octicons name="search" size={wn(40)} color={colors.gold} />
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
