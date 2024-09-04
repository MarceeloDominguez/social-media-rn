import { InsertPost } from "@/assets/data/data";
import {
  createPost,
  getAllPosts,
  getAllPostsByUser,
} from "@/lib/react-query/queriesAndMutations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: InsertPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
