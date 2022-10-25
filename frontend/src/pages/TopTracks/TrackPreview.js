import React, { useState } from 'react';

import { PlayAudio } from '../../components/PlayAudio';
import { SelectTrack } from './SelectTrack';

import TrackButton from '../../components/TrackButton';
import TrackCover from '../../components/TrackCover';
import TrackLink from '../../components/TrackLink';
import TrackCheckBox from './TrackCheckBox';
import TrackInfo from '../../components/TrackInfo';
import ReactTooltip from 'react-tooltip';

const TrackPreview = ({ track, selectedTracks, setSelectedTracks }) => {
  const artists = Object.values(track.artists);
  const artists_name = artists.map((artist) => artist.name).join(', ');

  // console.log(artists_name);

  var playing = null;
  var playingToggle = null;

  // Play preview audtio function
  if (track.preview_url) {
    [playing, playingToggle] = PlayAudio(track);
  }
  // console.log(playing);

  const [selected, selectedToggle] = SelectTrack(track);

  return (
    <div className='track-wrapper'>
      <div className='track-header'>
        <TrackCheckBox
          track={track}
          selected={selected}
          toggle={selectedToggle}
          selectedTracks={selectedTracks}
          setSelectedTracks={setSelectedTracks}
        />
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

export default TrackPreview;
