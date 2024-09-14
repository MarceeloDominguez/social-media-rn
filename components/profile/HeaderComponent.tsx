import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { User, users } from "@/assets/data/data";
import IconFollowing from "@expo/vector-icons/SimpleLineIcons";
import { useAuth } from "@/provider/AuthProvider";
import {
  useFollowUser,
  useGetAllPostsByUser,
  useGetFollowers,
  useGetFollowing,
  useUnFollowUser,
} from "@/api/post";
import { Link } from "expo-router";

type HeaderComponentProps = {
  user: User | null;
};

export default function HeaderComponent({ user }: HeaderComponentProps) {
  const { profile } = useAuth();

  if (!user || !profile) {
    return null;
  }

  const { data: posts } = useGetAllPostsByUser(user?.id);
  const { mutate: followUser } = useFollowUser();
  const { mutate: unFollowUser } = useUnFollowUser();

  const { data: followers } = useGetFollowers(user?.id);
  const { data: following } = useGetFollowing(user?.id);

  const isFollowing = followers?.some((f) => f.follower_id === profile?.id);

  const handleToggleFollowsUnfollows = () => {
    if (isFollowing) {
      unFollowUser({ followerId: profile?.id, followingId: user?.id });
    } else {
      followUser({ followerId: profile?.id, followingId: user?.id });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg",
          }}
          style={styles.imageHeader}
        />
        <Image source={{ uri: users[0].avatar }} style={styles.avatar} />
      </View>
      <View style={styles.contentInfo}>
        <Text style={styles.name}>{user?.full_name}</Text>
        {user?.location && (
          <Text style={styles.location}>{user?.location}</Text>
        )}
        <View style={styles.containerInfoUser}>
          <View style={styles.contentStatistics}>
            <Link
              href={`/list-users?followers=${JSON.stringify(followers)}`}
              asChild
            >
              <Pressable style={styles.containerFollowers}>
                <Text style={styles.textFollowers}>
                  {followers?.length} Seguidores
                </Text>
              </Pressable>
            </Link>
            <View style={styles.lineDivision} />
            <Link
              href={`/list-users?following=${JSON.stringify(following)}`}
              asChild
            >
              <Pressable style={styles.containerFollowers}>
                <Text style={styles.textFollowers}>
                  {following?.length} Siguiendo
                </Text>
              </Pressable>
            </Link>
          </View>
          {profile?.id === user?.id ? null : (
            <Pressable
              onPress={handleToggleFollowsUnfollows}
              style={[
                styles.containerIconFollowing,
                { backgroundColor: isFollowing ? Colors.tint : "#e1ebe1" },
              ]}
            >
              <IconFollowing
                name={isFollowing ? "user-following" : "user-follow"}
                size={22}
                color={isFollowing ? "#fff" : "#000"}
              />
            </Pressable>
          )}
        </View>
        {user?.bio && <Text style={styles.bio}>{user?.bio}</Text>}
        <Text style={styles.titleMyPosts}>
          {!posts?.length
            ? "Aún no tienes ninguna publicación"
            : profile?.id === user?.id
            ? `Mis posts (${posts?.length})`
            : `Sus posts (${posts?.length})`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 70,
  },
  imageHeader: {
    width: "auto",
    aspectRatio: 1.7,
  },
  avatar: {
    width: 110,
    height: 110,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: 110 / 2,
    transform: [{ translateY: 57 }],
    borderWidth: 4,
    borderColor: Colors.background,
  },
  name: {
    fontSize: 20,
    fontFamily: "RobotoBold",
    color: Colors.text,
  },
  location: {
    fontFamily: "RobotoMedium",
    color: Colors.icon,
    fontSize: 13,
  },
  contentInfo: {
    top: 60,
    alignItems: "center",
    gap: 4,
  },
  containerInfoUser: {
    flexDirection: "row",
    marginTop: 20,
    gap: 5,
  },
  contentStatistics: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
  },
  containerFollowers: {
    backgroundColor: "#e1ebe1",
    height: 40,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  textFollowers: {
    fontSize: 13,
    fontFamily: "RobotoBold",
    letterSpacing: 0.3,
  },
  containerIconFollowing: {
    width: 40,
    height: 40,
    //backgroundColor: Colors.tint,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  lineDivision: {
    height: 40,
    width: 1,
    backgroundColor: "#ccc",
  },
  bio: {
    paddingHorizontal: 12,
    marginTop: 14,
    fontFamily: "RobotoMedium",
    color: Colors.text,
    fontSize: 13,
    width: "100%",
  },
  titleMyPosts: {
    width: "100%",
    paddingHorizontal: 12,
    marginTop: 14,
    fontFamily: "RobotoBold",
    fontSize: 15,
  },
});
