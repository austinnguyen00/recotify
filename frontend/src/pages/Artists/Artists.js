import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Artist from './Artist';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';

import { Swiper, SwiperSlide } from 'swiper/react';

import CustomSwiper from '../../components/CustomSwiper';
import Sidebar from '../../components/Sidebar';

// Import Swiper styles

const Artists = () => {
  // Extract the genre parameter
  const param = useParams();
  const genre = param.genre;
  const country = sessionStorage.getItem('country_code');

  sessionStorage.setItem('page', 3);

  let [artists, setArtists] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await fetch(
          `/spotify/artists-by-genre/${country}/${genre}`
        ); // fetch artists of this genre
        const data = await response.json();
        // console.log('Data:', data);
        setArtists(Object.values(data)); // convert dictionary to array of objects
      } catch (e) {
        navigate('/');
      }
    };

    getArtists();
  }, [genre]);

  return (
    <>
      <Sidebar></Sidebar>
      <div className='main-container'>
        <Header title='Select Artist' />
        <CustomSwiper>
          {artists.map((artist, index) => (
            // <Artist key={index} artist={artist}></Artist>
            <SwiperSlide key={index}>
              <Artist key={index} artist={artist}></Artist>
            </SwiperSlide>
          ))}
        </CustomSwiper>

        {/* <div className='artists-wrapper'>
        {artists.map((artist, index) => (
          <Artist key={index} artist={artist}></Artist>
        ))}
      </div> */}
      </div>
    </>
  );
};

export default Artists;
