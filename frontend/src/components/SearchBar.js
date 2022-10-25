import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);

    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered('');
  };

  const handleClick = (e) => {
    const clickedWord = e.target.innerHTML;
    // console.log('click word:', clickedWord);

    // Get the country code from country name
    const country = data.filter((value) => {
      return value.name === clickedWord;
    });
    // console.log(country);

    setWordEntered(country[0].name);
    setFilteredData([]);

    // Set the country code in the sessionStorage
    // sessionStorage.setItem('countryCode', countryCode);
  };

  return (
    <div className='searchbar-wrapper'>
      <div className='searchbar-input'>
        <input
          id='country-name'
          type='text'
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        ></input>
        <div className='searchbar-icon'>
          {(filteredData.length === 0) & (wordEntered === '') ? (
            <SearchIcon />
          ) : (
            <CloseIcon className='clear-button' onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length > 0 && (
        <div className='data-items'>
          {filteredData.slice(0, 10).map((value, key) => {
            return (
              <div className='data-item' onClick={handleClick}>
                {value.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
