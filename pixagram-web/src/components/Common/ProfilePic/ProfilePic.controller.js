import React from 'react';
import './ProfilePic.controller.css';
import CommonProfilePic from './../../../images/profile.png';

export default function ProfilePic(props) {
    const profile = props.outline
                    ? <a href="#"><img className='profilePic-img' src={CommonProfilePic} width="50px" height="50px" alt="" /></a>
                    : <a href="#"><img src={CommonProfilePic} width="50px" height="50px" alt="" /></a>
    return (
        profile
    )
}
