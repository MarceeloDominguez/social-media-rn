import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { Post } from "@/assets/data/data";
import FollowButton from "./FollowButton";
import UserLikesCard from "./UserLikesCard";
import PostDescription from "./PostDescription";
import { Colors } from "@/constants/Colors";
import { Link, usePathname } from "expo-router";
import { useAuth } from "@/provider/AuthProvider";
import Svg, { Path } from "react-native-svg";
import { useGetProfileById } from "@/api/profile";
import ImageDefault from "./ImageDefault";
import { formatDate } from "@/util/formatDate";
import RemotaImage from "./RemotaImage";
import {
  useAddLike,
  useGetAllPostsSavedByUser,
  useGetLikes,
  useRemoveLike,
  useRemoveSavePost,
  useSavePost,
} from "@/api/post";

type PostCardProps = {
  post: Post;
  showUser?: boolean;
};

export default function PostCard({ post, showUser = false }: PostCardProps) {
  const { profile } = useAuth();
  const pathname = usePathname();

  const { data: user, isLoading: isLoadingUser } = useGetProfileById(
    post.user_id
  );

  //functionality for "liking" a post
  const { data: likes } = useGetLikes(post.id);
  const { mutate: addLike } = useAddLike();
  const { mutate: removeLike } = useRemoveLike();

  const alreadyLiked = likes?.some((like) => like.user_id === profile?.id);

  const toggleLike = () => {
    if (alreadyLiked) {
      removeLike({ postId: post.id, userId: profile?.id! });
    } else {
      addLike({ postId: post.id, userId: profile?.id! });
    }
  };

  //functionality to "save" a post
  const { data: savedPosts } = useGetAllPostsSavedByUser(profile?.id!);
  const { mutate: savePost } = useSavePost();
  const { mutate: removeSavePost } = useRemoveSavePost();

  const alreadySaved = savedPosts?.some((save) => save.post_id === post.id);

  const toggleSaved = () => {
    if (alreadySaved) {
      removeSavePost({ postId: post.id, userId: profile?.id! });
    } else {
      savePost({ postId: post.id, userId: profile?.id! });
    }
  };

  if (isLoadingUser) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size={22} color={Colors.tint} />
      </View>
    );
  }

  const formattedDate = formatDate(post.created_at);

  return (
    <View style={styles.container}>
      {pathname === "/" || showUser ? (
        <View style={styles.wrapperTopCard}>
          <Link href={`/profile/${user?.id}` as `${string}:${string}`} asChild>
            <Pressable style={styles.contentTopCard}>
              {user?.avatar ? (
                <Image source={{ uri: user?.avatar }} style={styles.avatar} />
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
                  {user?.full_name}
                </Text>
                <Text numberOfLines={1} style={styles.username}>
                  {user?.username}
                </Text>
              </View>
            </Pressable>
          </Link>
          {profile?.id === post.user_id ? (
            <Link
              href={`/create?id=${post.id}` as `${string}:${string}`}
              asChild
            >
              <Pressable style={styles.containerIconEdit}>
                <FontAwesome6 name="edit" size={22} color={Colors.icon} />
              </Pressable>
            </Link>
          ) : (
            <FollowButton followingId={user?.id} />
          )}
        </View>
      ) : (
        <View style={{ height: 20, backgroundColor: "#fff" }} />
      )}
      {post.image ? (
        <RemotaImage path={post.image} style={styles.imagePost} />
      ) : (
        <ImageDefault />
      )}
      <View style={styles.wrapperBottomCard}>
        <UserLikesCard postId={post.id} />
        <View style={styles.contentBottomEnd}>
          <View style={styles.contentIconHeart}>
            <Text style={styles.countLikes}>
              {likes?.length !== 0 && likes?.length}
            </Text>
            <Ionicons
              name={alreadyLiked ? "heart" : "heart-outline"}
              size={22}
              color={alreadyLiked ? "#dd0808" : Colors.icon}
              onPress={toggleLike}
            />
          </View>
          <Ionicons
            name={alreadySaved ? "bookmark" : "bookmark-outline"}
            size={22}
            color={alreadySaved ? Colors.tint : Colors.icon}
            onPress={toggleSaved}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 10, paddingBottom: 10, paddingTop: 4 }}>
        <PostDescription description={post.description} />
        <Text style={styles.time}>{formattedDate}</Text>
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
    overflow: "hidden",
  },
  wrapperTopCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 10,
  },
  contentTopCard: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  containerIconEdit: {
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 45 / 2,
    borderWidth: 2,
    borderColor: Colors.tint,
  },
  name: {
    fontSize: 15,
    fontFamily: "RobotoBold",
    marginRight: 5,
  },
  username: {
    color: Colors.text,
    fontFamily: "RobotoMedium",
    marginRight: 5,
    fontSize: 13,
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
    color: Colors.text,
  },
  time: {
    textAlign: "right",
    fontSize: 12,
    marginTop: 10,
    color: Colors.text,
  },
  containerLoading: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
