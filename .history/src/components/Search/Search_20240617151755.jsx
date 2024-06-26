import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import classes from './search.module.css';

export default function Search({
  searchRoute = '/search/',
  defaultRoute = '/',
  margin,
  placeholder = 'Search DishDash!',
}) {// Search.js
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import classes from './search.module.css'; // Import the CSS module

export default function Search({
  searchRoute = '/search/',
  defaultRoute = '/',
  margin,
  placeholder = 'Search DishDash!',
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();
  const { searchTerm: paramSearchTerm } = useParams();

  useEffect(() => {
    setSearchTerm(paramSearchTerm ?? '');
  }, [paramSearchTerm]);

  const handleSearch = () => {
    searchTerm ? navigateToSearchRoute() : navigateToDefaultRoute();
  };

  const navigateToSearchRoute = () => {
    history.push(`${searchRoute}${searchTerm}`);
  };

  const navigateToDefaultRoute = () => {
    history.push(defaultRoute);
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
    <div className={classes.container} style={{ margin }}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();
  const { searchTerm: paramSearchTerm } = useParams();

  useEffect(() => {
    setSearchTerm(paramSearchTerm ?? '');
  }, [paramSearchTerm]);

  const handleSearch = () => {
    searchTerm ? navigateToSearchRoute() : navigateToDefaultRoute();
  };

  const navigateToSearchRoute = () => {
    history.push(`${searchRoute}${searchTerm}`);
  };

  const navigateToDefaultRoute = () => {
    history.push(defaultRoute);
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
    <div className={classes.container} style={{ margin }}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
