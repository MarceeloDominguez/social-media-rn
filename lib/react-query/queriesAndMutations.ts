import { InsertPost, UpdatePost, User } from "@/assets/data/data";
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
