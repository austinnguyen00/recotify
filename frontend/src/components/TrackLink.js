import React from 'react';
import ReactTooltip from 'react-tooltip';

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
        <IconButton data-tip='Open in Spotify'>
          <LaunchIcon sx={{ fontSize: 24 }} />
          <ReactTooltip delayShow={800} />
        </IconButton>
      </a>
    </>
  );
};

export default TrackLink;
