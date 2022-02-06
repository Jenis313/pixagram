import React, { Component } from 'react'
import ProfilePic from '../../Common/ProfilePic/ProfilePic.controller';
import ProfileImg from './../../../images/profile.png'
import { httpClient } from '../../../utils/httpClient';
import { NavLink } from 'react-router-dom';
import './EditProfile.component.css'
import { ErrorHandler } from '../../../utils/errorHandler';
import { Notify } from '../../../utils/notify';
const REACT_IMG_URL = process.env.REACT_APP_IMG_URL;

export default class EditProfile extends Component {
    constructor(){
        super();
        this.state = {
            user : {

            },
            newProfileImg : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log('component successfully loaded!');
        httpClient.GET(`/users/${JSON.parse(localStorage.getItem('user'))._id}`)
        .then((user) => {
            console.log('logged in user is -> ',user.data.image);
            this.setState({
               user : {
                   ...user.data
               }
            })
        })
        .catch((err) => {
            ErrorHandler(err)
        })
    }
    handleChange(e){
        const {name, value, type, files} = e.target;
        if(type === 'file'){
            console.log(type, files);
            this.setState({
                newProfileImg : files[0]
            })
        }
        this.setState((prevState) => ({
            user : {
                ...prevState.user,
                [name] : value
            }
        }))
    }
    handleSubmit(e){
        e.preventDefault();
        httpClient.UPLOAD('PUT',`/users/${JSON.parse(localStorage.getItem('user'))._id}`, this.state.user, [this.state.newProfileImg])
        .then((response) => {
            Notify.showSuccess('Profile Updated!')
            this.props.history.push('/home')
        })
        .catch((err) => {
            // console.log('error is-->', err.response);
            ErrorHandler(err);
        })
    }
 
    render() {
        console.log('stateeeee', this.state)
        let profileEditForm;
        // check if loggedIn
        if(localStorage.getItem('token')){
            if(this.state.newProfileImg){console.log('yesss')}else{console.log('noooo')}
            // Check if users is editing own profile
            if(this.props.match.params.userId == JSON.parse(localStorage.getItem('user'))._id){
                profileEditForm = 
                                <div className='profile-edit-form-cont'>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className='edit-name'>
                                            <label htmlFor='edit-name'>Update name</label>
                                            <input onChange={this.handleChange} name='fullName' type={'text'} id = "edit-name" value={this.state.user.fullName ? this.state.user.fullName : ''}></input>
                                        </div>
                                        <div className='edit-image'>
                                            <p>Update profile picture</p>
                                            <div className='edit-image-cont'>
                                                <div className="icon">
                                                    {
                                                        this.state.newProfileImg //it means user has just uploaded a new image 
                                                        ? <img src={URL.createObjectURL(this.state.newProfileImg)}></img>
                                                        : <img src={this.state.user.image ? `${REACT_IMG_URL}/${this.state.user.image}` : '#'}></img>
                                                    }
                                                </div>
                                                <div className='edit-image-right'>
                                                    <label htmlFor="edit-image" >Browse files</label>
                                                    <input onChange={this.handleChange} type="file" name="image" id="edit-image" accept="image/*"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="edit-save">
                                            <label htmlFor="profile-submit"></label>
                                            <button name="submit" id="profile-submit">Save</button>
                                        </div>
                                    </form>
                                </div>
            }else{
                profileEditForm = <div className='profile-edit-form-cont'>Sorry you are not allowed to perform this action</div>
            }
        }else{
            profileEditForm = <p>Please login to edit profile</p>
        }
        return (
            <div className='edit-profile-main'>
                <div className="container">
                    {/* <!-- left cont --> */}
                    <section className="main-left">
                        <h1>Edit Profile</h1>
                        {profileEditForm}
                    </section> 
                    {/* <!-- Right Cont --> */}
                    <section className="main-right">
                    </section>
                </div>
            </div>
        )
    }
}
