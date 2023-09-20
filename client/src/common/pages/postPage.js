import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePost } from "../../features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatISO9075 } from "date-fns";

export const SinglePostPage = () => {
    const dispatch = useDispatch();
    const {postId} = useParams();
    const {status , post} = useSelector((store) => store.posts);
    useEffect(() => {
        dispatch(fetchSinglePost(postId));
    },[])

    if(!post) return

    return status === "loading" ? <div>loading</div> : (<div>
        <div className="single-post">
        <h1>{post.title}</h1>
        <div className="post-info">
          <time> {formatISO9075(new Date(post.createdAt))}</time>
          <div className="author">by @{post.author.username}</div>
        </div>
        


        <div className="image">
            <img className='img' alt = "post-img" src = {`http://localhost:4000/`+ post.file}/>
        </div>
        <div dangerouslySetInnerHTML={{__html : post.content}} />

        </div>
    </div>)
}