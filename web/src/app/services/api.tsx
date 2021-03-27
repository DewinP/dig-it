import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import {
  ICommunity,
  ICommunityInput,
  ILoginInput,
  IMe,
  IPost,
  IRegisterInput,
  ISubscription,
} from "../../interfaces/interfaces";

export const api = createApi({
  reducerPath: "apiPath",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  entityTypes: ["Community", "Me", "Post", "User"],
  endpoints: (build) => {
    return {
      communities: build.query<ICommunity[], void>({
        query: () => "c",
        provides: (returnValue) => [
          { type: "Community" as const, id: 1 },
          ...returnValue.map((c) => ({
            type: "Community" as const,
            id: c.name,
          })),
        ],
      }),
      community: build.query<ICommunity, string>({
        query: (name) => `c/${name}`,
        provides: (returnValue, args) => [
          {
            type: "Community" as const,
            id: returnValue.id,
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
      subscribe: build.mutation<ISubscription, string>({
        query: (communityId) => ({
          url: "c/sub",
          method: "POST",
          body: { communityId },
        }),
        invalidates: (_) => [{ type: "Community", id: 1 }],
      }),
      unsubscribe: build.mutation<string, string>({
        query: (communityId) => ({
          url: "c/unsub",
          method: "POST",
          body: { communityId },
        }),
        invalidates: () => [{ type: "Community", id: 1 }],
      }),
      login: build.mutation<IMe, ILoginInput>({
        query: (input) => ({
          url: "auth/login",
          method: "POST",
          body: input,
        }),
      }),
      register: build.mutation<{}, IRegisterInput>({
        query: (input) => ({
          url: "auth/register",
          method: "POST",
          body: input,
        }),
      }),
      me: build.query<IMe, void>({
        query: () => "auth/me",
      }),
      user: build.query<IPost, string>({
        query: (name) => `posts/${name}`,
        provides: (_, args) => [
          {
            type: "User" as const,
            id: args,
          },
        ],
      }),
      post: build.query<IPost, string>({
        query: (name) => `posts/${name}`,
        provides: (_, args) => [
          {
            type: "Post" as const,
            id: args,
          },
        ],
      }),
      createPost: build.mutation<
        IPost,
        { title: string; body: string; communityId: string }
      >({
        query: (input) => ({
          url: "posts/",
          method: "POST",
          body: input,
        }),
      }),
    };
  },
});

export const {
  useCommunityQuery,
  useCreateCommunityMutation,
  useCommunitiesQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
  useLoginMutation,
  useRegisterMutation,
  useMeQuery,
  useUserQuery,
  usePostQuery,
  useCreatePostMutation,
} = api;
