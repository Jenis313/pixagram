import React, { Component } from 'react';
import './Post_card.controller.css'
import TestImg from './../../../images/testimg1.jpg'
import ProfilePic from '../../Common/ProfilePic/ProfilePic.controller';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
const REACT_IMG_URL = process.env.REACT_APP_IMG_URL

class PostCard extends Component{
    constructor(){
        super()
        this.state = {
            approved: '',
            author: {
                _id: '', 
                username: ''
            },
            comments: [],
            commentsCount: '',
            createdAt: '',
            description: '',
            image: '',
            likes: [],
            likesCount: '',
            tags: [],
            title: '',
            _id: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }
    componentDidMount(){

        console.log('did mount');
        // console.log('props data --> ', this.props.data);
        this.setState({
            ...this.props.data,
            likes: this.props.data.likes.length > 0 ?  this.props.data.likes.map(element => element.user._id) : []
        }, () => {
            console.log('stateeeeeeeeeeeeeeeeeeeeeeeeeeee-> ', this.state)
        })

    }
    // https://stackoverflow.com/questions/27864951/how-to-access-a-childs-state-in-react/27875018#27875018
    handleChange(history, location){
        history.push(location)
        // history.push can only be used with BrowserRouter so that I export withRouter too use props.history.push()/this.props.history.push()
        // If a component is inside BrowserRouter then this.props.history.push(location) can be used to redirect to other component on a particular action like onclick etc.history object is automatically passed as a props to a component if that component is inside BrowserRouter
    }
    handleLike(e){
        let userId = JSON.parse(localStorage.getItem('user'))._id;
        e.stopPropagation()
        console.log('like userid---> ', userId);
        this.setState((prevState) => ({
            likes : [...prevState.likes, userId]
        }))

    }
    render(){
    // If user is logged in can interect if not can't interect just see number of likes and comments 
        let interactContent;
        if(localStorage.getItem('token')){
                        ///////////////////////////////////////////////////////////////// prepare data for interactContent
                        let likeContent;
                        let currentUserId = JSON.parse(localStorage.getItem('user'))._id;
                        let isLiked = this.state.likes.some((element) => {
                            console.log('element --> ', element)
                            return element === currentUserId
                            // return value true means this user has already liked the post
                        })
                        // console.log('currentUser and isLiked -> ', currentUserId, isLiked);
                        if(isLiked){
                            likeContent = 
                                <>
                                    <i className="far fa-thumbs-up post-interact-icon" style={{color : '#1DBF73'}}></i>
                                    <p className="post-like-count" style={{color : '#1DBF73'}}><span className='total-like'>{this.state.likesCount}</span> likes</p>
                                </>
                        }else{
                            likeContent = 
                                <>
                                    <i onClick={(e) => {
                                        this.handleLike(e)
                                    }} className="far fa-thumbs-up post-interact-icon"></i>
                                    <p className="post-like-count"><span className='total-like'>{this.state.likesCount}</span> likes</p>
                                </>
                        }
                        //////////////////////////////////////////////////////////////
                        
            interactContent = 
                <>
                    <div className="post-interact post-like" id = "someid">
                        {likeContent}
                    </div>
                    <div className="post-interact post-comment">
                        <i className="fas fa-comment-alt post-interact-icon"></i>
                        <p className="post-like-count"><span>{this.state.commentsCount}</span> comments</p>
                    </div>
                    <div className="post-interact post-share">
                        <i className="fas fa-share post-interact-icon"></i>
                    </div>
                </>
        }else{
            interactContent = 
                <>
                    <div className="post-interact post-like" id = "someid">
                        <p className="post-like-count"><span className='total-like'>{this.state.likesCount}</span> likes</p>
                    </div>
                    <div className="post-interact post-comment">
                        <p className="post-like-count"><span>{this.state.commentsCount}</span> comments</p>
                    </div>
                    <div className="post-interact post-share">
                        <i className="fas fa-share post-interact-icon"></i>
                    </div>
                </>
        }


        console.log('State PostCard ---> ', this.state)
        return (
            <div onClick={ () => {
                this.handleChange(this.props.history, `post/${this.state._id}`)
            } } style={{cursor: "pointer"}} className="post"> {/* TODO : Use React router Link here*/}
                <div className="post-user">
                    <ProfilePic
                        outline = {true}
                        link = '#'
                    />
                    <NavLink onClick = {
                        (e) => {
                            e.stopPropagation();
                        }
                    } to={'/register'} className= "post-card-profile-username"><span>{this.state.author.username}</span></NavLink>
                    {/* <a href="/register" className='post-card-profile-username'> <span>{this.state.author.username}</span></a> */}
                </div>
                <div className="location-img">
                    <img src={`${REACT_IMG_URL}/${this.state.image}`} width="100%" alt="Some name" />
                </div>
                <div className="post-description">
                    <h4 className="location-name">{this.state.title}</h4>
                    <p>{this.state.description}</p>
                </div>
                <div className="interact">
                    {interactContent}
                </div>
            </div>
        )
    }
}
//  function PostCard(props) {
//     console.log('Props is --> ', props)
//     let data = props.data;
//     let interactContent;
//     if(localStorage.getItem('token')){
//         interactContent = 
//                 <>
//                     <div className="post-interact post-like" id = "someid">
//                         <i onClick={(e) => {
//                             handleLike(e, data._id)
//                         }} className="far fa-thumbs-up post-interact-icon"></i>
//                         <p className="post-like-count"><span className='total-like'>{data.likesCount}</span> likes</p>
//                     </div>
//                     <div className="post-interact post-comment">
//                         <i className="fas fa-comment-alt post-interact-icon"></i>
//                         <p className="post-like-count"><span>{data.commentsCount}</span> comments</p>
//                     </div>
//                     <div className="post-interact post-share">
//                         <i className="fas fa-share post-interact-icon"></i>
//                     </div>
//                 </>
//     }else{
//         interactContent = 
//                 <>
//                     <div className="post-interact post-like" id = "someid">
//                         <p className="post-like-count"><span className='total-like'>{data.likesCount}</span> likes</p>
//                     </div>
//                     <div className="post-interact post-comment">
//                         <p className="post-like-count"><span>{data.commentsCount}</span> comments</p>
//                     </div>
//                     <div className="post-interact post-share">
//                         <i className="fas fa-share post-interact-icon"></i>
//                     </div>
//                 </>
//     }
     
//     return (
//         <div onClick={ () => {
//             handleChange(props.history, `post/${data._id}`)
//         } } style={{cursor: "pointer"}} className="post"> {/* TODO : Use React router Link here*/}
//             <div className="post-user">
//                 <ProfilePic
//                     outline = {true}
//                     link = '#'
//                 />
//                 <NavLink onClick = {
//                     (e) => {
//                         e.stopPropagation();
//                     }
//                 } to={'/register'} className= "post-card-profile-username"><span>{data.author.username}</span></NavLink>
//                 {/* <a href="/register" className='post-card-profile-username'> <span>{data.author.username}</span></a> */}
//             </div>
//             <div className="location-img">
//                 <img src={`${REACT_IMG_URL}/${data.image}`} width="100%" alt="Some name" />
//             </div>
//             <div className="post-description">
//                 <h4 className="location-name">{data.title}</h4>
//                 <p>{data.description}</p>
//             </div>
//             <div className="interact">
//                 {interactContent}
//             </div>
//         </div>
//     )
// }
export default PostCard = withRouter(PostCard)
// if we cannot put some component inside BrowserRouter we can export like this and it is the same