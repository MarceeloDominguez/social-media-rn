import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/provider/AuthProvider";
import {
  useFollowUser,
  //useGetFollowers,
  useIsFollowing,
  useUnFollowUser,
} from "@/api/post";

type FollowButtonProps = {
  followingId: string | undefined;
};

export default function FollowButton({ followingId }: FollowButtonProps) {
  const { profile } = useAuth();
  const {
    data: isFollowing,
    isLoading,
    refetch,
  } = useIsFollowing(profile?.id!, followingId!);
  const { mutate: followUser, isPending: isFollowLoading } = useFollowUser();
  const { mutate: unFollowUser, isPending: isUnFollowLoading } =
    useUnFollowUser();

  //const { data: followers } = useGetFollowers(followingId!);

  //const isFollowing = followers?.some((f) => f.follower_id === profile?.id);

  const handleToggleFollowsUnfollows = () => {
    if (isFollowing) {
      unFollowUser({ followerId: profile?.id!, followingId: followingId! });
    } else {
      followUser({ followerId: profile?.id!, followingId: followingId! });
    }
  };

  if (isLoading || isFollowLoading || isUnFollowLoading) {
    return (
      <Pressable style={styles.container}>
        <Text style={styles.buttonText}>Cargando...</Text>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.container} onPress={handleToggleFollowsUnfollows}>
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
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30 / 2,
  },
  buttonText: {
    color: Colors.background,
    fontFamily: "RobotoMedium",
  },
});
