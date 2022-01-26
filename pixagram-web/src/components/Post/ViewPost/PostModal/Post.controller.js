import React, { Component } from 'react';
import './Post.controller.css'
import ProfilePic from '../../../Common/ProfilePic/ProfilePic.controller'
import Sidebar from '../../../Common/Sidebar/Sidebar.component'
import TestImg from './../../../../images/testimg1.jpg'
import Comment from '../PostComment/Comment.controller';
import { httpClient } from '../../../../utils/httpClient';
import { NavLink } from 'react-router-dom';
const REACT_IMG_URL = process.env.REACT_APP_IMG_URL


export default class Post extends Component {
    constructor(){
        super()
        this.state = {
            approved: '',
            author: {},
            comments: [],
            commentsCount: '',
            createdAt: '',
            description: '',
            likes: [],
            likesCount: '',
            tags: [],
            title: '',
            updatedAt: '',
            __v: '',
            _id : ''
        }
    }
    componentDidMount(){
        this.postId = this.props.match.params['postId']; //because the route of this component is post/:postId (eg <Route to "post/:postId">) and also this component lives inside BrowserRouter so that we can access it's parameter with props.match.params['parameter name']
        console.log(this.postId)
        httpClient.GET(`/post/${this.postId}`, false)
        .then((post) => {
            // console.log(' data is ----> ',results.data)
            this.setState({
                ...post.data
            })
        })
        .catch((err) => {
            console.log('error is ---> ', err);
        })
        .finally(() => {
            console.log('state--->', this.state)
        })
    }
    render() {
        let commentContent; 
        if(localStorage.getItem('token')){
            commentContent = 
                <div className="comment-form-container">
                    <p className="commenter-name">Comment as <span>
                        <NavLink to={`/register`}>imloggedinuser</NavLink>
                        {/* <a href="/users/author">jenispanda</a>*/}
                        </span></p> 
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

        }else{
            commentContent = 
                <div className="comment-form-container">
                    <p>You must <NavLink exact to="/login">Log In</NavLink> to leave a comment!</p>
                </div>
        }

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
                                    <NavLink to={'#'}>{this.state.author.username}</NavLink>
                                </div>

                                <div className="location-img">
                                    <img src={`${REACT_IMG_URL}/${this.state.image}`} width="100%" alt="Some name" />
                                </div>
                                <div className="post-description">
                                    <h4 className="location-name">{this.state.title}</h4>
                                    <p>{this.state.description}</p>
                                </div>
                                <div className="interact">
                                    {/* maybe some or every etc. if some match in the state render blue else render white */}
                                    <div className="post-interact post-like" id = "someid">
                                        <i className="far fa-thumbs-up post-interact-icon"></i>
                                        <p className="post-like-count"><span className='total-like'>{this.state.likesCount}</span> likes</p>
                                    </div>
                                    <div className="post-interact post-comment">
                                        <i className="fas fa-comment-alt post-interact-icon"></i>
                                        <p className="post-like-count"><span>{this.state.commentsCount}</span> comments</p>
                                    </div>
                                    <div className="post-interact post-share">
                                        <i className="fas fa-share post-interact-icon"></i>
                                    </div>
                                </div>

                                <div className="write-comment">
                                    {commentContent}
                                </div>
                                <div className="comments-container">
                                    {
                                        this.state.comments.map((comment, index) => {
                                                return <Comment 
                                                    comment = {comment}
                                                    key = {index}
                                                />
                                        })
                                    }
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
