import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

 const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

export const CreatePostPage = () => {
    const navigate = useNavigate();
    const [postData , setPostData] = useState({
        title : "",
        summary : "",
        content : "",
        files : ""
    })
    const createNewPost = async (ev) => {
        ev.preventDefault();
        const data = new FormData();
        data.set("title" , postData.title);
        data.set("summary" , postData.summary);
        data.set("file" , postData.files[0]);
        data.set("content" , postData.content);

        const response =  await fetch("http://localhost:4000/post" , {
            method : "POST",
            body : data,
            credentials : "include"
        })
        if(response.ok) {
            navigate("/");
        }
    }
    return <form onSubmit={createNewPost} className="create-post">
        <input type = "title" placeholder="Title..." value={postData.title} onChange={ev => setPostData({...postData , title : ev.target.value})} />
        <input type = "text" placeholder="Summary..." value={postData.summary} onChange={ev => setPostData({...postData , summary : ev.target.value})} />
        <input type="file" onChange = {ev => setPostData({...postData , files : ev.target.files})} />
        <ReactQuill value={postData.content} modules={modules} formats={formats} onChange={value => setPostData({...postData , content : value})} placeholder="Content..." />
        <button type="submit">Add post</button>
    </form>
}