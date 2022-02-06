import React from 'react';
import {NavLink} from 'react-router-dom'
import './ProfilePic.controller.css';
import CommonProfilePic from './../../../images/profile.png';
const REACT_IMG_URL = process.env.REACT_APP_IMG_URL;

export default function ProfilePic(props) {
    // this takes 
    const size = props.size ? props.size : "50px";
    const link = props.link ? props.link : '#';
    const img = props.img ? `${REACT_IMG_URL}/${props.img}` : CommonProfilePic;
    const profile = props.outline
                    ? <div className='profile-pic-container'>
                        <NavLink to = {link}>
                            <img className='profilePic-img-with-outline' src={img} width={size} height={size} alt="" />
                        </NavLink>
                      </div>
                    : <div className='profile-pic-container'>
                        <NavLink to = {link}>
                            <img className='profilePic-img-without-outline' src={img} width={size} height={size} alt="" />
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