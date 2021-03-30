import { createSlice } from "@reduxjs/toolkit";
import { IMe } from "../../interfaces/interfaces";
import { RootState } from "../store";
import { api } from "./api";

interface AuthState {
  user: IMe;
  isFetching: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: {} as IMe,
  isFetching: true,
  isLoggedIn: false,
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
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      api.endpoints.me.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.result;
        state.isFetching = false;
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(api.endpoints.me.matchRejected, (state) => {
      state.isFetching = false;
    });
    builder.addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
      state.user = {} as IMe;
      state.isLoggedIn = false;
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
