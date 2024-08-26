import { View } from "react-native";
import React from "react";
import SearchInput from "@/components/SearchInput";
import { Stack, useLocalSearchParams } from "expo-router";

export default function SearchScreen() {
  const { query } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Buscar",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "RobotoBold" },
        }}
      />
      <SearchInput
        placeholder="Buscar post..."
        initialQuery={Array.isArray(query) ? query[0] : query}
      />
    </View>
  );
}
