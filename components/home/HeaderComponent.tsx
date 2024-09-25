import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import SearchInput from "../SearchInput";
import { Link } from "expo-router";
import { useGetAllProfile } from "@/api/profile";
import RemotaImage from "../RemotaImage";

export default function HeaderComponent() {
  const { data: users, isLoading: isLoadingUsers } = useGetAllProfile();

  if (isLoadingUsers) {
    return (
      <View style={styles.containerIcon}>
        <ActivityIndicator size={22} color={Colors.tint} />
      </View>
    );
  }

  return (
    <>
      <SearchInput placeholder="Buscar post..." />
      <Text style={styles.title}>A quién seguir</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {users
          ?.filter((user) => user.banner !== null)
          .map((user) => (
            <Link
              href={`/profile/${user.id}` as `${string}:${string}`}
              key={user.id}
              asChild
            >
              <Pressable>
                {!user.banner ? (
                  <View style={styles.loadingBannerImage}>
                    <ActivityIndicator size={22} color={Colors.tint} />
                  </View>
                ) : (
                  <RemotaImage
                    path={user.banner}
                    style={styles.imageBackground}
                    downloadStorage="banners"
                  />
                )}
                <View style={styles.contentBottom}>
                  <Text style={styles.name} numberOfLines={1}>
                    {user.full_name}
                  </Text>
                </View>
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
    fontSize: 18,
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
    backgroundColor: "#e3ece1",
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
    backgroundColor: Colors.tint,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  name: {
    fontSize: 13,
    color: "#fff",
    fontFamily: "RobotoMedium",
    textTransform: "capitalize",
  },
  containerIcon: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingBannerImage: {
    width: 140,
    aspectRatio: 1,
    paddingTop: 40,
  },
});
