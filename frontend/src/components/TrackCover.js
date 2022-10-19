import React from 'react';

const TrackCover = ({ playing, toggle, image }) => {
  return (
    <div
      className={[
        'track-cover-wrapper',
        toggle ? 'track-cover-wrapper-available' : '',
        playing ? 'track-cover-wrapper-active' : '',
      ].join(' ')} // adding active class while playing preview using join array elements
      onClick={toggle}
    >
      <img className='track-cover-image' src={image} alt='Track Cover'></img>
      <div className='track-cover-inner'></div>
    </div>
  );
};

export default TrackCover;
