import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
// import users from "./usersSlice";
import usersReducer from "./usersSlice";
import postsReducer from "./postsSlice";
import commentsReducer from "./commentSlices";
import notificationssReducer from "./notificationsSlice";

const combinedReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  notifications: notificationssReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
  });

export const wrapper = createWrapper(makeStore);
