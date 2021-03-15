import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import {
  ILoginInput,
  IRegisterInput,
  IUser,
} from "../../interfaces/interfaces";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  entityTypes: ["User", "Me"],
  endpoints: (build) => {
    return {
      users: build.query<IUser[], void>({
        query: () => "/c",
        provides: (returnValue) => [
          { type: "User" as const, id: 1 },
          ...returnValue.map((user) => ({
            type: "User" as const,
            id: user.username,
          })),
        ],
      }),
      user: build.query<IUser, string>({
        query: (username) => `/users/${username}`,
        provides: (_, args) => [
          {
            type: "User" as const,
            id: args,
          },
        ],
      }),
      login: build.mutation<{}, ILoginInput>({
        query: (input) => ({
          url: "/auth/login",
          method: "POST",
          body: input,
        }),
      }),
    };
  },
});
