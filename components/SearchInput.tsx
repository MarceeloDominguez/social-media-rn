import { View, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";

type SearchInputProps = {
  placeholder: string;
  initialQuery?: string;
};

export default function SearchInput({
  placeholder,
  initialQuery,
}: SearchInputProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  const queryRoute = `/search/${query}` as `${string}:${string}`;

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder={placeholder}
          keyboardType="default"
          style={styles.input}
          value={query}
          onChangeText={(e) => setQuery(e)}
        />
        <Pressable
          onPress={() => {
            if (!query) {
              return Alert.alert(
                "Error",
                "Por favor, ingrese algo para buscar resultados"
              );
            }

            if (pathname.startsWith("/search")) router.setParams({ query });
            else {
              router.push(queryRoute);
              setQuery("");
            }
          }}
          style={styles.containerIcon}
        >
          <Ionicons name="search" size={22} color={Colors.icon} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  input: {
    backgroundColor: "#fff",
    height: 45,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: Colors.text,
    fontFamily: "RobotoMedium",
    paddingRight: 50,
    borderWidth: 0.6,
    borderColor: Colors.icon,
  },
  containerIcon: {
    position: "absolute",
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    right: 0,
  },
});
