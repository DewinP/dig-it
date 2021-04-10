import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import {
  ICommunity,
  ICommunityInput,
  ILoginInput,
  IMe,
  IPost,
  IPostInput,
  IRegisterInput,
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
          { type: "Community" as const, id: "all" },
          ...returnValue.map((c) => ({
            type: "Community" as const,
            id: c.id,
          })),
        ],
      }),
      community: build.query<ICommunity, string>({
        query: (name) => `c/${name}`,
        provides: (returnValue) => [
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
        invalidates: [{ type: "Community", id: "all" }],
      }),
      subscribe: build.mutation<{}, string>({
        query: (communityId) => ({
          url: "c/sub",
          method: "POST",
          body: { communityId },
        }),
        invalidates: (_, args) => [
          { type: "Community", id: "all" },
          { type: "Community", id: args },
        ],
      }),
      unsubscribe: build.mutation<string, string>({
        query: (communityId) => ({
          url: "c/unsub",
          method: "DELETE",
          body: { communityId },
        }),
        invalidates: (_, args) => [
          { type: "Community", id: "all" },
          { type: "Community", id: args },
        ],
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
        provides: (returnValue) => [
          {
            type: "User" as const,
            id: returnValue.id,
          },
        ],
      }),
      post: build.query<IPost, string>({
        query: (title) => `posts/${title}`,
        provides: (returnValue) => [
          {
            type: "Post" as const,
            id: returnValue.id,
          },
        ],
      }),
      communityPosts: build.query<IPost[], string>({
        query: (communityId) => `posts/community/${communityId}`,
        provides: (returnValue, args) => [
          { type: "Post" as const, id: args },
          ...returnValue.map((p) => ({
            type: "Post" as const,
            id: p.id,
          })),
        ],
      }),
      userPosts: build.query<IPost[], string>({
        query: (username) => `posts/user/${username}`,
        provides: (returnValue) => [
          ...returnValue.map((p) => ({
            type: "Post" as const,
            id: p.id,
          })),
        ],
      }),
      allPosts: build.query<IPost[], void>({
        query: () => `posts`,
        provides: (returnValue) => [
          { type: "Post" as const, id: 1 },
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
          { type: "Post", id: returnValue.author.id },
        ],
      }),
      likePost: build.mutation<{}, { postId: string; communityId: string }>({
        query: ({ postId, communityId }) => ({
          url: "posts/like",
          method: "POST",
          body: { postId, communityId },
        }),
        invalidates: (_, args) => [{ type: "Post", id: args.postId }],
      }),
      unlikePost: build.mutation<{}, string>({
        query: (postId) => ({
          url: "posts/like",
          method: "DELETE",
          body: { postId },
        }),
        invalidates: (_, args) => [{ type: "Post", id: args }],
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
  useAllPostsQuery,
  useCommunityPostsQuery,
  useCreatePostMutation,
  useUserPostsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} = api;
