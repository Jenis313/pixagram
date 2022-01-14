import React from "react";
import './Header.component.css';
import Logo from './../../../images/pixagram.png'
export default function Header(){
    return (
        <header>
            <div className="container">
                <div className="header--logo"><a href="/"><img src={Logo} alt="" class="logo-img" /></a></div>
                <div className="header--search-bar">
                    <form action="#">
                        <div className="search-cont">
                            <label for="post-search"></label>
                            <input type="text" className="post-search" name="post-search" placeholder="Search Posts" />
                        </div>
                        <div class="submit">
                            <label for="submit"></label>
                            <button class="submit" name="submit"><i class="fas fa-search"></i></button>
                        </div>
                    </form>
                </div>
                <nav>
                    <ul>
                        {/* <%if(!currentUser){%> */}
                            <li className="login-link">
                                <a href="/auth/login">Login</a>
                            </li>
                            <li className="register-link">
                                <a href="/auth/register">Register</a>
                            </li>
                        {/* <%}else{%> */}
                            {/* <li className="profile-link">
                            <a href="/users/<%= currentUser._id%>"><img src="./../images/profile.png" alt="profile picture"></a>
                            </li>
                            <li className="logout-link">
                                <a href="/logout"><i className="fas fa-sign-out-alt"></i></a>
                            </li>  */}
                        {/* <%}%> */}
                    </ul>
                </nav>
            </div>
        </header>
    )
}