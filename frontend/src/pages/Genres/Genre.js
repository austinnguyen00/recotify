import React from 'react';
import { Link } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';

const Genre = ({ genre }) => {
  const { setData } = useUserContext();

  const handleLinkClick = () => {
    setData((prevState) => ({
      ...prevState,
      genre: genre,
    }));
    sessionStorage.setItem('genre', genre);
  };

  return (
    <Link
      to={`/artists/${genre.toLowerCase()}`} // Location of redirect
      state={{ genre: genre }} // State prop contain data we want to pass
      onClick={handleLinkClick}
    >
      <div className='genre-wrapper'>
        <div className='genre-name'>
          <p>{genre}</p>
        </div>
        <div className='genre-color'></div>
      </div>
    </Link>
  );
};

export default Genre;
