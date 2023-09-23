import { useState } from 'react'
import './header.css'
import logo from '../../assets/react.svg'

export default function Header() {
    const [link, setLink] = useState('');
    const [videoDetails, setVideoDetails] = useState(null);

    const extractVideoID = (url) => {
        let videoIDPattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        let matches = url.match(videoIDPattern);
        return matches ? matches[1] : null;
    };

    const fetchVideoDetails = () => {
        const videoID = extractVideoID(link);
        if (!videoID) {
            alert('Invalid YouTube link.');
            return;
        }

        const apiKey = 'AIzaSyDIf9X3nxHznmwhX1aLDx93_vyB4HAlIus';
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${apiKey}&part=snippet`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    setVideoDetails(data.items[0].snippet);
                } else {
                    alert('Video not found.');
                }
            })
            .catch(error => {
                alert('Error fetching video details.');
            });
    };

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
                    <input type="text" value={link}

                        onChange={(e) => {
                            setLink(e.target.value);
                            fetchVideoDetails();
                        }}
                        placeholder='Search video or paste link (youtube.com/watch? =xyz' />
                    <button className='start' onClick={fetchVideoDetails}>START</button>
                    {videoDetails && <aside>
                        <img src={videoDetails.thumbnails.default.url } alt="" />
                        <div>
                            <h2>{videoDetails.title }</h2>
                            <p>{(videoDetails.description.length > 100 ? videoDetails.description.substring(0, 100) + "..." : videoDetails.description)}</p>
                        </div>
                    </aside>
                    }

                </div>
            </div>
        </div>
    )
}
