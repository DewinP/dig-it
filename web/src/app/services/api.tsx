import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import {
  ICommunity,
  ICommunityInput,
  ILoginInput,
  IMe,
  IPost,
  IPostInput,
  IRegisterInput,
  ISubscription,
  IUser,
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
        provides: (returnValue) => [
          {
            type: "Community" as const,
            id: returnValue.name,
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
      logout: build.mutation<{}, void>({
        query: () => ({
          url: "auth/logout",
          method: "DELETE",
        }),
      }),
      user: build.query<IUser, string>({
        query: (name) => `users/${name}`,
        provides: (_, args) => [
          {
            type: "User" as const,
            id: args,
          },
        ],
      }),
      post: build.query<IPost, string>({
        query: (title) => `posts/${title}`,
        provides: (_, args) => [
          {
            type: "Post" as const,
            id: args,
          },
        ],
      }),
      userPost: build.query<IPost[], string>({
        query: (username) => `posts/user/${username}`,
        provides: (returnValue) => [
          { type: "Post" as const, id: returnValue[0].author.id },
          ...returnValue.map((p) => ({
            type: "Post" as const,
            id: p.id,
          })),
        ],
      }),
      createPost: build.mutation<IPost, IPostInput>({
        query: (input) => ({
          url: "posts/",
          method: "POST",
          body: input,
        }),
        invalidates: (returnValue) => [
          { type: "Community", id: returnValue.community.name },
        ],
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
  useLogoutMutation,
  useUserQuery,
  usePostQuery,
  useCreatePostMutation,
  useUserPostQuery,
} = api;
