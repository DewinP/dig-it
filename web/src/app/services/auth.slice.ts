import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/interfaces";
import { RootState } from "../store";
import { api } from "./api";

interface AuthState {
  user: IUser;
  isLoading: false;
}

const initialState: AuthState = {
  user: {} as IUser,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.result;
      }
    );
    builder.addMatcher(
      api.endpoints.me.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.result;
      }
    );
    builder.addMatcher(
      api.endpoints.createPost.matchFulfilled,
      (state, { payload }) => {
        state.user.posts.push(payload.result);
      }
    );
    builder.addMatcher(
      api.endpoints.createPost.matchFulfilled,
      (state, { payload }) => {
        state.user.posts.push(payload.result);
      }
    );
    builder.addMatcher(
      api.endpoints.subscribe.matchFulfilled,
      (state, { payload }) => {
        state.user.subscriptions.push(payload.result);
      }
    );
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;

export default authSlice.reducer;
