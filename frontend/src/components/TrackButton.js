import React from 'react';
import { IconButton } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const TrackButton = ({ playing, toggle }) => {
  return (
    <div className='track-button'>
      {toggle ? (
        <IconButton onClick={toggle}>
          {playing ? (
            <PauseIcon sx={{ fontSize: 50 }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: 50 }} />
          )}
        </IconButton>
      ) : (
        ''
      )}
    </div>
  );
};

export default TrackButton;
