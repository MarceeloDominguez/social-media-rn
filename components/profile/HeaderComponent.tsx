import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { User } from "@/assets/data/data";
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
import Svg, { Path } from "react-native-svg";
import RemotaImage from "../RemotaImage";

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
        {user.banner ? (
          <RemotaImage
            path={user.banner}
            downloadStorage="banners"
            style={styles.headerDefault}
          />
        ) : (
          <View style={styles.headerDefault} />
        )}

        {user.avatar_url ? (
          <View style={styles.containerAvatar}>
            <RemotaImage
              path={user.avatar_url}
              style={styles.avatar}
              downloadStorage="avatars"
            />
          </View>
        ) : (
          <View style={styles.containerAvatar}>
            <Svg style={styles.avatar} viewBox="0 0 54 54" fill="none">
              <Path
                d="M27 0.00146484C12.0899 0.00146484 0 12.089 0 27.0003C0 41.9116 12.0887 53.9991 27 53.9991C41.9125 53.9991 54 41.9116 54 27.0003C54 12.089 41.9125 0.00146484 27 0.00146484ZM27 8.07443C31.9337 8.07443 35.9316 12.0735 35.9316 17.0048C35.9316 21.9373 31.9337 25.9353 27 25.9353C22.0687 25.9353 18.0708 21.9373 18.0708 17.0048C18.0708 12.0735 22.0687 8.07443 27 8.07443ZM26.9941 46.9401C22.0734 46.9401 17.5667 45.1481 14.0906 42.182C13.2438 41.4597 12.7552 40.4007 12.7552 39.2894C12.7552 34.2881 16.803 30.2854 21.8054 30.2854H32.197C37.2006 30.2854 41.2329 34.2881 41.2329 39.2894C41.2329 40.4018 40.7467 41.4586 39.8987 42.1808C36.4238 45.1481 31.9159 46.9401 26.9941 46.9401Z"
                fill="#ccc"
              />
            </Svg>
          </View>
        )}
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
  headerDefault: {
    width: "auto",
    aspectRatio: 1.7,
    backgroundColor: "#e3ece1",
  },
  containerAvatar: {
    width: 110,
    height: 110,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: 110 / 2,
    transform: [{ translateY: 57 }],
    borderWidth: 4,
    borderColor: Colors.background,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 102,
    height: 102,
    borderRadius: 102 / 2,
  },
  name: {
    fontSize: 20,
    fontFamily: "RobotoBold",
    color: Colors.text,
    textTransform: "capitalize",
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
