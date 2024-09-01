import {
  getAllPosts,
  getAllPostsByUser,
} from "@/lib/react-query/queriesAndMutations";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPosts(),
  });
};

export const useGetAllPostsByUser = (userId: string) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getAllPostsByUser(userId),
  });
};
