import { useCommunityQuery } from "../../app/services/api";

export const useGetCommunity = (communityName: string) => {
  const { data, isLoading, isError } = useCommunityQuery(communityName);
  return { data, isLoading, isError };
};
