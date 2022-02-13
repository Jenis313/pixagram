import React from 'react';
import ProfilePic from '../../../Common/ProfilePic/ProfilePic.controller';
import './Comment.controller.css';

export default function Comment(props) {
    let comment = props.comment;
    // console.log('Comments props -->', comment)
    const createdAt = comment.createdAt.slice(0, 10)
    return (
        <div>
            {/* <% if(comments.length){%>    */}
            {/* <% for(let i = 0; i < comments.length; i++) {%> */}
                <div className="indiv-comment">
                    {/* <a href="/users/<%= comments[i].user._id %>"><img src="./../images/profile.png" alt="profile" className="comment-profile" /></a> */}
                    <ProfilePic 
                        outline = {false}
                        link = {`/users/${comment.user._id}`}
                        img = {comment.user.image}
                    />
                    <div className="comment-and-name">
                        <h5> {comment.user.fullName} </h5>
                        <small>{createdAt}</small>
                        <p>{comment.message}</p>
                    </div>
                </div>
            {/* <%}%>                      */}
        {/* <% } %>                         */}
        </div>
    )
}
