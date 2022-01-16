import React from "react";
import './Auth.controller.css';
import Pixagram from './../../images/pixagram.png';
export default function Login(){
    return (
            <div className="auth-main">
                {/* <% if(!currentUser){%> */}
                    <div className="form-container">
                        <div className="auth-form-upper">
                            <img src={Pixagram} alt="" className="logo-img" />
                            <form action="/auth/login" method="post">
                                <div className="input-container">
                                    <label for="email" ></label>
                                    <input type="email" id="email" name="email" placeholder="Email address" />
                                </div>
                                <div className="input-container">
                                    <label for="password" ></label>
                                    <input type="password" id="password" name="password" placeholder="Password" />
                                </div>
                                <div className="input-container">
                                    <label for="submit"></label>
                                    <button id="submit" id="submit">Log In</button>
                                </div>
                            </form>
                            <p className="forget-password">Please don't forget your password 🙏</p>
                        </div>
                        <div className="auth-lower">
                            <p>Don't have an account? <a href="/auth/register">Register</a></p>
                        </div>
                    </div>
                {/* <%}else{%> */}
                    {/* <div className="already-loggedin">
                        <p style={{fontSize: "1.4em"}}>You are already logged in! <a style={{fontWeight: "600", textDecoration: "underline"}} href="/logout">Logout</a> to switch account or to create a new account!</p>
                    </div> */}
                {/* <% } %>  */}
                    
            </div>

    )
}