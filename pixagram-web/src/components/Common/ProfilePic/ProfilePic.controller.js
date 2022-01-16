import React from 'react';
import './ProfilePic.controller.css';
import CommonProfilePic from './../../../images/profile.png';

export default function ProfilePic(props) {
    // this takes 
    console.log(typeof(props.size))
    const size = props.size ? props.size : "50px";
    const profile = props.outline
                    ? <div className='profile-pic-container'>
                        <a href="#"><img className='profilePic-img' src={CommonProfilePic} width={size} height={size} alt="" /></a>
                      </div>
                    : <div className='profile-pic-container'>
                        <a href="#"><img className='profilePic-img' src={CommonProfilePic} width={size} height={size} alt="" /></a>
                      </div>
    return (
        profile
    )
}
