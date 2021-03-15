import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import { ICommunity, ICommunityInput } from "../../interfaces/interfaces";

export const communityApi = createApi({
  reducerPath: "communityApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  entityTypes: ["Community"],
  endpoints: (build) => {
    return {
      communities: build.query<ICommunity[], void>({
        query: () => "c",
        provides: (returnValue, args) => [
          { type: "Community" as const, id: 1 },
          ...returnValue.map((c) => ({
            type: "Community" as const,
            id: c.name,
          })),
        ],
      }),
      community: build.query<ICommunity, string>({
        query: (name) => `c/${name}`,
        provides: (_, args) => [
          {
            type: "Community" as const,
            id: args,
          },
        ],
      }),
      createCommunity: build.mutation<ICommunity, ICommunityInput>({
        query: (input) => ({
          url: "c",
          method: "POST",
          body: input,
        }),
        invalidates: [{ type: "Community", id: 1 }],
      }),
    };
  },
});

export const {
  useCommunityQuery,
  useCreateCommunityMutation,
  useCommunitiesQuery,
} = communityApi;
