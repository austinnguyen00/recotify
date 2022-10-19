import React from 'react';
import { Grid, Typography, IconButton, LinearProgress } from '@mui/material';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const MusicPlayer = ({ song }) => {
  const songProgress = (song.time / song.duration) * 100; // current song time

  const pauseSong = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };
    await fetch('http://localhost:8000/spotify/pause', requestOptions);
  };

  const playSong = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };
    await fetch('http://localhost:8000/spotify/play', requestOptions);
  };

  return (
    <div>
      <Grid container align='center'>
        <Grid item align='center' xs={12}>
          <img
            className='song-cover-image'
            src={song.image}
            alt='Album Cover'
          ></img>
        </Grid>
        <Grid item align='center' xs={8}></Grid>
      </Grid>
      <div>
        <Typography component='h5' variant='h5'>
          {song.title}
        </Typography>
        <Typography variant='h5'>{song.artist}</Typography>
        <div>
          <LinearProgress
            variant='determinate'
            value={songProgress}
            color='primary'
            className='linear-progress'
          />
        </div>
        <IconButton
          onClick={() => {
            song.is_playing ? pauseSong() : playSong();
          }}
        >
          {song.is_playing ? (
            <PauseIcon color='primary' sx={{ fontSize: 60 }} />
          ) : (
            <PlayArrowIcon color='primary' sx={{ fontSize: 60 }} />
          )}
        </IconButton>
        <IconButton>
          <SkipNextIcon color='primary' sx={{ fontSize: 60 }} />
        </IconButton>
      </div>
    </div>
  );
};

export default MusicPlayer;
