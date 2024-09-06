import { InsertPost, UpdatePost } from "@/assets/data/data";
import {
  addLike,
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsByUser,
  getLikes,
  getPost,
  removeLike,
  updatePost,
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

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: UpdatePost) => updatePost(post),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", data.id] });
    },
  });
};

export const useGetPost = (id: number) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });
};

export const useGetLikes = (postId: string) => {
  return useQuery({
    queryKey: ["likes", postId],
    queryFn: () => getLikes(postId),
  });
};

export const useAddLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      addLike(postId, userId),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["likes", data.postId] });
    },
  });
};

export const useRemoveLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      removeLike(postId, userId),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["likes", data.postId] });
    },
  });
};
