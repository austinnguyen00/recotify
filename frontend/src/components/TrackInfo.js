import React from 'react';

const TrackInfo = ({ track_name, track_artists_name }) => {
  return (
    <div className='track-info-wrapper'>
      <p className='track-name'>{track_name}</p>
      <p className='track-artists'>{track_artists_name}</p>
    </div>
  );
};

export default TrackInfo;
