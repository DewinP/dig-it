import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { SERVER } from "../../config/constants";
import {
  ISubscription,
  IPost,
  IFieldError,
  ILoginInput,
  IRegisterInput,
} from "../../interfaces/interfaces";

interface UserState {
  user: IUser;
  isLoggedIn: boolean;
  isLoadingUser: boolean;
}

interface IUser {
  id: string;
  username: string;
  email: string;
  posts: IPost[];
  subscriptions: ISubscription[];
  createdAt: Date;
}

const initialState: UserState = {
  user: {} as IUser,
  isLoggedIn: false,
  isLoadingUser: false,
};

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ username, password }: ILoginInput, { rejectWithValue }) => {
    try {
      let { data } = await axios.post<IUser>(`${SERVER}/auth/login`, {
        username,
        password,
      });
      return data;
    } catch ({ response }) {
      let fieldErrors = response.data;
      return rejectWithValue(fieldErrors as IFieldError[]);
    }
  }
);

export const fetchMe = createAsyncThunk("users/fetchMe", async () => {
  let { data } = await axios.get<IUser>(`${SERVER}/auth/me`);
  return data;
});

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (
    { username, email, password }: IRegisterInput,
    { rejectWithValue }
  ) => {
    try {
      await axios.post(`${SERVER}/auth/register`, {
        username,
        email,
        password,
      });
    } catch ({ response }) {
      let fieldErrors = response.data;
      return rejectWithValue(fieldErrors as IFieldError[]);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    });
    builder.addCase(fetchMe.fulfilled, (state, { payload }) => {
      if (payload.id) {
        state.isLoggedIn = true;
        state.user = payload;
        state.isLoadingUser = false;
      }
    });
    builder.addCase(fetchMe.pending, (state) => {
      state.isLoggedIn = false;
      state.isLoadingUser = true;
    });
  },
});

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
