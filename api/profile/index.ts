import { UpdateUser } from "@/assets/data/data";
import {
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "@/lib/react-query/queriesAndMutations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProfileById = (userId: string) => {
  return useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => getProfileById(userId),
  });
};

export const useGetAllProfile = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: () => getAllProfiles(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: UpdateUser) => updateProfile(profile),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      queryClient.invalidateQueries({ queryKey: ["profiles", data.id] });
    },
  });
};
