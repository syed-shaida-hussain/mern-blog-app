import React from "react"
import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom"

const PostCard = ({ _id ,title , summary , file , createdAt , author }) => {
    return (
        <section className='post'>
        <div className='image'>
        <Link to ={ `/post/${_id}`}>
            <img className='img' alt = "post-img" src = {`http://localhost:4000/`+file}/>
        </Link>
        </div>
        <div className='post-info'>
        <Link to ={ `/post/${_id}`}>
         <h2>{title}</h2>
        </Link>
          <div className='author-info'>
            <span>@{author.username}</span>
            <time> {formatISO9075(new Date(createdAt))}</time>
          </div>
          <p>{summary}</p>
        </div>
      </section>
    )
}

export {PostCard}