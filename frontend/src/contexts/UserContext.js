import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const title = {
    0: 'Moods',
    1: 'Genres',
    2: 'Artists',
    3: 'Tracks',
    4: 'Recommendations',
  };

  const data = {
    emotion: '',
    genre: '',
    artist: '',
    tracks: '',
    countryCode: '',
  };

  const [page, setPage] = useState(1);

  const key = {
    0: 'emotion',
    1: 'genre',
    2: 'artist_name',
    3: 'tracks_name',
    4: 'recommendation',
  };

  const [trackPlaying, setTrackPlaying] = useState({
    track: {}, // current playing track object
    old_track: {}, // previous playing track object
    is_playing: false,
    audio: null, // audio of current track
    toggle: null,
    playing: null,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <UserContext.Provider
      value={{
        title,
        page,
        setPage,
        data,
        // setData,
        key,
        trackPlaying,
        setTrackPlaying,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
