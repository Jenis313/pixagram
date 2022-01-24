import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './Auth/Login.controller';
import Register from './Auth/Register.controller';
import Header from './Common/Header/Header.component';
import Home from './Home/Homepage/Home.controller';
import AddPost from './Post/AddPost/AddPost.controlller';
import Post from './Post/ViewPost/PostModal/Post.controller';
import Profile from './Profile/Profile.controller';
export default function AppRouting(props) {
    return (
        <BrowserRouter>
            
            <Header />
            <Switch>
                <Route exact path= '/home' component={Home}></Route>
                <Route exact path= '/login' component={Login}></Route>
                <Route exact path= '/register' component={Register}></Route>
                <Route exact path= '/users' component={Profile}></Route>
                <Route exact path= '/post/new' component={AddPost}></Route>
                {/* https://stackoverflow.com/questions/47705126/exclude-a-value-for-a-path-parameter-in-react-router-by-type */}
                <Route exact path= '/post/:postId' component={Post}></Route>
            </Switch>
        </BrowserRouter>
    )
}
