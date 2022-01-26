import React, { Component } from 'react';
import './Auth.controller.css';
import Pixagram from './../../images/pixagram.png';
import { Link, NavLink } from 'react-router-dom';
import { httpClient } from '../../utils/httpClient';
import { Notify } from '../../utils/notify';
const defaultForm = {
    username: '',
    password: ''
}

export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            data: {
                ...defaultForm
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        let token = localStorage.getItem('token')
        if(token){
            this.props.history.push('/home')
        }
    }
    handleChange(e){
        let {name , value} = e.target;
        console.log(name, value)
        this.setState((prevState) => {
                return {
                    data : {
                    ...prevState.data,
                    [name] : value
                }
            }
        } /*, () => {
        //    form validation
        this.validateForm(name);
        }*/ )
    }
    handleSubmit(e){
        e.preventDefault() 
        console.log('state---->', this.state);
        httpClient.POST(`/auth/login`, this.state.data)
        .then((response) => {
            console.log('response is -> ', response);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            this.props.history.push('/home')
            // notify.showSuccess('Register Successful')
        })
        .catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className="auth-main">
                    <div className="form-container">
                        <div className="auth-form-upper">
                            <img src={Pixagram} alt="" className="logo-img" />
                            <form action="/auth/login" onSubmit={this.handleSubmit} method="post">
                                <div className="input-container">
                                    <label htmlFor="email" ></label>
                                    <input onChange={this.handleChange} type="email" id="email" name="email" placeholder="Email address" />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="password" ></label>
                                    <input onChange={this.handleChange} type="password" id="password" name="password" placeholder="Password" />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="submit"></label>
                                    <button id="submit" id="submit">Log In</button>
                                </div>
                            </form>
                            <p className="forget-password">Please don't forget your password 🙏</p>
                        </div>
                        <div className="auth-lower">
                            <p>Don't have an account? 
                                <NavLink to={'/register'}>Register</NavLink>
                            </p>
                        </div>
                    </div>
            </div>
        )
    }
}


// export default function Login(){
//     return (
//             <div className="auth-main">
//                 {/* <% if(!currentUser){%> */}
//                     <div className="form-container">
//                         <div className="auth-form-upper">
//                             <img src={Pixagram} alt="" className="logo-img" />
//                             <form action="/auth/login" method="post">
//                                 <div className="input-container">
//                                     <label for="email" ></label>
//                                     <input type="email" id="email" name="email" placeholder="Email address" />
//                                 </div>
//                                 <div className="input-container">
//                                     <label for="password" ></label>
//                                     <input type="password" id="password" name="password" placeholder="Password" />
//                                 </div>
//                                 <div className="input-container">
//                                     <label for="submit"></label>
//                                     <button id="submit" id="submit">Log In</button>
//                                 </div>
//                             </form>
//                             <p className="forget-password">Please don't forget your password 🙏</p>
//                         </div>
//                         <div className="auth-lower">
//                             <p>Don't have an account? <a href="/auth/register">Register</a></p>
//                         </div>
//                     </div>
//                 {/* <%}else{%> */}
//                     {/* <div className="already-loggedin">
//                         <p style={{fontSize: "1.4em"}}>You are already logged in! <a style={{fontWeight: "600", textDecoration: "underline"}} href="/logout">Logout</a> to switch account or to create a new account!</p>
//                     </div> */}
//                 {/* <% } %>  */}
                    
//             </div>

//     )
// }