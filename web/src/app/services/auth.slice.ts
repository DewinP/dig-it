import { createSlice } from "@reduxjs/toolkit";
import { IMe } from "../../interfaces/interfaces";
import { RootState } from "../store";
import { api } from "./api";

interface AuthState {
  user: IMe;
  isFetching: boolean;
}

const initialState: AuthState = {
  user: {} as IMe,
  isFetching: true,
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
        state.isFetching = false;
      }
    );
    builder.addMatcher(api.endpoints.me.matchRejected, (state, { payload }) => {
      state.isFetching = false;
    });
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
    builder.addMatcher(
      api.endpoints.unsubscribe.matchFulfilled,
      (state, { payload }) => {
        state.user.subscriptions = state.user.subscriptions.filter((s) => {
          return s.id !== payload.result;
        });
      }
    );
    builder.addMatcher(
      api.endpoints.createPost.matchFulfilled,
      (state, { payload }) => {
        state.user.posts.push(payload.result);
      }
    );
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;

export default authSlice.reducer;
