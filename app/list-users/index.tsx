import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";

type Profile = {
  avatar_url: string;
  full_name: string;
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

  return (
    <View>
      <Stack.Screen
        options={{
          title: profilesOfFollowers.length > 0 ? "Seguidores" : "Siguiendo",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
      {profilesOfFollowers.length > 0 && (
        <View>
          <Text>Followers:</Text>
          {profilesOfFollowers.map((follower, index) => (
            <Text key={index}>{follower.full_name}</Text>
          ))}
        </View>
      )}
      {profilesOfFollowing.length > 0 && (
        <View>
          <Text>Following:</Text>
          {profilesOfFollowing.map((following, index) => (
            <Text key={index}>{following.full_name}</Text>
          ))}
        </View>
      )}
    </View>
  );
}
