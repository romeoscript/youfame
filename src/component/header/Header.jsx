import React from 'react'
import  './header.css'

export default function Header() {
  return (
    <div className='container'>
        <div className='menu'>
            <div className="logo">
                <h1>YouFame</h1>
            </div>
            <div className='menulist'>
                <p>Home</p>
                <p>How It Works</p>
            </div>
        </div>
        <div className="menuheader">
            <h1>Top-Quality YouTube Engagement Services</h1>
            <p>Our offerings go beyond mere views. We provide YouTube subscribers, likes, genuine <br /> comments, and shares to enhance your channel's performance.</p>
            <div>
                <h2>Order Here</h2>
                <img src="icons/arrow.png" alt="" />
                <input type="text"  placeholder='Search video or paste link (youtube.com/watch? =xyz'/>
                <button className='start'>START</button>
            </div>
        </div>
    </div>
  )
}
