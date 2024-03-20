import { useState } from "react";
import { Tabs } from "react-native-collapsible-tab-view";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthSession } from "aws-amplify/auth";
import { Text, View } from "tamagui";

interface FetchExercisesProps {
    page: number;
    search_term?: string;
}
const fetchExercises = async ({
    page,
    search_term = "",
}: FetchExercisesProps) => {
    const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL ?? "";

    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    const response = await fetch(
        `${backend_url}/content/exercises?${new URLSearchParams({ page: String(page), search_term }).toString()}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Error fetching exercises");
    }

    const data = await response.json();

    return data;
};

export function ExerciseLibrary() {
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, error } = useQuery({
        queryKey: ["exercises"],
        queryFn: () => fetchExercises({ page, search_term: searchTerm }),
    });
    return (
        <Tabs.ScrollView showsVerticalScrollIndicator={false}>
            <View f={1} jc={"center"} ai={"center"}>
                <Text>Exercise Library</Text>
            </View>
        </Tabs.ScrollView>
    );
}
