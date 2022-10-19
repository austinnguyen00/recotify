import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import CustomSwiper from '../../components/CustomSwiper';
import Sidebar from '../../components/Sidebar';
import { Button } from '@mui/material';

import { SwiperSlide } from 'swiper/react';
import RecommendTrack from './RecommendTrack';

const TrackRecommendations = () => {
  sessionStorage.setItem('page', 5);

  let genre = sessionStorage.getItem('genre');
  let artist = sessionStorage.getItem('artist');
  let tracks = sessionStorage.getItem('tracks');

  let [recommendTracks, setRecommendTracks] = useState([]);

  const navigate = useNavigate();

  const getTopTracks = async () => {
    try {
      const response = await fetch(
        `/spotify/track-recommendations/VN/${artist}/${tracks}/${genre}`
      );
      const data = await response.json();
      setRecommendTracks(Object.values(data));
    } catch (error) {
      // console.log('Cannot fetch recommendations');
      navigate('/');
    }
  };

  useEffect(() => {
    getTopTracks();
    // console.log('Recommended Tracks:', recommendTracks);
  }, []);

  return (
    <>
      <Sidebar></Sidebar>
      <div className='main-container'>
        <Header title='Track Recommendations' />
        <CustomSwiper>
          {recommendTracks.map((track, index) => (
            <SwiperSlide key={index}>
              <RecommendTrack key={index} track={track}></RecommendTrack>
            </SwiperSlide>
          ))}
        </CustomSwiper>
        <div className='recommendation-button-wrapper'>
          <Button
            variant='contained'
            onClick={() => window.location.reload(false)}
            // onClick={() => {
            // getTopTracks();
            // }}
          >
            Get More Tracks
          </Button>
        </div>
      </div>
    </>
  );
};

export default TrackRecommendations;
