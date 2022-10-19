import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Genre from './Genre';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';
import Sidebar from '../../components/Sidebar';

const Genres = () => {
  const param = useParams();
  let emotion = param.emotion;

  sessionStorage.setItem('page', 2);
  let [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetch(`/api/emotions/${emotion}`);
        const data = await response.json();
        // console.log(data);
        setGenres(data.recommend_genres);
      } catch (e) {
        navigate('/');
      }
    };

    getGenres();
  }, [emotion]);

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

        {/* <ProgressBar></ProgressBar> */}
      </div>
    </>
  );
};

export default Genres;
