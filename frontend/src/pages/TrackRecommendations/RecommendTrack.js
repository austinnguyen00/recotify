import React, { useState } from 'react';

import { PlayAudio } from '../../components/PlayAudio';

import TrackButton from '../../components/TrackButton';
import TrackCover from '../../components/TrackCover';
import TrackLink from '../../components/TrackLink';
import TrackInfo from '../../components/TrackInfo';

const RecommendTrack = ({ track }) => {
  const artists = Object.values(track.artists);
  const artists_name_arr = artists.map((artist) => artist.name);
  const artists_name = artists_name_arr.join(', ');

  var playing = null;
  var playingToggle = null;

  // Play preview audtio function
  if (track.preview_url) {
    [playing, playingToggle] = PlayAudio(track);
  }

  return (
    <div className='track-wrapper'>
      <div className='track-header'>
        <div></div>
        <TrackLink track_url={track.track_url} />
      </div>
      <TrackCover
        playing={playing}
        toggle={playingToggle}
        image={track.image}
      />
      <TrackButton playing={playing} toggle={playingToggle} />
      <TrackInfo track_name={track.name} track_artists_name={artists_name} />
    </div>
  );
};

export default RecommendTrack;
