import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useGetLikes } from "@/api/post";
import Loading from "./Loading";
import Svg, { Path } from "react-native-svg";
import RemotaImage from "./RemotaImage";

type UserLikesCardProps = {
  postId: string;
};

const { width: WIDTH_SCREEN } = Dimensions.get("screen");

export default function UserLikesCard({ postId }: UserLikesCardProps) {
  const { data: likes, isLoading } = useGetLikes(postId);

  if (isLoading) {
    return <Loading />;
  }

  const maxUsersToShow = 3;
  const users = likes?.slice(0, maxUsersToShow).map((like) => like.profiles);

  return (
    <View style={styles.container}>
      {users?.map((user, index) => (
        <Pressable
          key={index}
          style={[styles.contentAvatars, { zIndex: users.length - index }]}
        >
          {user.avatar_url ? (
            <RemotaImage
              path={user.avatar_url}
              style={[{ left: index * 15 }, styles.avatar]}
              downloadStorage="avatars"
            />
          ) : (
            <Svg
              style={[{ left: index * 15 }, styles.avatar]}
              viewBox="0 0 54 54"
              fill="none"
            >
              <Path
                d="M27 0.00146484C12.0899 0.00146484 0 12.089 0 27.0003C0 41.9116 12.0887 53.9991 27 53.9991C41.9125 53.9991 54 41.9116 54 27.0003C54 12.089 41.9125 0.00146484 27 0.00146484ZM27 8.07443C31.9337 8.07443 35.9316 12.0735 35.9316 17.0048C35.9316 21.9373 31.9337 25.9353 27 25.9353C22.0687 25.9353 18.0708 21.9373 18.0708 17.0048C18.0708 12.0735 22.0687 8.07443 27 8.07443ZM26.9941 46.9401C22.0734 46.9401 17.5667 45.1481 14.0906 42.182C13.2438 41.4597 12.7552 40.4007 12.7552 39.2894C12.7552 34.2881 16.803 30.2854 21.8054 30.2854H32.197C37.2006 30.2854 41.2329 34.2881 41.2329 39.2894C41.2329 40.4018 40.7467 41.4586 39.8987 42.1808C36.4238 45.1481 31.9159 46.9401 26.9941 46.9401Z"
                fill="#ccc"
              />
            </Svg>
          )}
          {index === users.length - 1 && (
            <Text
              style={[
                { left: index === 0 ? 30 : index === 1 ? 45 : 60 },
                styles.name,
              ]}
              numberOfLines={1}
            >
              {user.full_name.slice(0, WIDTH_SCREEN > 411 ? 20 : 14)}{" "}
              {users.length > 1 && " y ...ver más"}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  contentAvatars: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 20 / 2,
    position: "absolute",
    borderColor: Colors.tint,
    resizeMode: "contain",
  },
  name: {
    fontSize: 13,
    fontFamily: "RobotoMedium",
    color: Colors.text,
  },
});
