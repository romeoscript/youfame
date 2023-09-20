import React from 'react'
import './body.css'
export default function Body() {
  return (
    <div className='page_container'>
      <div className='pagecontent'>
        <div className='youtubetext'>
          <h2>Add Your Youtube Video</h2>
          <p>To promote your YouTube video, you can either paste the video URL or enter the video name. Afterward, select the desired quantity of views, likes, subscribers, comments, or shares.</p>
        </div>
        <div className='youtubeimage'>
          <img src="icons/Rectangle 3.png" alt="" />
        </div>
      </div>

      <div className='pagecontent second_child'>
        <div className='youtubeimage'>
          <img src="icons/tab.png" alt="" />
        </div>
        <div className='youtubetext'>
          <h2> Customize Your Order</h2>
          <p> Once you've included your video, you're just one step away from completing your order. By default, the order quantities are pre-set as recommendations for a quick order. However, you have the option to tailor them to your specific requirements by utilizing the sliders and adjusting them from left to right or vice versa.</p>
        </div>
      </div>

      <div className='pagecontent'>
        <div className='youtubetext'>
          <h2> Finish your Order </h2>
          <p>To Once you've included your video, you're just one step away from completing your order. By default, the order quantities are pre-set as recommendations for a quick order. However, you have the option to tailor them to your specific requirements by utilizing the sliders and adjusting them from left to right or vice versa. </p>
        </div>
        <div className='youtubeimage'>
          <img src="icons/camera.png" alt="" />
        </div>
      </div>
      <h1 className='whyUs_header'>Why Use YouFame? </h1>
      <div className='whyUs'>
        <div>
          <img src="icons/video.png" alt="" />
          <p>Enhance your video's visibility and credibility with genuine views from real users.</p>
        </div>
        <div>
          <img src="icons/youtbe.png" alt="" />
          <p>Enhance your video's visibility and credibility with genuine views from real users.</p>
        </div>
        <div>
          <img src="icons/chart.png" alt="" />
          <p>Enhance your video's visibility and credibility with genuine views from real users.</p>
        </div>
      </div>
    </div>
  )
}
