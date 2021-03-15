import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import {
  ILoginInput,
  IRegisterInput,
  IUser,
} from "../../interfaces/interfaces";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (build) => {
    return {
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
    };
  },
});

export const { useLoginMutation, useRegisterMutation } = authApi;
