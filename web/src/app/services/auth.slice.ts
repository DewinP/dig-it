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
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;

export default authSlice.reducer;
