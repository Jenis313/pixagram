import React from 'react';
import ProfilePic from '../../../Common/ProfilePic/ProfilePic.controller';
import './Comment.controller.css';
export default function Comment() {
    return (
        <div>
            {/* <% if(comments.length){%>    */}
            {/* <% for(let i = 0; i < comments.length; i++) {%> */}
                <div className="indiv-comment">
                    {/* <a href="/users/<%= comments[i].user._id %>"><img src="./../images/profile.png" alt="profile" className="comment-profile" /></a> */}
                    <ProfilePic 
                        outline = {false}
                    />
                    <div className="comment-and-name">
                        <h5> Jenis </h5>
                        <small>21-02-2021</small>
                        <p>This is nice comment</p>
                    </div>
                </div>
            {/* <%}%>                      */}
        {/* <% } %>                         */}
        </div>
    )
}
