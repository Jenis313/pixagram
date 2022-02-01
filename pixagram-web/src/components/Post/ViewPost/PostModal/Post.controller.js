import React, { Component } from 'react';
import './Post.controller.css'
import ProfilePic from '../../../Common/ProfilePic/ProfilePic.controller'
import Sidebar from '../../../Common/Sidebar/Sidebar.component'
import TestImg from './../../../../images/testimg1.jpg'
import Comment from '../PostComment/Comment.controller';
import { httpClient } from '../../../../utils/httpClient';
import { NavLink } from 'react-router-dom';
import PostCard from './../../../Home/Post_card/Post_card.controller'
import { ErrorHandler } from '../../../../utils/errorHandler';
const REACT_IMG_URL = process.env.REACT_APP_IMG_URL;

export default class Post extends Component {
    constructor(){
        super()
        this.state = {
            post : {
                approved: '',
                author: {},
                comments: [],
                commentsCount: '',
                createdAt: '',
                description: '',
                image: '',
                likes: [],
                likesCount: '',
                tags: [],
                title: '',
                updatedAt: '',
                __v: '',
                _id : '',
            },
            commentData: {},
            isLoading : true //it is necessary becausse only after data request is complete it will be set to false and once it is false, data(props) will be passed to PostCard otherwise empty state will go to PostCard and cause errors (https://stackoverflow.com/questions/28785106/reactjs-why-is-passing-the-component-initial-state-a-prop-an-anti-pattern/28785276#28785276 & https://stackoverflow.com/questions/41233458/react-child-component-not-updating-after-parent-state-change)
        }
        this.handleCommentChange = this.handleCommentChange.bind(this)
    }
    componentDidMount(){
       
        this.postId = this.props.match.params['postId']; //because the route of this component is post/:postId (eg <Route to "post/:postId">) and also this component lives inside BrowserRouter so that we can access it's parameter with props.match.params['parameter name']
        console.log(this.postId)
        httpClient.GET(`/post/${this.postId}`, false)
        .then((post) => {
            console.log('Post component get request data ----> ',post.data)
            this.setState({
                post : {...post.data}
            })
        })
        .catch((err) => {
            console.log('error is ---> ', err);
        })
        .finally(() => {
            this.setState({
                isLoading : false
            })
            // console.log('state post controller--->', this.state)
        })
    }
    handleCommentSubmit(event){

        event.preventDefault();
        console.log('state', this.state)
        httpClient.POST(`/post/${this.state.post._id}/comment`, this.state.commentData, true)
        .then((response) => {
            console.log('response from server comment --> ', response)
            this.setState({
                post : response.data,
                commentData : {
                    message : ''
                }

            })
        })
        .catch((err) => {
            console.log('error in comment--> ', err);
            ErrorHandler(err)
        })
        .finally(() => {
           console.log('stete', this.state)
        })
    }
    handleCommentChange(event){
        event.preventDefault()
        console.log('eventtt', event.target.name, event.target.value)
        this.setState((prevState) => ({
            commentData : {
                message : event.target.value,
                commentsCount : event.target.value === "" ? prevState.post.comments.length :  prevState.post.comments.length + 1
            }
        })
        )

    }

    render() {
        // console.log(JSON.parse(localStorage.getItem('user')).username)
        let commentContent; 
        if(localStorage.getItem('token')){
            commentContent = 
                <div className="comment-form-container">
                    <p className="commenter-name">Comment as <span>
                        <NavLink to={`/users/${JSON.parse(localStorage.getItem('user'))._id}`}>{JSON.parse(localStorage.getItem('user')).username}</NavLink>
                        {/* <a href="/users/author">jenispanda</a>*/}
                        </span></p> 
                    <form action="" onSubmit = {(e) => {this.handleCommentSubmit(e)}} className="comment-form">
                        <div className="cmt-message comment-input">
                            <label htmlFor="message"></label>
                            <textarea onChange={(e) => {this.handleCommentChange(e)}} name="message"  id="message" cols="30" rows="10" value={this.state.commentData.message} placeholder="Express your thoughts"></textarea>
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
                                {/* Load PostCard */}
                                {this.state.isLoading ? <></> : <PostCard data = {this.state.post} fromPost = {true} /> }

                                <div className="write-comment">
                                    {commentContent}
                                </div>
                                <div className="comments-container">
                                    {
                                        this.state.post.comments.reverse().map((comment, index) => {
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
                    </section>
                </div>
            </div>
        )
    }
}
