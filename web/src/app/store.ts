import { configureStore } from "@reduxjs/toolkit";
import communityReducer from "../features/community/community.slice";
import communitiesReducer from "../features/community/communities.slice";
import userReducer from "../features/user/user.slice";
import postReducer from "../features/post/post.slice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    community: communityReducer,
    communities: communitiesReducer,
    user: userReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
