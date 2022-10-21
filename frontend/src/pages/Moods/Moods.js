import React from 'react';
import Greeting from './Greeting';
import Emotions from './Emotions';
import Sidebar from '../../components/Sidebar';

const Moods = () => {
  sessionStorage.setItem('page', 1); // set the page number

  return (
    <>
      <Sidebar />
      <div className='main-container'>
        <Greeting />
        <Emotions />
      </div>
    </>
  );
};

export default Moods;
