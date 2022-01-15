import React, { Component } from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar.component';
import './Home.controller.css'
import PostCard from '../Post_card/Post_card.controller';
import ProfilePic from '../../Common/ProfilePic/ProfilePic.controller';
export default class Home extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render() {
        return (
            <div className='home-main'>
                <div class="container">
                    {/* <!-- left cont --> */}
                    <section className="main-left">
                        <div className="create-new-location">
                            <div className='create-new-location-profile-container'>
                                <ProfilePic 
                                    outline = {false}
                                    link = '#'
                                />
                            </div>
                            <div className="create-new-location-btn">
                                <a href="/post/new"><i className="far fa-plus-square"></i> Create a new post</a>
                            </div>
                        </div>
                        <div className="posts-container">
                            {/* Will load post card here */}
                            <PostCard />
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
