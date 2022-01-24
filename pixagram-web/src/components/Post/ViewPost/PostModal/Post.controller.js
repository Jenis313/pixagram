import React, { Component } from 'react';
import './Post.controller.css'
import ProfilePic from '../../../Common/ProfilePic/ProfilePic.controller'
import Sidebar from '../../../Common/Sidebar/Sidebar.component'
import TestImg from './../../../../images/testimg1.jpg'
import Comment from '../PostComment/Comment.controller';
export default class Post extends Component {
    render() {
        return (
            <div className='comments-main'>
                <div className="container">
                    {/* <!-- left cont --> */}
                    <section className="main-left">
                        {/* <!-- <h1><span>Jenis</span>'s posts</h1> --> */}
                        <div className="posts-container">
                            <div className="post">
                                <div className="post-user">
                                    <ProfilePic
                                        outline = {true}
                                        link = '#'
                                    />
                                    <a href="/users/<%= author_id%>"> <span>its me</span></a>
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

                                <div className="write-comment">
                                    {/* <%if(!currentUser){%> */}
                                    {/* <div className="comment-form-container">
                                        <p>You must <a href="#">Log In</a> to leave a comment!</p>
                                    </div> */}
                                    {/* <%}else{%> */}
                                    <div className="comment-form-container">
                                        <p className="commenter-name">Comment as <span><a href="/users/author">jenispanda</a></span></p>
                                        <form action="/location/add-comment/<%= _id %>" className="comment-form">
                                            <div className="cmt-message comment-input">
                                                <label htmlFor="message"></label>
                                                <textarea name="message" id="message" cols="30" rows="10" placeholder="Express your thoughts"></textarea>
                                            </div>
                                            <div className="cmt-submit comment-input">
                                                <label htmlFor="cmt-enter"></label>
                                                <button className="cmt-enter" name="cmt-enter" id="cmt-enter">Comment</button>
                                            </div>
                                        </form>
                                    </div>
                                    {/* <%}%> */}
                                </div>
                                <div className="comments-container">
                                    <Comment />
                                </div>
                            </div>
                        </div>
                    </section>
                     {/* <!-- Main left --> */}
                    {/* <!-- Right Cont --> */}
                    <section className="main-right">
                        <Sidebar />
                        {/* <%- include('./../partials/right-footer') %>  */}
                    </section>
                </div>
            </div>
        )
    }
}
