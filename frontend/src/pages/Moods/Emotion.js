import React from 'react';
import { Link } from 'react-router-dom';
import Emoji from 'a11y-react-emoji';
import useUserContext from '../../hooks/useUserContext';

const Emotion = ({ emotion_name, emotion_icon }) => {
  let visited = sessionStorage.getItem('visited');

  const { data, setData, setPage } = useUserContext();

  const handleLinkClick = () => {
    setData((prevState) => ({
      ...prevState,
      emotion: emotion_name,
    }));
    sessionStorage.setItem('visited', true); // user has visited getstarted page
    sessionStorage.setItem('emotion', emotion_name);
  };

  return (
    <div
      className={[
        'emotion-wrapper',
        !visited ? 'emotion-first-visited' : null,
      ].join(' ')}
    >
      <Link
        to={`/genres/${emotion_name.toLowerCase()}`} // Location of redirect
        state={{ emotion: emotion_name }} // State prop contain data we want to pass
        onClick={handleLinkClick}
      >
        <Emoji
          symbol={emotion_icon}
          label='emoji'
          style={{ fontSize: '80px' }}
        />
        <p>{emotion_name}</p>
      </Link>
    </div>
  );
};

export default Emotion;
