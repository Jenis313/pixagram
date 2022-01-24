import React from "react";
import './Header.component.css';
import Logo from './../../../images/pixagram.png'
import ProfilePic from "../ProfilePic/ProfilePic.controller";
import { NavLink, withRouter } from "react-router-dom";

function logout(history){
    localStorage.clear();
    history.push('/home')
}

function Header(props){
    let headerContent;
    if(localStorage.getItem('token')){
        headerContent = <ul>
                            <li className="profile-link">
                                <ProfilePic
                                    outline = {true}
                                    size = "35px"
                                />
                            </li>
                            <li className="logout-link">
                                <button onClick={() => {
                                    logout(props.history)
                                }} href="/logout"><i className="fas fa-sign-out-alt"></i></button>
                            </li> 
                        </ul>
    }else{
        headerContent = <ul>
                            <li className="login-link">
                                <NavLink to = "/login">Login</NavLink>
                                {/* under the hood Navlink uses a tag so we are giving style to .login-link>a */}
                            </li>
                            <li className="register-link">
                                <NavLink to = "/register">Register</NavLink>
                            </li>
                        </ul>
    }
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
                    {headerContent}
                </nav>
            </div>
        </header>
    )
}
export default Header = withRouter(Header)