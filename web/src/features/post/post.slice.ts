import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { SERVER } from "../../config/constants";
import { StateStatus } from "../../interfaces/enums";
import { IPost } from "../../interfaces/interfaces";

interface PostState {
  post: IPost;
  isLoading: StateStatus;
}

const initialState: PostState = {
  post: {} as IPost,
  isLoading: StateStatus.IDLE,
};

export const fetchPost = createAsyncThunk(
  `community/fetchCommunity`,
  async (title: string, { rejectWithValue }) => {
    try {
      let { data } = await axios.get<IPost>(`${SERVER}/posts/${title}`);
      return data;
    } catch (error) {
      return rejectWithValue("some error");
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state) => {
      state.isLoading = StateStatus.PENDING;
    });
    builder.addCase(fetchPost.rejected, (state) => {
      state.isLoading = StateStatus.REJECTED;
    });
    builder.addCase(fetchPost.fulfilled, (state, { payload }) => {
      state.isLoading = StateStatus.FULLFILLED;
      state.post = payload;
    });
  },
});

export const communitySelector = (state: RootState) => state.post;

export default postSlice.reducer;
