import React from 'react';
import './NotFound.controller.css'
import NotFoundImage from './../../../../images/notFound.png';
export default function NotFound() {
  return <div>
      <div className='not-found-container'>
        <img className='not-found-img' src={NotFoundImage}></img>
      </div>
  </div>;
}
