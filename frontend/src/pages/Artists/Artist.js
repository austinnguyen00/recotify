import React from 'react';
import { Link } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';

const Artist = ({ artist }) => {
  const { data, setData } = useUserContext();

  const handleLinkClick = () => {
    setData((prevState) => ({
      ...prevState,
      artist: artist.name,
    }));
    sessionStorage.setItem('artist', artist.id);
    sessionStorage.setItem('artist_name', artist.name);
  };

  const artist_id = artist.id;
  return (
    <div className='artist-wrapper'>
      <Link
        to={`/artist-top-tracks/${artist_id}`} // Location of redirect
        state={{ artist: artist }} // State prop contain data we want to pass
        onClick={handleLinkClick}
      >
        <img
          className='artist-cover-image'
          src={artist.image}
          alt='Artist Cover'
        ></img>
      </Link>
      <div className='artist-info-wrapper'>
        <p className='artist-name'>{artist.name}</p>
        <p>{artist.followers.toLocaleString()} followers</p>
      </div>
    </div>
  );
};

export default Artist;
