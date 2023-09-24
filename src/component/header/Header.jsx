import { useState, useEffect, useRef } from 'react';
import './header.css';
import logo from '../../assets/react.svg';
import TransitionsModal from './Modal';
import Skeleton from '@mui/material/Skeleton';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function Header() {
    const [link, setLink] = useState('');
    const [videoDetails, setVideoDetails] = useState(null);
    const [info, setInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const ref = useRef()
    const isInView = useInView(ref)

    const mainControls = useAnimation();

    useEffect(() => {
        mainControls.start('visible');
    }, [mainControls]);

    const extractVideoID = (url) => {
        const videoIDPattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/ ]{11})/i;
        const matches = url.match(videoIDPattern);
        return matches ? matches[1] : null;
    };

    const fetchVideoDetails = () => {
        const videoID = extractVideoID(link);
        if (!videoID) {
            setError('Invalid YouTube link.');
            return;
        }

        const apiKey = 'AIzaSyDIf9X3nxHznmwhX1aLDx93_vyB4HAlIus'; // Remember to hide or secure API keys in real applications
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${apiKey}&part=snippet`;

        setLoading(true);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    setVideoDetails(data.items[0].snippet);
                    setLoading(false);
                    setError('');  // Clear previous error messages
                } else {
                    setError('Video not found.');
                    setLoading(false);
                }
            })
            .catch(() => {
                setError('Error fetching video details.');
                setLoading(false);
            });
    };

    useEffect(() => {
        if (link && (link.includes('youtube.com/watch?') || link.includes('youtube.com/shorts/'))) {
            fetchVideoDetails();
        }
    }, [link]);

    const slideIn = {
        hidden: { opacity: 0, y: -75 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25 } }
    };

    return (
        <div className='container'>
            <nav className='menu'>
                <div className="logo">
                    <motion.h1
                        variants={slideIn}
                        initial="hidden"
                        animate={mainControls}
                    >
                        YouFame
                    </motion.h1>
                </div>
                <div className='menulist'>
                    <motion.p
                        variants={slideIn}
                        initial="hidden"
                        animate={mainControls}
                    >
                        Home
                    </motion.p>
                    <motion.p
                        variants={slideIn}
                        initial="hidden"
                        animate={mainControls}
                    >
                        How It Works
                    </motion.p>
                </div>
            </nav>
            <div className="menuheader">
                <motion.h1
                    variants={slideIn}
                    initial="hidden"
                    animate={mainControls}
                >
                    Top-Quality YouTube Engagement Services
                </motion.h1>
                <motion.p
                    variants={slideIn}
                    initial="hidden"
                    animate={mainControls}
                >
                    Our offerings go beyond mere views. We provide YouTube subscribers, likes, genuine <br /> comments, and shares to enhance your channel's performance.
                </motion.p>
                
                <div className='input_container'>
                    <input type="search" value={link}
                        onChange={(e) => {
                            setVideoDetails(null);
                            setError('');
                            setLink(e.target.value);
                        }}
                        placeholder='Search video or paste link (youtube.com/watch? =xyz' />
                    <button className='start' onClick={fetchVideoDetails}>START</button>
                    {info && <TransitionsModal setInfo={setInfo} video={videoDetails} />}
                    {videoDetails && (
                        <motion.aside
                            initial="hidden"
                            animate="visible"
                            variants={slideIn}
                            onClick={() => setInfo(true)}
                        >
                            <img src={videoDetails.thumbnails.high.url} alt="" />
                            <div>
                                <h2>
                                    {videoDetails.title.length > 70
                                        ? videoDetails.title.substring(0, 70) + "..."
                                        : videoDetails.title}
                                </h2>
                                <p>
                                    {videoDetails.description.length > 100
                                        ? videoDetails.description.substring(0, 100) + "..."
                                        : videoDetails.description}
                                </p>
                            </div>
                        </motion.aside>
                    )}
                    {loading && <aside>
                        <Skeleton variant="rounded" width={210} height={60} />
                        <div>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="rounded" width={'100%'} height={40} />
                        </div>
                    </aside>
                    }
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </div>
    );
}
