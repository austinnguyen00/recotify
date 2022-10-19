import React from 'react';

const useGoBack = () => {
  const handleButton = () => {
    navigate(-1, { state: 'reset' });
    sessionStorage.setItem('page', sessionStorage.getItem('currentPage') - 1);
  };

  return handleButton;
};

export default useGoBack;
