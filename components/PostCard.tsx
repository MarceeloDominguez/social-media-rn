import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Post, users } from "@/assets/data/data";
import FollowButton from "./FollowButton";
import UserLikesCard from "./UserLikesCard";
import PostDescription from "./PostDescription";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

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
        <Link href={`/profile/${user.id}` as `${string}:${string}`} asChild>
          <Pressable style={styles.contentTopCard}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={styles.name}>
                {user.name}
              </Text>
              <Text numberOfLines={1} style={styles.username}>
                {user.username}
              </Text>
            </View>
          </Pressable>
        </Link>
        <FollowButton />
      </View>
      <Image source={{ uri: post.image }} style={styles.imagePost} />
      <View style={styles.wrapperBottomCard}>
        <UserLikesCard />
        <View style={styles.contentBottomEnd}>
          <View style={styles.contentIconHeart}>
            <Text style={styles.countLikes}>100</Text>
            <Ionicons name="heart-outline" size={22} color="black" />
          </View>
          <Ionicons name="bookmark-outline" size={22} color="black" />
        </View>
      </View>
      <View style={{ paddingHorizontal: 10, paddingBottom: 10, paddingTop: 4 }}>
        <PostDescription />
        <Text style={styles.time}>1 hour ago</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 2,
    margin: 12,
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
    flex: 1,
  },
  avatar: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 45 / 2,
    borderWidth: 2,
    borderColor: Colors.tint,
  },
  name: {
    fontSize: 16,
    fontFamily: "RobotoBold",
    marginRight: 5,
  },
  username: {
    color: Colors.text,
    fontFamily: "RobotoMedium",
    marginRight: 5,
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
  countLikes: {
    fontSize: 13,
    fontFamily: "RobotoMedium",
  },
  time: {
    textAlign: "right",
    fontSize: 12,
    marginTop: 10,
    color: Colors.text,
  },
});
