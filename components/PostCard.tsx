import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Post, users } from "@/assets/data/data";
import FollowButton from "./FollowButton";
import UserLikesCard from "./UserLikesCard";
import PostDescription from "./PostDescription";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const getUserById = (userId: string) => {
    return users.find((user) => user.id === userId);
  };

  const user = getUserById(post.user_id);

  if (!user) {
    return <ActivityIndicator size={25} color="red" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapperTopCard}>
        <View style={styles.contentTopCard}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View>
            <Text>{user.name}</Text>
            <Text>{user.username}</Text>
          </View>
        </View>
        <FollowButton />
      </View>
      <Image source={{ uri: post.image }} style={styles.imagePost} />
      <View style={styles.wrapperBottomCard}>
        <UserLikesCard />
        <View style={styles.contentBottomEnd}>
          <View style={styles.contentIconHeart}>
            <Text>100</Text>
            <Ionicons name="heart-outline" size={24} color="black" />
          </View>
          <Ionicons name="bookmark-outline" size={24} color="black" />
        </View>
      </View>
      <View style={{ paddingHorizontal: 10, paddingBottom: 10, paddingTop: 4 }}>
        <PostDescription />
        <Text style={{ textAlign: "right", fontSize: 13, marginTop: 10 }}>
          1 hour ago
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 2,
  },
  wrapperTopCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  contentTopCard: {
    flexDirection: "row",
    gap: 10,
  },
  avatar: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 45 / 2,
  },
  imagePost: {
    width: "100%",
    aspectRatio: 1.5,
  },
  wrapperBottomCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  contentBottomEnd: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  contentIconHeart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
