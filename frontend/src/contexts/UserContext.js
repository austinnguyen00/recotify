import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const title = {
    0: 'Country',
    1: 'Moods',
    2: 'Genres',
    3: 'Artists',
    4: 'Tracks',
    5: 'Recommendations',
  };

  const [data, setData] = useState({
    emotion: '',
    genre: '',
    artist: '',
    tracks: '',
    country: '',
  });

  const [page, setPage] = useState(1);

  const key = {
    0: 'country_name',
    1: 'emotion',
    2: 'genre',
    3: 'artist_name',
    4: 'tracks_name',
    5: 'recommendation',
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
        setData,
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
