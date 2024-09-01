import { User } from "@/assets/data/data";
import { supabase } from "../supabase";

//POST
export const getAllPosts = async () => {
  const { data, error } = await supabase.from("post").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getAllPostsByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
