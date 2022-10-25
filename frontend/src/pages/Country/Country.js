import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import SearchBar from '../../components/SearchBar';
import CountryData from '../../assets/countries.json';
import useUserContext from '../../hooks/useUserContext';
import { Button } from '@mui/material';

const GetStarted = () => {
  const [alert, setAlert] = useState(false);
  sessionStorage.setItem('page', 0);

  const { data } = useUserContext();
  let navigate = useNavigate();

  const handleClick = () => {
    const countryName = document.getElementById('country-name').value;
    // console.log(countryName);
    // console.log(typeof countryName);

    const selectedCountry = CountryData.filter((value) => {
      return value.name === countryName;
    });
    if (selectedCountry.length > 0) {
      // console.log('selected country', selectedCountry);
      const countryName = selectedCountry[0].name;
      const countryCode = selectedCountry[0].code;
      // console.log(countryCode);
      sessionStorage.setItem('country_name', countryName);
      sessionStorage.setItem('country_code', countryCode);
      navigate('/moods');
    } else {
      setAlert(true);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className='main-container'>
        <Header title='Enter your Spotify country' />
        <SearchBar placeholder={'Enter a Country'} data={CountryData} />
        <div className='button-wrapper'>
          <Button onClick={handleClick}>
            <p>Submit</p>
          </Button>
        </div>
        <div>{alert ? <p>Please select a valid country</p> : ''}</div>
      </div>
    </div>
  );
};

export default GetStarted;
