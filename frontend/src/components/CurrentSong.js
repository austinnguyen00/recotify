import React, { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';

const CurrentSong = () => {
  let [song, setSong] = useState([]);

  useEffect(() => {
    const getSong = async () => {
      let response = await fetch('/spotify/current-song');
      let data = await response.json();
      // console.log('Data:', data);
      setSong(data);
    };

    getSong();
  });

  return (
    <div>
      <h1>Current Song</h1>
      <MusicPlayer song={song} />
    </div>
  );
};

export default CurrentSong;
