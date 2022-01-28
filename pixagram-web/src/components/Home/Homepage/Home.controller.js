import React, { Component } from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar.component';
import './Home.controller.css'
import PostCard from '../Post_card/Post_card.controller';
import ProfilePic from '../../Common/ProfilePic/ProfilePic.controller';
import Loader from '../../Common/Loader/Loader.component';
import { httpClient } from '../../../utils/httpClient';
import { NavLink } from 'react-router-dom';
export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
             posts : [],
        }
    }

    componentDidMount(){
        this.setState({
            isLoading : true
        })
        console.log('component successfully loaded!');
        httpClient.GET('/post', false)
        .then((results) => {
            // console.log(' data is ----> ',results.data)
            this.setState({
                posts : results.data.posts
            })
        })
        .catch((err) => {
            console.log('error is ---> ', err);
        })
        .finally(() => {
            this.setState({
                isLoading : false
            })
        })

    }
 
    render() {
        let posts; 
         if(this.state.isLoading){
            posts = <Loader />
         }else{
             
           posts =  <>
                {
                    this.state.posts.map((post, index) => {
                        return <PostCard data = {post} key = {index} />
                    })
                }
            </>
         }  
        return (
            <div className='home-main'>
                <div className="container">
                    {/* <!-- left cont --> */}
                    <section className="main-left">
                        <div className="create-new-location">
                            <ProfilePic 
                                outline = {false}
                                link = '/users'
                            />
                            <div className="create-new-location-btn">
                                <NavLink exact to={"/post/new"}><i className="far fa-plus-square"></i> Create a new post </NavLink>
                                {/* <a href="/post/new"><i className="far fa-plus-square"></i> Create a new post</a> */}
                            </div>
                        </div>
                        <div className="posts-container">


                            

                            {/* Will load post card here */}
                            {posts}
                        </div>
                    </section> 
                    {/* <!-- Right Cont --> */}
                    <section className="main-right">
                        <Sidebar />
                    </section>
                </div>
            </div>
        )
    }
}
