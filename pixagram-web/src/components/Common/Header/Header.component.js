import React, { Component } from 'react';
import './Header.component.css';
import Logo from './../../../images/pixagram.png'
import ProfilePic from "../ProfilePic/ProfilePic.controller";
import { NavLink, withRouter } from "react-router-dom";
import { httpClient } from '../../../utils/httpClient';
import { ErrorHandler } from '../../../utils/errorHandler';

function logout(history){
    localStorage.clear();
    history.push('/home')
}

class Header extends Component {
    constructor(){
        super()
        this.state = {
            query : '',
            profileImg : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        if(localStorage.getItem('token')){
            httpClient.GET(`/users/${JSON.parse(localStorage.getItem('user'))._id}`)
            .then((data) => {
                console.log('logged in user is -> ',data.data.image);
                this.setState({
                    profileImg : data.data.image
                })
            })
            .catch((err) => {
                ErrorHandler(err)
            })
        }
    }
    handleChange(e){
        this.setState({
            query : e.target.value
        })
    }
    handleSubmit(e, history, location){
        // when you use this.history.push(something), it will redirect to {pathname} and you can also pass additional data to the component of the path. To access data from that {pathname}(component) you can use this.props.history.... in other words if you do history.push(..) it will pass data as props and you can access those props in the same way you would access in a normal component. eg. I am passing pathname and search properties from this history.push and I can access those data form SearchPost Component using this.props.history. And also SearchComponent will be rerendered everytime I pass something new to history.push because it is a props for SearchComponent and as I change the props(data inside history.push), SearchComponent also gets re-rendered.
        // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4, https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4/45263164#45263164 
        history.push({
            pathname: location,
            search: this.state.query,
            state: { query: this.state.query }
          })
        e.preventDefault();
       
    }
    render() {

        let headerContent;
        if(localStorage.getItem('token')){
            headerContent = <ul>
                                <li className="profile-link">
                                    <ProfilePic
                                        outline = {true}
                                        size = "35px"
                                        link = {`/users/${JSON.parse(localStorage.getItem('user'))._id}`}
                                        img = {this.state.profileImg}
                                    />
                                </li>
                                <li className="logout-link">
                                    <button onClick={() => {
                                        logout(this.props.history)
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
                        <form onSubmit={(e) => {
                                this.handleSubmit(e, this.props.history, `/post/search`)
                        } } action="#">
                            <div className="search-cont">
                                <label htmlFor="post-search"></label>
                                <input onChange={this.handleChange} type="text" className="post-search" name="post-search" placeholder="Search Posts" />
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
}

// function Header(props){
//     let headerContent;
//     if(localStorage.getItem('token')){
//         headerContent = <ul>
//                             <li className="profile-link">
//                                 <ProfilePic
//                                     outline = {true}
//                                     size = "35px"
//                                     link = {`/users/${JSON.parse(localStorage.getItem('user'))._id}`}
//                                 />
//                             </li>
//                             <li className="logout-link">
//                                 <button onClick={() => {
//                                     logout(props.history)
//                                 }} href="/logout"><i className="fas fa-sign-out-alt"></i></button>
//                             </li> 
//                         </ul>
//     }else{
//         headerContent = <ul>
//                             <li className="login-link">
//                                 <NavLink to = "/login">Login</NavLink>
//                                 {/* under the hood Navlink uses a tag so we are giving style to .login-link>a */}
//                             </li>
//                             <li className="register-link">
//                                 <NavLink to = "/register">Register</NavLink>
//                             </li>
//                         </ul>
//     }
//     return (
//         <header>
//             <div className="container">
//                 <div className="header--logo"><NavLink to = "/home"><img src={Logo} alt="" className="logo-img" /></NavLink></div>
//                 <div className="header--search-bar">
//                     <form action="#">
//                         <div className="search-cont">
//                             <label htmlFor="post-search"></label>
//                             <input type="text" className="post-search" name="post-search" placeholder="Search Posts" />
//                         </div>
//                         <div className="submit">
//                             <label htmlFor="submit"></label>
//                             <button className="submit" name="submit"><i className="fas fa-search"></i></button>
//                         </div>
//                     </form>
//                 </div>
//                 <nav>
//                     {headerContent}
//                 </nav>
//             </div>
//         </header>
//     )
// }
export default Header = withRouter(Header)