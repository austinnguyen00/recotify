import React from 'react';
import { IconButton } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReactTooltip from 'react-tooltip';

const TrackButton = ({ playing, toggle }) => {
  return (
    <div className='track-button' onClick={toggle}>
      {toggle ? (
        <div>
          {playing ? (
            <IconButton data-tip='Pause'>
              <PauseIcon sx={{ fontSize: 50 }} />
            </IconButton>
          ) : (
            <IconButton data-tip='Play'>
              <PlayArrowIcon sx={{ fontSize: 50 }} />
            </IconButton>
          )}
        </div>
      ) : (
        <IconButton></IconButton>
      )}
    </div>
  );
};

export default TrackButton;
