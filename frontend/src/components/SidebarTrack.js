import React, { useState, useEffect } from 'react';
import { PlayAudio } from './PlayAudio';
import useUserContext from '../hooks/useUserContext';
import { useLocation } from 'react-router-dom';

import { IconButton } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const SidebarTrack = () => {
  const { trackPlaying, setTrackPlaying, isPlaying, setIsPlaying } =
    useUserContext();

  if (!Object.keys(trackPlaying['track']).length == 0) {
    var track = trackPlaying.track;
  }

  // const beforeUnloadListener = (event) => {
  //   event.preventDefault();
  //   return (event.returnValue = 'Are you sure you want to exit?');
  // };
  // window.addEventListener('beforeunload', beforeUnloadListener, {
  //   capture: true,
  // });
  if (trackPlaying.is_playing) {
    window.addEventListener('unload', () => {
      alert('hello');
      trackPlaying.toggle();
    });
  }

  const location = useLocation();
  useEffect(() => {
    // console.log('Location update:', location);
    setTrackPlaying({
      ...trackPlaying,
      track: {}, // current playing track object
      old_track: {}, // previous playing track object
      is_playing: false,
      audio: null, // audio of current track
      toggle: null,
      playing: null,
    });
  }, [location]);

  // console.log(trackPlaying);

  const currentTrackToggle = () => {
    // console.log('Button clicked on here bitch');
    setIsPlaying(!isPlaying);
    // console.log('isPlaying is set to ' + isPlaying);
  };

  // useEffect(() => {
  //   if (trackPlaying.is_playing) {
  //     trackPlaying.audio.addEventListener('pagehide', trackPlaying.toggle);
  //     return () => {
  //       trackPlaying.audio.removeEventListener('pagehide', trackPlaying.toggle);
  //     };
  //   }
  // });

  // useEffect(() => {
  //   if (trackPlaying.audio != null) {
  //     // console.log('is_playing_effect:', trackPlaying.is_playing);
  //     // console.log('trackPlaying.audio:', trackPlaying.audio);
  //     // console.log('type of trackPlaying.audio:', typeof trackPlaying.audio);
  //     trackPlaying.is_playing
  //       ? trackPlaying.audio.play()
  //       : trackPlaying.audio.pause();
  //   }
  // }, [trackPlaying.is_playing]);

  return (
    <>
      {!Object.keys(trackPlaying['track']).length == 0 ? (
        <div className='sidebar-track-wrapper'>
          <a
            className='sidebar-track-link'
            href={track.track_url}
            target='_blank'
            rel='noreferrer'
          >
            <IconButton>
              <LaunchIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </a>
          <div className='sidebar-track-cover-wrapper'>
            <img
              className='sidebar-track-cover-image'
              src={track.image}
              alt='Track Cover'
            ></img>
          </div>
          <div className='sidebar-track-info-wrapper'>
            <p className='sidebar-track-name'>{track.name}</p>
            <p className='sidebar-track-artists'>
              {Object.values(track.artists)
                .map((artist) => artist.name)
                .join(', ')}
            </p>
          </div>
          <div className='sidebar-track-button-wrapper'>
            <IconButton onClick={trackPlaying.toggle}>
              {/* <IconButton> */}
              {trackPlaying.is_playing ? (
                <PauseIcon sx={{ fontSize: 40 }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: 40 }} />
              )}
            </IconButton>
            {/* <PlayArrowIcon sx={{ color: '#023e8a', fontSize: 50 }} /> */}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default SidebarTrack;
