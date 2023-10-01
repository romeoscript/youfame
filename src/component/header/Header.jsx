import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import logo from '../../assets/react.svg';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import TransitionsModal from './Modal';
import Skeleton from '@mui/material/Skeleton';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled from "styled-components";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  background-color: var(--nav);
  color: var(--white);
  position: relative;
  z-index: 500;
  @media only Screen and (max-width: 64em) {
    padding: 0.5rem 3rem;
  }
  @media only Screen and (max-width: 40em) {
    padding: 0.5rem 1.5rem;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  width: 2rem;
  height: auto;
  cursor: pointer;
  img {
    margin-right: 0.5rem;
  }
`;

const Nav = styled.nav`
  width: 25rem;
  max-width: 40rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
  @media only Screen and (max-width: 48em) {
    display: none;
  }
  a {
    font-weight: 600;
    line-height: 1.5;
    color: var(--white);
    &::after {
      content: "";
      display: block;
      height: 3px;
      width: 0;
      background: transparent;
      transition: width 0.5s;
    }
    &:not(:last-child):hover::after {
      width: 100%;
      background: var(--purple);
    }
    /* &:not(:last-child) {
      margin-right: 2rem;
    } */
    /* @media only Screen and (max-width: 48em) {
      &:not(:last-child) {
        margin-right: 1rem;
      }
    } */
  }
`;

const Button = styled.button`
  background-color: var(--purple);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
  @media only Screen and (max-width: 40em) {
    font-size: 1.2rem;
    &:hover {
      transform: none;
    }
    &:focus {
      transform: none;
    }
  }
`;
const HamburgerBtn = styled.button`
  display: none;
  @media only Screen and (max-width: 48em) {
    display: inline-block;
  }
  position: relative;
  background-color: transparent;
  width: 2rem;
  height: 2px;
  margin-top: 0rem;
  transition: all 0.3s;
  cursor: pointer;
  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    width: 2rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    cursor: pointer;

    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const MobileMenu = styled.nav`
  display: none;
  @media only Screen and (max-width: 48em) {
    display: flex;
  }
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  overflow-x: hidden;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  opacity: ${(props) => (props.clicked ? "1" : 0)};
  visibility: ${(props) => (props.clicked ? "visible" : "hidden")};
  transition: all 0.5s;
  z-index: -10;
  background-color: rgb(53 53 63 / 95%);
  border-radius: 20px;
  margin: 0.5rem;
  a {
    color: var(--white);
    font-weight: 600;
    font-size: 1.5rem;
    margin: 1.5rem;
    cursor: pointer;
  }
`;

export default function Header() {
    const [link, setLink] = useState('');
    const [videoDetails, setVideoDetails] = useState(null);
    const [videos, setVideos] = useState([]);
    const [info, setInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const mainControls = useAnimation();
    const [click, setClick] = useState(false);
    //const handleClick = () => setClick(!click);
    const ref = useRef(null);

    gsap.registerPlugin(ScrollTrigger);

    const scrollUp = (id, e) => {
        e.preventDefault();
        const element = document.getElementById(id);
        element.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    };

    const handleClick = (id, e) => {
        setClick(!click);
        scrollUp(id, e);
    };

    useEffect(() => {
        const element = ref.current;

        const mq = window.matchMedia("(max-width: 40em)");
        // console.log("mq", mq);
        if (mq.matches) {
            gsap.to(element, {
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                padding: "1rem 2.5rem",
                background: "#505abc",
                borderRadius: "0 0 50px 50px",

                border: "2px solid var(--white)",

                duration: 1,
                ease: "power1.out",

                scrollTrigger: {
                    trigger: element,
                    start: "bottom+=200 top",
                    end: "+=100",
                    scrub: true,
                },
            });
        } else {
            gsap.to(element, {
                position: "fixed",
                top: "0.2rem",
                left: "3rem",
                right: "3rem",
                padding: "1.5rem 2rem",
                background: "#505abc",
                borderRadius: "50px",

                border: "3px solid var(--white)",

                duration: 1,
                ease: "power1.out",

                scrollTrigger: {
                    trigger: element,
                    start: "bottom+=300 top",
                    end: "+=250",
                    scrub: true,
                },
            });
        }
    }, []);


    useEffect(() => {
        mainControls.start('visible');
    }, [mainControls]);

    const extractVideoID = (url) => {
        const videoIDPattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/ ]{11})/i;
        const matches = url.match(videoIDPattern);
        return matches ? matches[1] : null;
    };

    const fetchVideoDetails = () => {

        if (!link.trim()) {
            setError('Please enter a keyword or paste a YouTube link.');
            return; // Exit the function if the input is empty
        }
        const videoID = extractVideoID(link);
        const apiKey = 'AIzaSyDIf9X3nxHznmwhX1aLDx93_vyB4HAlIus';
        let apiUrl = '';

        if (videoID) {
            apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${apiKey}&part=snippet`;
        } else {
            apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(link)}&part=snippet&type=video&maxResults=5`;
        }

        setLoading(true);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (videoID) {
                    setVideos([data.items[0].snippet]);
                } else {
                    setVideos(data.items.map(item => item.snippet));
                }
                setLoading(false);
                setError('');
            })
            .catch(() => {
                setError('Error fetching video details.');
                setLoading(false);
            });
    };

    const slideIn = {
        hidden: { opacity: 0, y: -75 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25 } }
    };

    return (
        <div className='container'>
            <Headers ref={ref}>
                <Logo>

                    <h3>Promoteclips</h3>
                </Logo>
                <Nav>

                    <a href="#home" onClick={(e) => scrollUp("home", e)}>
                        Home
                    </a>
                    <a href="#about" onClick={(e) => scrollUp("about", e)}>
                        FAQS
                    </a>

                    <a href="#contact" onClick={(e) => scrollUp("contact", e)}>
                        <Button>Contact Us</Button>
                    </a>
                </Nav>
                <p className='not_show'> {click ? <CloseIcon clicked={click} onClick={() => setClick(!click)} /> : <MenuIcon clicked={click} onClick={() => setClick(!click)} />}
                </p>

                {/* <HamburgerBtn clicked={click} onClick={() => setClick(!click)}>
                <MenuIcon />
                </HamburgerBtn> */}
                <MobileMenu clicked={click}>
                    <a href="#home" onClick={(e) => handleClick("home", e)}>
                        Home
                    </a>
                    <a href="#about" onClick={(e) => handleClick("about", e)}>
                        About Us
                    </a>
                    <a href="#services" onClick={(e) => handleClick("services", e)}>
                        Services
                    </a>
                    <a href="#contact" onClick={(e) => handleClick("contact", e)}>
                        <Button>Contact Us</Button>
                    </a>
                </MobileMenu>
            </Headers>

            <div className="menuheader">
                <motion.h1
                    variants={slideIn}
                    initial="hidden"
                    animate={mainControls}
                >
                    Skyrocket your YouTube Views with us!
                </motion.h1>
                <motion.p
                    variants={slideIn}
                    initial="hidden"
                    animate={mainControls}
                    className='motion_p'

                >
                    With our services, you can reach your desired YouTube Views! And not just that, you get more subscribers, likes, shares and even comments! So what are you waiting for?!
                </motion.p>

                <div className='input_container'>
                    <FormControl sx={{ width: { xs: '90%', sm: '40%' } }}>
                        <OutlinedInput
                            placeholder="Search video or paste link (youtube.com/watch? =xyz"
                            value={link}
                            onChange={(e) => {
                                setLink(e.target.value);
                                if (e.target.value.trim() === '') {
                                    setVideos([]);
                                    setVideoDetails(null);
                                    setLoading(false);
                                    setError('');
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    fetchVideoDetails();
                                }
                            }}

                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon cursor="pointer" onClick={fetchVideoDetails} />
                                </InputAdornment>
                            }
                        />
                    </FormControl>


                    <button className='start' onClick={fetchVideoDetails}>START</button>
                    {info && <TransitionsModal setInfo={setInfo} video={videoDetails} />}
                    <section className='absolute_video'>
                        {videos.map((videoDetail, index) => (
                            <motion.aside
                                key={index}
                                initial="hidden"
                                animate="visible"
                                variants={slideIn}
                                onClick={() => {
                                    setVideoDetails(videoDetail);
                                    setInfo(true);
                                }}
                            >
                                <img src={videoDetail.thumbnails.high.url} alt="" />
                                <div>
                                    <h2>
                                        {videoDetail.title.length > 70
                                            ? videoDetail.title.substring(0, 70) + "..."
                                            : videoDetail.title}
                                    </h2>
                                    <p>
                                        {videoDetail.description.length > 100
                                            ? videoDetail.description.substring(0, 100) + "..."
                                            : videoDetail.description}
                                    </p>
                                </div>
                            </motion.aside>
                        ))}

                        {loading && <aside>
                            <Skeleton variant="rounded" width={210} height={60} />
                            <div>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                            </div>
                        </aside>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </section>
                </div>
            </div>
        </div>
    );
}
