import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Genre from './Genre';
import { Button } from '@mui/material';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';
import Sidebar from '../../components/Sidebar';

const Genres = () => {
  const param = useParams();
  let emotion = param.emotion;

  sessionStorage.setItem('page', 2);
  const [genres, setGenres] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetch(`/api/emotions/${emotion}`);
        const data = await response.json();
        setGenres(data.recommend_genres);
      } catch (e) {
        navigate('/');
      }
    };
    getGenres();
  }, [emotion]);

  const getGenres = async () => {
    try {
      const response = await fetch(`/api/genres`);
      // console.log('response:', response);
      const data = await response.json();
      const genres = data.map((genre) => genre.name);
      // console.log(genres);
      setGenres(genres);
      setShowButton(false);
    } catch (e) {
      navigate('/');
    }
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className='main-container'>
        <Header title='Select Genre' />

        <div className='body-container'>
          <div className='genres-wrapper'>
            {genres.map((genre, index) => (
              <Genre key={index} genre={genre} />
            ))}
          </div>
        </div>
        {showButton ? (
          <div className='genres-button'>
            <Button onClick={getGenres} variant='contained'>
              <p>Browse All</p>
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Genres;
