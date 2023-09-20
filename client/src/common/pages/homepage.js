import React, { useEffect } from "react"
import { PostCard } from "../components/postCard"
import { fetchPosts } from "../../features/posts/postSlice"
import {useDispatch, useSelector} from "react-redux"

export const Homepage = () => {
    const dispatch = useDispatch();
    const {posts , status} = useSelector((store) => store.posts);
    // console.log(posts)
    useEffect(() => {
        dispatch(fetchPosts());
    },[])
    return status === "loading" ? <div>loading</div> : (
        <div>
            { posts.length > 0 ? posts.map((post) => <PostCard {...post} key={post._id} />) : <div>No posts</div>}
        </div>
    )
}