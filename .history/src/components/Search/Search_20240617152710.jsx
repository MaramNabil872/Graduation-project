// Search.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './search.module.css'; // Import CSS module

const Search = ({ searchRoute = '/search/', placeholder = 'Search' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      history.push(`${searchRoute}${searchTerm}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={classes.container}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
        className={classes.input}
      />
      <button onClick={handleSearch} className={classes.button}>
        Search
      </button>
    </div>
  );
};

export default Search;
