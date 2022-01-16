import React from "react";
import './Auth.controller.css';
import Pixagram from './../../images/pixagram.png';
export default function Register(){
    return (
            <div className="auth-main">
                {/* <% if(!currentUser){%> */}
                <div className="form-container">
                    <div className="auth-form-upper">
                        <img src={Pixagram} alt="" className="logo-img" />
                        <p className="register-descript">Register to see beautiful places around the world!</p>
                        <form action="/auth/register" method="post">
                            <div className="input-container">
                                <label for="email" ></label>
                                <input type="email" id="email" name="email" placeholder="Email address" />
                            </div>
                            <div className="input-container">
                                <label for="fullName" ></label>
                                <input type="text" id="fullName" name ="fullName" placeholder="Full name" />
                            </div>
                            <div className="input-container">
                                <label for="username" ></label>
                                <input type="text" id="username" name="username" placeholder="Username" />
                            </div>
                            <div className="input-container">
                                <label for="password" ></label>
                                <input type="password" id="password" name="password" placeholder="Password" />
                            </div>
                            <div className="input-container">
                                <label for="submit"></label>
                                <button id="submit" id="submit">Register</button>
                            </div>
                        </form>
                        <p className="terms-accept">By signing up, you agree to our Terms, Data Policy and Cookie Policy.</p>
                    </div>
                    <div className="auth-lower">
                        <p>Have and account? <a href="/auth/login">Login</a></p>
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