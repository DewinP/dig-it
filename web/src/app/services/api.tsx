import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import {
  ICommunity,
  ICommunityInput,
  ILoginInput,
  IPost,
  IRegisterInput,
  IUser,
} from "../../interfaces/interfaces";

export const api = createApi({
  reducerPath: "apiPath",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  entityTypes: ["Community", "Me", "Post"],
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
      login: build.mutation<IUser, ILoginInput>({
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
        { title: string; body: string; community: string }
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
  useLoginMutation,
  useRegisterMutation,
  usePostQuery,
  useCreatePostMutation,
} = api;
