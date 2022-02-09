import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './Auth/Login.controller';
import Register from './Auth/Register.controller';
import NotFound from './Common/Error/NotFound/NotFound.controller';
import Header from './Common/Header/Header.component';
import Home from './Home/Homepage/Home.controller';
import AddPost from './Post/AddPost/AddPost.controlller';
import SearchPost from './Post/SearchPost/SearchPost.component';
import Post from './Post/ViewPost/PostModal/Post.controller';
import EditProfile from './Profile/EditProfile/EditProfile.component';
import Profile from './Profile/Profile.controller';

import {MyProvider} from './../context/GlobalState.js';
//https://www.youtube.com/watch?v=XLJN4JfniH4
//https://stackblitz.com/edit/react-rzuyc3?file=MyContext.js
//https://www.youtube.com/watch?v=ch8kiuRJc7I&t=517s

export default function AppRouting(props) {
    return (
        <MyProvider> {/*to use global state in components*/}
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path= '/' component={Home}></Route>
                    <Route exact path= '/home' component={Home}></Route>
                    <Route exact path= '/login' component={Login}></Route>
                    <Route exact path= '/register' component={Register}></Route>
                    <Route exact path= '/users/edit/:userId' component={EditProfile}></Route>
                    <Route exact path= '/users/:userId' component={Profile}></Route>
                    <Route exact path= '/post/search' component={SearchPost}></Route>
                    <Route exact path= '/post/new' component={AddPost}></Route>
                    {/* https://stackoverflow.com/questions/47705126/exclude-a-value-for-a-path-parameter-in-react-router-by-type */}
                    <Route exact path= '/post/:postId' component={Post}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </BrowserRouter>
        </MyProvider>
        
    )
}
