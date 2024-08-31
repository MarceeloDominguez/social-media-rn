import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Post, User } from "@/assets/data/data";
import FollowButton from "./FollowButton";
import UserLikesCard from "./UserLikesCard";
import PostDescription from "./PostDescription";
import { Colors } from "@/constants/Colors";
import { Link, usePathname } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/provider/AuthProvider";
import Svg, { Circle, Path } from "react-native-svg";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const { profile } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", post.user_id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setUser(data);
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <ActivityIndicator size={25} color="red" />;
  }

  return (
    <View style={styles.container}>
      {pathname === "/" && (
        <View style={styles.wrapperTopCard}>
          <Link href={`/profile/${user.id}` as `${string}:${string}`} asChild>
            <Pressable style={styles.contentTopCard}>
              {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <Svg width="45" height="45" viewBox="0 0 54 54" fill="none">
                  <Path
                    d="M27 0.00146484C12.0899 0.00146484 0 12.089 0 27.0003C0 41.9116 12.0887 53.9991 27 53.9991C41.9125 53.9991 54 41.9116 54 27.0003C54 12.089 41.9125 0.00146484 27 0.00146484ZM27 8.07443C31.9337 8.07443 35.9316 12.0735 35.9316 17.0048C35.9316 21.9373 31.9337 25.9353 27 25.9353C22.0687 25.9353 18.0708 21.9373 18.0708 17.0048C18.0708 12.0735 22.0687 8.07443 27 8.07443ZM26.9941 46.9401C22.0734 46.9401 17.5667 45.1481 14.0906 42.182C13.2438 41.4597 12.7552 40.4007 12.7552 39.2894C12.7552 34.2881 16.803 30.2854 21.8054 30.2854H32.197C37.2006 30.2854 41.2329 34.2881 41.2329 39.2894C41.2329 40.4018 40.7467 41.4586 39.8987 42.1808C36.4238 45.1481 31.9159 46.9401 26.9941 46.9401Z"
                    fill="#ccc"
                  />
                </Svg>
              )}
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={styles.name}>
                  {user.full_name}
                </Text>
                <Text numberOfLines={1} style={styles.username}>
                  {user.username}
                </Text>
              </View>
            </Pressable>
          </Link>
          {profile?.id === post.user_id ? null : <FollowButton />}
        </View>
      )}
      {post.image ? (
        <Image source={{ uri: post.image }} style={styles.imagePost} />
      ) : (
        <Svg style={styles.imagePost} viewBox="0 0 20 20" fill="none">
          <Circle
            cx="13.3334"
            cy="6.66667"
            r="1.66667"
            stroke="#ccc"
            stroke-width="1.5"
          />
          <Path
            d="M1.66675 9.99984C1.66675 6.07147 1.66675 4.10728 2.88714 2.88689C4.10752 1.6665 6.07171 1.6665 10.0001 1.6665C13.9285 1.6665 15.8926 1.6665 17.113 2.88689C18.3334 4.10728 18.3334 6.07147 18.3334 9.99984C18.3334 13.9282 18.3334 15.8924 17.113 17.1128C15.8926 18.3332 13.9285 18.3332 10.0001 18.3332C6.07171 18.3332 4.10752 18.3332 2.88714 17.1128C1.66675 15.8924 1.66675 13.9282 1.66675 9.99984Z"
            stroke="#ccc"
            stroke-width="1.5"
          />
          <Path
            d="M1.66675 10.4169L3.1264 9.13976C3.8858 8.47529 5.03031 8.5134 5.74382 9.22691L9.31859 12.8017C9.89128 13.3744 10.7928 13.4525 11.4554 12.9868L11.7039 12.8121C12.6574 12.142 13.9475 12.2196 14.8138 12.9993L17.5001 15.4169"
            stroke="#ccc"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </Svg>
      )}
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
        <PostDescription description={post.description} />
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
