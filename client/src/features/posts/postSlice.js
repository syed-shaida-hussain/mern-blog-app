const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    posts : [],
    post : null,
    status : "",
}

export const fetchPosts = createAsyncThunk("/posts" , async () => {
    const res = await fetch("http://localhost:4000/posts");
    const posts = await res.json();
    return posts
})

export const fetchSinglePost = createAsyncThunk("/posts/singlePost" , async (action) => {
    const postId = action
    const res = await fetch(`http://localhost:4000/post/${postId}`);
    const post = await res.json();
    return post

})

const postSlice = createSlice({
    name : "posts",
    initialState,
    reducers : {},
    extraReducers : {
        [fetchPosts.pending] : (state) => {
            state.status = "loading"
        },
        [fetchPosts.fulfilled] : (state,action) => {
            state.status = "fulfilled";
            state.posts = action.payload.posts;
        },
        [fetchSinglePost.pending] : (state) => {
            state.status = "loading"
        },
        [fetchSinglePost.fulfilled] : (state,action) => {
            state.status = "fulfilled";
            state.post = action.payload;
        }
    }
})

export default postSlice.reducer