import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { userProfileAction } from "./usersSlice";
//Create Post action

//action to redirect
const resetPost = createAction("category/reset");
const resetPostEdit = createAction("post/reset");
const resetPostDelete = createAction("post/delete");

const hostname =
  typeof window !== "undefined" && window.location.hostname
    ? window.location.hostname
    : "";
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";
//Create
export const createpostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    // console.log(post);
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const postData = { ...post };
      // console.log("from redx " + formData);
      const { data } = await axios.post(`${origin}/api/posts`, postData, config);
      //dispatch action
      dispatch(resetPost());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update
export const updatePostAction = createAsyncThunk(
  "post/updated",
  async (post, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.put(`${origin}/api/posts/${post?.id}`, post, config);
      //dispatch
      dispatch(resetPostEdit());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Delete
export const deletePostAction = createAsyncThunk(
  "post/delete",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.delete(`${origin}/api/posts/${postId}`, config);
      //dispatch
      dispatch(resetPostDelete());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all posts
export const fetchPostsAction = createAsyncThunk(
  "post/list",
  async ({url}, { rejectWithValue, getState, dispatch }) => {
    try
    {
      const dev = process.env.NODE_ENV !== "production";
      // console.log("originUrl", window.location.origin)
      const server = dev
        ? "http://localhost:3000"
        : productionLink;
      const { data } = await axios.get(
        `${url}/api/posts`
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetch Post details
export const fetchPostDetailsAction = createAsyncThunk(
  "post/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${origin}/api/posts/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Add Likes to post
export const toggleAddLikesToPost = createAsyncThunk(
  "post/like",
  async (post, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `/api/posts/likes`,
        { id:post.id },
        config
      );
      post?.profile && dispatch(userProfileAction(post?.user))
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Add DisLikes to post
export const toggleAddDisLikesToPost = createAsyncThunk(
  "post/dislike",
  async (post, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `/api/posts/dislikes`,
        { id:post.id },
        config
      );
      post?.profile && dispatch(userProfileAction(post?.user))
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// comments 

export const createCommentAction = createAsyncThunk(
  "post/comment/create",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${origin}/api/comments`,
        {
          description: comment?.commentData?.description,
          postId: comment?.commentData?.postId,
        },
        config
      );
      comment?.profile && dispatch(userProfileAction(comment.user))

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete
export const getCommentsAction = createAsyncThunk(
  "post/comment/all",
  async ({url}, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try
    {
      
      // let link = postId
      //   ? `${origin}/api/comments?post=${postId}`
      //   : `${origin}/api/comments`

      const dev = process.env.NODE_ENV !== "production";

      let link = `${url}/api/comments`;
      const { data } = await axios.get(link, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//delete
export const deleteCommentAction = createAsyncThunk(
  "post/comment/delete",
  async (commentId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.delete(`${origin}/api/comments/${commentId}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update
export const updateCommentAction = createAsyncThunk(
  "post/comment/update",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${origin}/api/comments/${comment?.id}`,
        { description: comment?.description, postId: comment?.postId },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch comment details
export const fetchCommentAction = createAsyncThunk(
  "post/comment/fetch-details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = process.browser &&  getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${origin}/api/comments/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//slice
const postSlice = createSlice({
  name: "post",
  initialState: {
    postLists: [],
    comments:[],
    actionLoading:false,
    serverErr: null,
    isCreated: false,
    isUpdated: false,
    profileLoading:false,
  },
  reducers: {
    reset: (state) => {
      state.appErr = null;
      state.serverErr = null;
      state.isCreated = false;
    },
  },
  extraReducers: (builder) => {
    //create post
    builder.addCase(createpostAction.pending, (state, action) => {
      state.createPostLoading = true;
    });
    builder.addCase(createpostAction.fulfilled, (state, action) => {
      state.createPostLoading = false;
      state.postLists = action.payload.posts;
      state.isCreated = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(createpostAction.rejected, (state, action) => {
      state.createPostLoading = false;
      state.appErr =
        action?.payload?.message || action?.payload?.error?.message;
      state.serverErr = action?.error?.message;
    });

    //Update post
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostEdit, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      
      state.postUpdated = action?.payload;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
      state.isUpdated = false;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Delete post
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostDelete, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload;
      state.isDeleted = false;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch posts
    builder.addCase(fetchPostsAction.pending, (state, action) =>
    {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) =>
    {
      console.log("fetchFul",action.payload)
      state.postLists = action?.payload;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) =>
    {
      console.log("fetchErr",action.error.message)
      state.loading = false;
      state.appErr = null;
      state.serverErr = action?.error?.message;
    });

    //fetch post Details
    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.postDetails = action?.payload;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //Likes
    builder.addCase(toggleAddLikesToPost.pending, (state, action) => {
      state.actionLoading = true;
    });
    builder.addCase(toggleAddLikesToPost.fulfilled, (state, action) => {
      state.postLists = action?.payload?.posts
      state.likes = action?.payload?.post;
      state.actionLoading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(toggleAddLikesToPost.rejected, (state, action) => {
      state.actionLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //DisLikes
    builder.addCase(toggleAddDisLikesToPost.pending, (state, action) => {
      state.actionLoading = true;
    });
    builder.addCase(toggleAddDisLikesToPost.fulfilled, (state, action) => {
      state.postLists = action?.payload?.posts;
      state.dislikes = action?.payload?.post;
      state.actionLoading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(toggleAddDisLikesToPost.rejected, (state, action) => {
      state.actionLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // comments 
    // create
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.createCommentLoading = true;
    });
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.createCommentLoading = false;
      state.postLists = action?.payload?.posts;
      state.comments = action.payload.comments;
      state.commentCreated = action?.payload.comment;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.createCommentLoading = false;
      state.commentCreated = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //delete
    builder.addCase(deleteCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDeleted = action?.payload;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(deleteCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //delete
    builder.addCase(getCommentsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCommentsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(getCommentsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });

    //update
    builder.addCase(updateCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentUpdated = action?.payload;
      state.isUpdate = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(updateCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch details
    builder.addCase(fetchCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDetails = action?.payload;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(fetchCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export const { reset } = postSlice.actions;

export default postSlice.reducer;