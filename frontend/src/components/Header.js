import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import ProgressBar from './ProgressBar';

const Header = ({ title }) => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate(-1);
    sessionStorage.setItem('page', sessionStorage.getItem('currentPage') - 1);
  };

  useEffect(() => {
    window.addEventListener('pagehide', alertUser);
    return () => {
      window.removeEventListener('pagehide', alertUser);
    };
  }, []);
  const alertUser = (e) => {
    console.log('Page hide');
    e.preventDefault();
    e.returnValue = '';
  };

  return (
    <div className='header-wrapper'>
      <div className='header-button'>
        <IconButton onClick={handleButton}>
          <ArrowBackIcon sx={{ color: 'var(--primary-text)', fontSize: 28 }} />
        </IconButton>
        {/* <button onClick={() => navigate(-1)}>Go back</button> */}
      </div>
      <div className='header-title'>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Header;
