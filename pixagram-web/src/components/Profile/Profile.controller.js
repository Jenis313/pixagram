import React from 'react';
import ProfilePic from '../Common/ProfilePic/ProfilePic.controller';
import PostCard from '../Home/Post_card/Post_card.controller';
import './Profile.controller.css';
export default function Profile() {
    return (
        <div className='profile-main'>
            <div className="container">
                {/* <!-- left cont --> */}
                <section className="main-left">
                    {/* <h1>Your posts</h1> */}
                    <h1><span>Jenis</span>'s posts</h1>
                    <div className="posts-container">
                        <PostCard />
                    </div>
                </section> 
                {/* <!-- Right Cont --> */}
                <section className="main-right">
                    <div className="profile-container">
                        <div className="top-color"></div>
                        <div className="current-profile-pic">
                            {/* <img src="./../images/profile.png" width="100px" alt=""> */}
                            <ProfilePic 
                                outline = {true}
                                size = {"80px"}
                            />
                        </div>
                        {/* <%if(currentUser.username == result.username){%> */}
                            <div className="edit-profile">
                                <a href="#"><i className="fas fa-cog"></i></a>
                            </div>
                        {/* <%}%> */}
                        <div className="profile-info">
                            <p className="full-name">Jenis Rai</p>
                            <p className="username">@<span>jenispanda</span></p>
                        </div>
                        {/* <%if(currentUser.username == result.username){%> */}
                        <div className="new-post-profile">
                            <a href="/location/new">Add a new post</a>
                        </div>
                        {/* <%}%> */}

                    </div>
                </section>
            </div>
        </div>
    )
}
