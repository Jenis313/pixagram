import React, { Component } from 'react';
import { httpClient } from '../../utils/httpClient';
import Loader from '../Common/Loader/Loader.component';
import ProfilePic from '../Common/ProfilePic/ProfilePic.controller';
import PostCard from '../Home/Post_card/Post_card.controller';
import './Profile.controller.css';


export default class Profile extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
             posts : [],
             user : {}
        }
    }
    componentDidMount(){
        this.setState({
            isLoading : true
        })
        const userId = this.props.match.params['userId'];
        // For user details
        httpClient.GET(`/users/${userId}`, false)
        .then((user) => {
            // console.log('userrrrrrrrr->', user);
            this.setState({
                user : {
                    ...user.data
                }
            })
            // For posts
            httpClient.GET(`/users/${userId}/posts`, false)
            .then((results) => {
                console.log(' data is ----> ',results.data);
                this.setState({
                    posts : results.data //Maybe this is a problem because I am changing array
                })
            })
            .catch((err) => {
                console.log('error is ---> ', err);
            })
        })
        .catch((err) => {
            console.log('errr in component did mount Profile component -> ', err)
        })
        .finally(() => {
            this.setState({
                isLoading : false
            })
            console.log('state---> ', this.state);
        })



        

    }
    render() {
    let posts; 
        if(this.state.isLoading){
            posts = <Loader />
        }else{
          console.log(this.state)  
            posts =  <>
                {
                    this.state.posts.map((post, index) => {
                        return <PostCard data = {post} key = {index} />
                    })
                }
            </>
        } 
    return (
        <div className='profile-main'>
            <div className="container">
                {/* <!-- left cont --> */}
                <section className="main-left">
                    {/* <h1>Your posts</h1> */}
                    <h1><span>Jenis</span>'s posts</h1>
                    <div className="posts-container">
                        {/* <PostCard /> */}
                        {posts}
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
}


// export default function Profile() {
//     return (
//         <div className='profile-main'>
//             <div className="container">
//                 {/* <!-- left cont --> */}
//                 <section className="main-left">
//                     {/* <h1>Your posts</h1> */}
//                     <h1><span>Jenis</span>'s posts</h1>
//                     <div className="posts-container">
//                         <PostCard />
//                     </div>
//                 </section> 
//                 {/* <!-- Right Cont --> */}
//                 <section className="main-right">
//                     <div className="profile-container">
//                         <div className="top-color"></div>
//                         <div className="current-profile-pic">
//                             {/* <img src="./../images/profile.png" width="100px" alt=""> */}
//                             <ProfilePic 
//                                 outline = {true}
//                                 size = {"80px"}
//                             />
//                         </div>
//                         {/* <%if(currentUser.username == result.username){%> */}
//                             <div className="edit-profile">
//                                 <a href="#"><i className="fas fa-cog"></i></a>
//                             </div>
//                         {/* <%}%> */}
//                         <div className="profile-info">
//                             <p className="full-name">Jenis Rai</p>
//                             <p className="username">@<span>jenispanda</span></p>
//                         </div>
//                         {/* <%if(currentUser.username == result.username){%> */}
//                         <div className="new-post-profile">
//                             <a href="/location/new">Add a new post</a>
//                         </div>
//                         {/* <%}%> */}

//                     </div>
//                 </section>
//             </div>
//         </div>
//     )
// }