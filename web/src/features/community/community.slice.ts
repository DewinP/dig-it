import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { SERVER } from "../../config/constants";
import {
  ICommunity,
  ICommunityInput,
  IFieldError,
} from "../../interfaces/interfaces";

interface CommunityState {
  community: ICommunity;
  isLoading: boolean;
  isError: boolean;
}

const initialState: CommunityState = {
  community: {} as ICommunity,
  isLoading: false,
  isError: false,
};

export const fetchCommunity = createAsyncThunk(
  `community/fetchCommunity`,
  async (name: string, { rejectWithValue }) => {
    try {
      let { data } = await axios.get<ICommunity>(`${SERVER}/c/${name}`);
      return data;
    } catch (error) {
      return rejectWithValue("some error");
    }
  }
);

export const createCommunity = createAsyncThunk(
  `community/createCommunity`,
  async ({ name, description }: ICommunityInput, { rejectWithValue }) => {
    try {
      let { data } = await axios.post<ICommunity>(`${SERVER}/c/`, {
        name,
        description,
      });
      console.log("data===", data);
      return data;
    } catch ({ response }) {
      let fieldErrors = response.data;
      return rejectWithValue(fieldErrors as IFieldError[]);
    }
  }
);

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommunity.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCommunity.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchCommunity.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.community = payload;
    });
    builder.addCase(createCommunity.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCommunity.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(createCommunity.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
  },
});

export const communitySelector = (state: RootState) => state.community;

export default communitySlice.reducer;
