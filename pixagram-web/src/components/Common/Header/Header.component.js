import React from "react";
import './Header.component.css';
import Logo from './../../../images/pixagram.png'
import ProfilePic from "../ProfilePic/ProfilePic.controller";
import { NavLink } from "react-router-dom";
export default function Header(){
    return (
        <header>
            <div className="container">
                <div className="header--logo"><NavLink to = "/home"><img src={Logo} alt="" className="logo-img" /></NavLink></div>
                <div className="header--search-bar">
                    <form action="#">
                        <div className="search-cont">
                            <label htmlFor="post-search"></label>
                            <input type="text" className="post-search" name="post-search" placeholder="Search Posts" />
                        </div>
                        <div className="submit">
                            <label htmlFor="submit"></label>
                            <button className="submit" name="submit"><i className="fas fa-search"></i></button>
                        </div>
                    </form>
                </div>
                <nav>
                    <ul>
                        {/* <%if(!currentUser){%> */}
                            {/* <li className="login-link">
                                <a href="/auth/login">Login</a>
                            </li>
                            <li className="register-link">
                                <a href="/auth/register">Register</a>
                            </li> */}
                        {/* <%}else{%> */}
                            <li className="profile-link">
                                <ProfilePic
                                    outline = {true}
                                    size = "35px"
                                />
                            </li>
                            <li className="logout-link">
                                <a href="/logout"><i className="fas fa-sign-out-alt"></i></a>
                            </li> 
                        {/* <%}%> */}
                    </ul>
                </nav>
            </div>
        </header>
    )
}