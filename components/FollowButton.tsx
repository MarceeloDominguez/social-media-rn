import { Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/provider/AuthProvider";
import { useFollowUser, useGetFollowers, useUnFollowUser } from "@/api/post";

type FollowButtonProps = {
  followingId: string | undefined;
};

export default function FollowButton({ followingId }: FollowButtonProps) {
  const { profile } = useAuth();

  const { mutate: followUser, isPending: isPendingFollowUser } =
    useFollowUser();
  const { mutate: unFollowUser, isPending: isPendingUnFollowUser } =
    useUnFollowUser();

  const { data: followers, isLoading } = useGetFollowers(followingId!);

  console.log(followers);

  const isFollowing = followers?.some((f) => f.follower_id === profile?.id);

  const handleToggleFollowsUnfollows = () => {
    if (isFollowing) {
      unFollowUser({ followerId: profile?.id!, followingId: followingId! });
    } else {
      followUser({ followerId: profile?.id!, followingId: followingId! });
    }
  };

  if (isLoading || isPendingFollowUser || isPendingUnFollowUser) {
    return (
      <Pressable style={[styles.container, { width: isFollowing ? 120 : 100 }]}>
        <ActivityIndicator size={15} color="#fff" />
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.container, { width: isFollowing ? 120 : 100 }]}
      onPress={handleToggleFollowsUnfollows}
    >
      <Text style={styles.buttonText}>
        {isFollowing ? "Dejar de seguir" : "Seguir"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tint,
    height: 30,
    //width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30 / 2,
  },
  buttonText: {
    color: Colors.background,
    fontFamily: "RobotoMedium",
  },
});
