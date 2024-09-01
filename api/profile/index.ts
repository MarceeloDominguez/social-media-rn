import {
  getAllProfiles,
  getProfileById,
} from "@/lib/react-query/queriesAndMutations";
import { useQuery } from "@tanstack/react-query";

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
