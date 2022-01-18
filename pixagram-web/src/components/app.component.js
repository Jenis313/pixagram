import React from "react";
import Header from "./Common/Header/Header.component";
import Login from "./Auth/Login.controller";
import Home from "./Home/Homepage/Home.controller";
import './style.css'
import Register from "./Auth/Register.controller";
import AddPost from "./Post/AddPost/AddPost.controlller";
import Post from "./Post/ViewPost/PostModal/Post.controller";
import Profile from "./Profile/Profile.controller";
import AppRouting from "./app.routing";
export default function App(){
    return (
        <div className="main">
            {/* <Header /> */}
            {/* <Home /> */}
            {/* <Login /> */}
            {/* <Register /> */}
            {/* <AddPost /> */}
            {/* <Post /> */}
            {/* <Profile /> */}
            <AppRouting />
        </div>
    )
}