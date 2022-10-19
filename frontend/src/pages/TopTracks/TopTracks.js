import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import TrackPreview from './TrackPreview';
import Header from '../../components/Header';
import CustomSwiper from '../../components/CustomSwiper';

import { SwiperSlide } from 'swiper/react';
import { Button } from '@mui/material';
import Sidebar from '../../components/Sidebar';

const TopTracks = () => {
  const params = useParams();
  const artist_id = params['artist_id']; // extract the artist id from the params

  sessionStorage.setItem('page', 4); // set the page number

  let [topTracks, setTopTracks] = useState([]);
  let [selectedTracks, setSelectedTracks] = useState([]); // list of track objects
  let [selectedTracksName, setSelectedTracksName] = useState([]); // list of name atrributes of track objects
  let navigate = useNavigate();

  // Update list of name attributes of track objects
  useEffect(() => {
    let selectedTracksName = selectedTracks.map((track) => track.name);
    setSelectedTracksName(selectedTracksName);
  }, [selectedTracks]);

  // Get the top tracks of the given artist id
  useEffect(() => {
    const getTopTracks = async () => {
      try {
        const response = await fetch(`/spotify/top-tracks/VN/${artist_id}`);
        const data = await response.json();
        setTopTracks(Object.values(data));
      } catch (e) {
        navigate('/');
      }
    };
    getTopTracks();
  }, [artist_id]);

  // Set the sessionStorage value
  const handleLinkClick = () => {
    let selectedTracksId = selectedTracks.map((track) => track.track_id); // get the track_id from every selected track and store it in the sessionStorage
    sessionStorage.setItem('tracks', selectedTracksId);
    sessionStorage.setItem('tracks_name', selectedTracksName);
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className='main-container'>
        <Header title='Select Tracks' />

        <CustomSwiper>
          {topTracks.map((track, index) => (
            <SwiperSlide key={index}>
              <TrackPreview
                key={index}
                track={track}
                selectedTracks={selectedTracks}
                setSelectedTracks={setSelectedTracks}
              ></TrackPreview>
            </SwiperSlide>
          ))}
        </CustomSwiper>

        <div className='tracks-info-wrapper'>
          <div className='tracks-selection-wrapper'>
            <p>Selected Track: {selectedTracksName.join(', ')}</p>
          </div>
          <div className='get-recommendation-wrapper'>
            {selectedTracks.length === 2 ? (
              <Link to='/track-recommendations'>
                <Button
                  variant='contained'
                  onClick={() => {
                    handleLinkClick();
                  }}
                >
                  Get Recommendation
                </Button>
              </Link>
            ) : (
              <p> PLEASE SELECT 2 TRACKS</p>
            )}
          </div>
        </div>
        {/* <div className='tracks-wrapper'>
        {topTracks.map((track, index) => (
          <TrackPreview
            key={index}
            track={track}
            selectedTracks={selectedTracks}
            setSelectedTracks={setSelectedTracks}
          ></TrackPreview>
        ))}
      </div> */}
      </div>
    </>
  );
};

export default TopTracks;
