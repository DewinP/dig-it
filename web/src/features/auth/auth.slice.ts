import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/services/api";
import { RootState } from "../../app/store";
import { IUser } from "../../interfaces/interfaces";

interface AuthState {
  user: IUser;
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
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;

export default authSlice.reducer;
