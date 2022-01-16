import React, { Component } from 'react';
import './AddPost.controller.css';
import Sidebar from '../../Common/Sidebar/Sidebar.component';

export default class AddPost extends Component {
    render() {
        return (
            <div className='new-location-main'>
                <div className="container">
                    {/* <!-- left cont --> */}
                    <section className="main-left">
                        {/* <%if(!currentUser){%> */}
                            {/* <div className="post-form-container post-form-no-auth">
                                <h2 className="login-req-new-post">Please <a href="/auth/login">login</a> to create a new location!!</h2>
                                <div className="no-auth-location-image">
                                    <i className="fas fa-edit"></i>
                                </div>
                            </div> */}
                        {/* <%}else{%> */}
                        <h1>Create a new location</h1>
                        <div className="post-form-container">
                            <form enctype='multipart/form-data' className="new-location-form" action="/location/new" method="post">
                                <div className="input-container-post">
                                    <label for="post-name" ></label>
                                    <input type="text" id="post-name" name="name" placeholder="Location name" required />
                                </div>
                                <div className="input-container-post">
                                    <label for="post-description" ></label>
                                    <textarea name="description" id="post-description" cols="30" rows="10" placeholder="Describe how you felt when you visited this place..." required></textarea>
                                </div>
                                <div className="input-container-post upload-image">
                                    <div className="icon"><i className="far fa-image"></i></div>
                                    <p>Upload an image</p>
                                    <label for="post-image" >Browse files</label>
                                    <input type="file" name="image" id="post-image" accept="image/*"/>
                                     {/*Make a preview container here  */}
                                </div>
                                <div className="input-container-post post-tags-cont">
                                    <label for="post-tags" >Insert upto 5 tags seperated by commas. </label>
                                    <input type="text" id="post-tags" name="tags" placeholder="Melbourne, Flinders Street, Fed Sauare, etc." required />
                                </div>
                                <div className="input-container">
                                    <label for="post-submit"></label>
                                    <button name="submit" id="post-submit">Submit for review</button>
                                </div>
                            </form>
                        </div>
                        {/* <%}%> */}
                    </section> {/*<!-- Main left -->*/}
                    {/* <!-- Right Cont --> */}
                    <section className="main-right">
                        {/* <%- include('./../partials/right-footer') %>  */}
                        <Sidebar />
                    </section>
                </div>
            </div>
        )
    }
}
