import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import { IPost, IPostInput } from "../../interfaces/interfaces";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  entityTypes: ["Post"],
  endpoints: (build) => {
    return {
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

export const { useCreatePostMutation, usePostQuery } = postApi;
