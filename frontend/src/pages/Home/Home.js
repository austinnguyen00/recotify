import { Button } from '@mui/material';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import spotifyLogo from './Spotify_Icon_RGB_White.png';

const Home = () => {
  // const { auth, setAuth } = useAuth();
  // console.log('auth:', auth);
  // console.log('setAuth:', setAuth);

  const Authorization = async () => {
    try {
      const response = await fetch('spotify/get-auth-url');
      const data = await response.json();
      console.log('data:', data);
      // setAuth(true);
      window.location.replace(data.url); // open the link to spotify authorization
    } catch (e) {
      console.log('Error: ' + e.message);
    }
  };

  return (
    <div className='homepage-container'>
      <div className='homepage-wrapper'>
        <div className='homepage-title'>
          <h1>Recotify</h1>
        </div>
        <div className='homepage-info'>
          <p>Finding tracks matching your taste with Spotify</p>
          <img className='homepage-logo' src={spotifyLogo} alt='Logo' />
        </div>
        <div className='homepage-button'>
          <Button variant='contained' onClick={Authorization}>
            <p>Connect to Spotify</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
