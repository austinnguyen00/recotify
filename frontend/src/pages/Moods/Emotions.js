import React, { useState, useEffect } from 'react';
import Emotion from './Emotion';
import useUserContext from '../../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';

const Emotions = () => {
  sessionStorage.setItem('page', 1);
  const { title, page, setPage, data, setData } = useUserContext();

  let [emotions, setEmotions] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const getEmotions = async () => {
      try {
        const response = await fetch('/api/emotions');
        const data = await response.json();
        // console.log(data);
        setEmotions(data);
      } catch (e) {
        navigate('/');
      }
    };

    getEmotions();
  }, []);

  return (
    <div className='body-container'>
      <div className='emotions-wrapper'>
        {emotions.map((emotion, index) => (
          <Emotion
            key={index}
            emotion_name={emotion.name}
            recommendation_genres={emotion.recommendation_genres}
            emotion_icon={emotion.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Emotions;
