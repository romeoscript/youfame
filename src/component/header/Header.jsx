import { useState } from 'react'
import './header.css'
import logo from '../../assets/react.svg'
import TransitionsModal from './Modal';
import Skeleton from '@mui/material/Skeleton';
export default function Header() {
    const [link, setLink] = useState('');
    const [videoDetails, setVideoDetails] = useState(null);
    const [info, setInfo] = useState(false)
    const [loading, setLoading] = useState(false)

    // const showModal =() =>{

    // }

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
        setLoading(true)
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    setVideoDetails(data.items[0].snippet);
                  
                } else {
                    alert('Video not found.');
                 
                }
                setLoading(false)
            })
            .catch(error => {
                alert('Error fetching video details.');
                setLoading(false)
            });
    };

    return (
        <div className='container'>
            <nav className='menu'>
                <div className="logo">
                    <h1>YouFame</h1>
                </div>
                <div className='menulist'>
                    <p>Home</p>
                    <p>How It Works</p>
                </div>
            </nav>
            <div className="menuheader">
                <h1>Top-Quality YouTube Engagement Services</h1>
                <p>Our offerings go beyond mere views. We provide YouTube subscribers, likes, genuine <br /> comments, and shares to enhance your channel's performance.</p>
                <div className='input_container'>
                    <input type="search" value={link}
                        onChange={(e) => {
                            setLink(e.target.value);
                        }}
                        placeholder='Search video or paste link (youtube.com/watch? =xyz' />
                    <button className='start' onClick={fetchVideoDetails}>START</button>
                    {info && <TransitionsModal setInfo={setInfo} video={videoDetails} />}
                    {loading ? (
                        <aside>
                            <Skeleton variant="rounded" width={210} height={60} />
                            <div>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                            </div>
                        </aside>
                    ) : videoDetails && (
                        <aside onClick={() => setInfo(true)}>
                            <img src={videoDetails.thumbnails.high.url} alt="" />
                            <div>
                                <h2>{videoDetails.title.length > 70 ? videoDetails.title.substring(0, 70) + "..." : videoDetails.title}</h2>
                                <p>{(videoDetails.description.length > 100 ? videoDetails.description.substring(0, 100) + "..." : videoDetails.description)}</p>
                            </div>
                        </aside>
                    )}
                </div>

            </div>
        </div>
    )
}
