import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { SERVER } from "../../config/constants";
import { ICommunity } from "../../interfaces/interfaces";

interface CommunitiesState {
  communities: ICommunity[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: CommunitiesState = {
  communities: [] as ICommunity[],
  isLoading: false,
  isError: false,
};

export const fetchCommunities = createAsyncThunk(
  `communities/fetchCommunities`,
  async (_, { getState }) => {
    let { data } = await axios.get<ICommunity[]>(`${SERVER}/c`);
    return data;
  }
);

export const communitiesSlice = createSlice({
  name: "communities",
  initialState,
  reducers: {
    addCommunity: (state, action: PayloadAction<ICommunity>) => {
      state.communities.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCommunities.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCommunities.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchCommunities.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.communities = payload;
    });
  },
});

export const communitiesSelector = (state: RootState) => state.communities;

export default communitiesSlice.reducer;
