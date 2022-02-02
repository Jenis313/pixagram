import React from 'react';
import {NavLink} from 'react-router-dom'
import './ProfilePic.controller.css';
import CommonProfilePic from './../../../images/profile.png';

export default function ProfilePic(props) {
    // this takes 
    const image = props.img ? props.img : CommonProfilePic;
    const size = props.size ? props.size : "50px";
    const link = props.link ? props.link : '#';
    const profile = props.outline
                    ? <div className='profile-pic-container'>
                        <NavLink to = {link}>
                            <img className='profilePic-img-with-outline' src={image} width={size} height={size} alt="" />
                        </NavLink>
                      </div>
                    : <div className='profile-pic-container'>
                        <NavLink to = {link}>
                            <img className='profilePic-img-without-outline' src={image} width={size} height={size} alt="" />
                        </NavLink>
                      </div>
    return (
        profile
    )
}
 
// export default function ProfilePic(props) {
//     // this takes 
//     const size = props.size ? props.size : "50px";
//     const profile = props.outline
//                     ? <div className='profile-pic-container'>
//                         <a href="#"><img className='profilePic-img' src={CommonProfilePic} width={size} height={size} alt="" /></a>
//                       </div>
//                     : <div className='profile-pic-container'>
//                         <a href="#"><img className='profilePic-img' src={CommonProfilePic} width={size} height={size} alt="" /></a>
//                       </div>
//     return (
//         profile
//     )
// }