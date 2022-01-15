import React from 'react';
import './Post_card.controller.css'
import TestImg from './../../../images/testimg1.jpg'
import ProfilePic from '../../Common/ProfilePic/ProfilePic.controller';
export default function PostCard() {
    return (
        <div style={{cursor: "pointer"}} className="post"> {/* TODO : Use React router Link here*/}
            <div className="post-user">
                <div className='post-card-profile-container'>
                    <ProfilePic
                        outline = {true}
                        link = '#'
                    />
                </div>
                <a href="#" className='post-card-profile-username'> <span>iteme</span></a>
            </div>
            <div className="location-img">
                <img src={TestImg} width="100%" alt="Some name" />
            </div>
            <div className="post-description">
                <h4 className="location-name">Cool Place</h4>
                <p>Not the best description</p>
            </div>
            <div className="interact">
                <div className="post-interact post-like" id = "someid">
                    <i className="far fa-thumbs-up post-interact-icon"></i>
                    <p className="post-like-count"><span className='total-like'>5</span> likes</p>
                </div>
                <div className="post-interact post-comment">
                    <i className="fas fa-comment-alt post-interact-icon"></i>
                    <p className="post-like-count"><span>4</span> comments</p>
                </div>
                <div className="post-interact post-share">
                    <i className="fas fa-share post-interact-icon"></i>
                </div>
            </div>
        </div>
    )
}
