import { combineReducers } from "redux";
import usersReducer from "./usersSlice";
import postsReducer from "./postsSlice";
import commentsReducer from "./commentSlices";
import notificationssReducer from "./notificationsSlice";
import { HYDRATE } from "next-redux-wrapper";
const combinedReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  notifications: notificationssReducer,
});

export const rootReducer = (state, action) =>
{
  switch (action.type) {
    case HYDRATE:
      return {
        ...state, // prev state
        ...action.payload,
        // ...action.payload.posts, // new data
      };
    default:
      return combinedReducer(state, action);
  }
  
  // if ()
  // {
  //   // if (action.payload.users.userAuth === {}) delete action.payload.users.userAuth;
  //   console.log("new payload.....", action.payload);
  //   const nextState = {

  //     ...state, // use previous state
  //     ...action.payload
  //   };
  //   console.log("next state.....", nextState);

  //   return nextState;
  // } else {

  // }
};