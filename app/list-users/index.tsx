import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import Svg, { Path } from "react-native-svg";

type Profile = {
  avatar_url: string;
  full_name: string;
  bio: string;
};

type Follower = {
  follower_id: string;
  profiles: Profile;
};

type Following = {
  following_id: string;
  profiles: Profile;
};

export default function ListUserScreen() {
  const { followers, following } = useLocalSearchParams();

  let parsedFollowers = [] as Follower[];
  let parsedFollowing = [] as Following[];

  // Parsear el JSON si es una cadena
  if (typeof followers === "string") {
    parsedFollowers = JSON.parse(followers);
  }

  // Extraer los perfiles
  const profilesOfFollowers = Array.isArray(parsedFollowers)
    ? parsedFollowers.map((follower) => follower.profiles)
    : [];

  // Parsear el JSON si es una cadena
  if (typeof following === "string") {
    parsedFollowing = JSON.parse(following);
  }

  // Extraer los perfiles
  const profilesOfFollowing = Array.isArray(parsedFollowing)
    ? parsedFollowing.map((following) => following.profiles)
    : [];

  const profiles =
    profilesOfFollowers.length > 0 ? profilesOfFollowers : profilesOfFollowing;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: profilesOfFollowers.length > 0 ? "Seguidores" : "Siguiendo",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
      <FlatList
        keyExtractor={(_, item) => item.toString()}
        data={profiles}
        ListEmptyComponent={() => (
          <Text style={styles.textEmptyComponent}>Aún no hay nadie aquí</Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.avatar_url ? (
              <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
            ) : (
              <Svg width="40" height="40" viewBox="0 0 54 54" fill="none">
                <Path
                  d="M27 0.00146484C12.0899 0.00146484 0 12.089 0 27.0003C0 41.9116 12.0887 53.9991 27 53.9991C41.9125 53.9991 54 41.9116 54 27.0003C54 12.089 41.9125 0.00146484 27 0.00146484ZM27 8.07443C31.9337 8.07443 35.9316 12.0735 35.9316 17.0048C35.9316 21.9373 31.9337 25.9353 27 25.9353C22.0687 25.9353 18.0708 21.9373 18.0708 17.0048C18.0708 12.0735 22.0687 8.07443 27 8.07443ZM26.9941 46.9401C22.0734 46.9401 17.5667 45.1481 14.0906 42.182C13.2438 41.4597 12.7552 40.4007 12.7552 39.2894C12.7552 34.2881 16.803 30.2854 21.8054 30.2854H32.197C37.2006 30.2854 41.2329 34.2881 41.2329 39.2894C41.2329 40.4018 40.7467 41.4586 39.8987 42.1808C36.4238 45.1481 31.9159 46.9401 26.9941 46.9401Z"
                  fill="#ccc"
                />
              </Svg>
            )}
            <View style={styles.containerInfoUser}>
              <Text style={styles.fullName}>{item.full_name}</Text>
              <Text numberOfLines={1} style={styles.bio}>
                {item.bio ? item.bio : "Sin información"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  contentContainerStyle: {
    margin: 12,
    gap: 16,
  },
  card: {
    padding: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    borderBottomWidth: 3,
    borderColor: "#baceb6",
    borderRadius: 14,
    borderLeftWidth: 3,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 40 / 2,
  },
  containerInfoUser: {
    flex: 1,
  },
  fullName: {
    fontFamily: "RobotoBold",
    fontSize: 16,
    color: Colors.text,
  },
  bio: {
    fontFamily: "RobotoMedium",
    fontSize: 13,
    color: "#413e3e",
    marginTop: 4,
  },
  textEmptyComponent: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: "RobotoBold",
    fontSize: 15,
    color: Colors.text,
  },
});
