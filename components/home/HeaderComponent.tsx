import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import SearchInput from "../SearchInput";
import { Link } from "expo-router";
import { useGetAllProfile } from "@/api/profile";

export default function HeaderComponent() {
  const { data: users } = useGetAllProfile();

  return (
    <>
      <SearchInput placeholder="Buscar post..." />
      <Text style={styles.title}>A quién seguir</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {users?.map((user) => (
          <Link
            href={`/profile/${user.id}` as `${string}:${string}`}
            key={user.id}
            asChild
          >
            <Pressable>
              <ImageBackground
                source={{
                  uri: "https://cdn.pixabay.com/photo/2023/10/28/16/27/mountains-8347890_1280.jpg",
                }}
                style={styles.imageBackground}
              >
                <Image
                  source={{ uri: users[0].avatar }}
                  style={styles.avatar}
                />
                <View style={styles.contentBottom}>
                  <Text style={styles.name} numberOfLines={1}>
                    {user.full_name}
                  </Text>
                </View>
              </ImageBackground>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: "RobotoBold",
    fontSize: 16,
  },
  container: {
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  imageBackground: {
    width: 140,
    aspectRatio: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 16,
    overflow: "hidden",
  },
  avatar: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 30 / 2,
    zIndex: 1,
    transform: [{ translateY: 15 }],
    alignSelf: "center",
  },
  contentBottom: {
    backgroundColor: Colors.text,
    width: 140,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 13,
    color: "#fff",
    fontFamily: "RobotoMedium",
  },
});
