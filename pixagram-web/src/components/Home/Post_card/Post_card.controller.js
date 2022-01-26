import React, { Component } from 'react';
import './Post_card.controller.css'
import TestImg from './../../../images/testimg1.jpg'
import ProfilePic from '../../Common/ProfilePic/ProfilePic.controller';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
const REACT_IMG_URL = process.env.REACT_APP_IMG_URL
// export default class PostCard extends Component {
//     constructor(){
//         super()
//         this.state = {
//             data : {

//             }
//         }
//     }
//     componentDidMount(){

//         console.log('did mount');
//         console.log('props data --> ', this.props.data);
//         this.setState({
//             data : {
//                 ...this.props.data
//             }
//         })

//     }    
//     render() {
//         console.log('state --> ',this.state)
//         return (
//             <div style={{cursor: "pointer"}} className="post"> {/* TODO : Use React router Link here*/}
//                 <div className="post-user">
//                     <ProfilePic
//                         outline = {true}
//                         link = '#'
//                     />
//                     <a href="#" className='post-card-profile-username'> <span>username</span></a>
//                 </div>
//                 <div className="location-img">
//                     <img src={TestImg} width="100%" alt="Some name" />
//                 </div>
//                 <div className="post-description">
//                     <h4 className="location-name">title</h4>
//                     <p>Not the best description</p>
//                 </div>
//                 <div className="interact">
//                     <div className="post-interact post-like" id = "someid">
//                         <i className="far fa-thumbs-up post-interact-icon"></i>
//                         <p className="post-like-count"><span className='total-like'>5</span> likes</p>
//                     </div>
//                     <div className="post-interact post-comment">
//                         <i className="fas fa-comment-alt post-interact-icon"></i>
//                         <p className="post-like-count"><span>4</span> comments</p>
//                     </div>
//                     <div className="post-interact post-share">
//                         <i className="fas fa-share post-interact-icon"></i>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }


// https://stackoverflow.com/questions/27864951/how-to-access-a-childs-state-in-react/27875018#27875018
function handleChange(history, location){
    history.push(location)
    // history.push can only be used with BrowserRouter so that I export withRouter too use props.history.push()
    // If a component is inside BrowserRouter then props.history.push(location) can be used to redirect to other component on a particular action like onclick etc.
}
 function PostCard(props) {
    console.log('Props is --> ', props)
    let data = props.data;
     
    return (
        <div onClick={ () => {
            handleChange(props.history, `post/${data._id}`)
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
                } to={'/register'} className= "post-card-profile-username"><span>{data.author.username}</span></NavLink>
                {/* <a href="/register" className='post-card-profile-username'> <span>{data.author.username}</span></a> */}
            </div>
            <div className="location-img">
                <img src={`${REACT_IMG_URL}/${data.image}`} width="100%" alt="Some name" />
            </div>
            <div className="post-description">
                <h4 className="location-name">{data.title}</h4>
                <p>{data.description}</p>
            </div>
            <div className="interact">
                <div className="post-interact post-like" id = "someid">
                    <i className="far fa-thumbs-up post-interact-icon"></i>
                    <p className="post-like-count"><span className='total-like'>{data.likesCount}</span> likes</p>
                </div>
                <div className="post-interact post-comment">
                    <i className="fas fa-comment-alt post-interact-icon"></i>
                    <p className="post-like-count"><span>{data.commentsCount}</span> comments</p>
                </div>
                <div className="post-interact post-share">
                    <i className="fas fa-share post-interact-icon"></i>
                </div>
            </div>
        </div>
    )
}
export default PostCard = withRouter(PostCard)
// if we cannot put some component inside BrowserRouter we can export like this and it is the same