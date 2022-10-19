import React from 'react';

import { IconButton } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const TrackLink = ({ track_url }) => {
  return (
    <>
      <a
        className='track-link'
        href={track_url}
        target='_blank'
        rel='noreferrer'
      >
        <IconButton>
          <LaunchIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </a>
    </>
  );
};

export default TrackLink;
