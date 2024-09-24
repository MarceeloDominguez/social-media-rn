import {
  InsertPost,
  Like,
  Post,
  PostsLiked,
  PostsSaved,
  UpdatePost,
  UpdateUser,
  User,
} from "@/assets/data/data";
import { supabase } from "../supabase";

//POST
export const getAllPosts = async () => {
  const { data: posts, error } = await supabase
    .from("post")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return posts;
};

export const getAllPostsByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createPost = async (post: InsertPost) => {
  const { data: newPost, error } = await supabase
    .from("post")
    .insert({
      description: post.description,
      image: post.image,
      user_id: post.user_id,
    })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return newPost;
};

export const deletePost = async (id: number) => {
  const { error } = await supabase.from("post").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};

export const updatePost = async (post: UpdatePost) => {
  const { data: updatedPosts, error } = await supabase
    .from("post")
    .update({ image: post.image, description: post.description })
    .eq("id", post.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updatedPosts;
};

export const getPost = async (id: number) => {
  const { data: post, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return post as UpdatePost;
};

//LIKES
export const getLikes = async (postId: string) => {
  const { data: likes, error } = await supabase
    .from("likes")
    .select(
      `
      id,
      post_id,
      user_id,
      profiles ( full_name, avatar_url )
    `
    )
    .eq("post_id", postId);

  if (error) {
    throw new Error(error.message);
  }

  return likes as unknown as Like[];
};

export const addLike = async (postId: string, userId: string) => {
  const { data, error } = await supabase
    .from("likes")
    .insert([{ post_id: postId, user_id: userId }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const removeLike = async (postId: string, userId: string) => {
  const { data, error } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getAllPostsLikedByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("likes")
    .select("*, post(*)")
    .order("created_at", { ascending: false })
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data as PostsLiked[];
};

//SAVE
export const savePost = async (postId: string, userId: string) => {
  const { data, error } = await supabase
    .from("saved")
    .insert([{ post_id: postId, user_id: userId }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const removeSavedPost = async (postId: string, userId: string) => {
  const { data, error } = await supabase
    .from("saved")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getAllPostsSavedByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("saved")
    .select("*, post(*)")
    .order("created_at", { ascending: false })
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data as PostsSaved[];
};

//FOLLOWS
export const followUser = async (followerId: string, followingId: string) => {
  const { data, error } = await supabase
    .from("follows")
    .insert([{ follower_id: followerId, following_id: followingId }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const unfollowUser = async (followerId: string, followingId: string) => {
  const { data, error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getFollowers = async (userId: string) => {
  const { data: followers, error } = await supabase
    .from("follows")
    .select(
      `
      follower_id,
      profiles!follower_id ( full_name, avatar_url, bio )
    `
    )
    .eq("following_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return followers;
};

export const getFollowing = async (userId: string) => {
  const { data: following, error } = await supabase
    .from("follows")
    .select(
      `
      following_id,
      profiles!following_id ( full_name, avatar_url, bio )
    `
    )
    .eq("follower_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return following;
};

//PROFILE
export const getProfileById = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as User;
};

export const getAllProfiles = async () => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data as User[];
};

export const updateProfile = async (profile: UpdateUser) => {
  const { data: updatedProfile, error } = await supabase
    .from("profiles")
    .update({
      username: profile.username,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      bio: profile.bio,
      location: profile.location,
      banner: profile.banner,
    })
    .eq("id", profile.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updatedProfile;
};
