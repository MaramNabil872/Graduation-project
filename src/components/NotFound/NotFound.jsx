import React from 'react';
import classes from './notFound.module.css';
import { Link } from 'react-router-dom';

export default function NotFound({ message = 'Nothing Found!', linkRoute = '/home', linkText = 'Go To Home Page', imageSrc }) {
  return (
    <div className={classes.container}>
      {/* Conditionally render the image if imageSrc is provided */}
      {imageSrc && <img src={imageSrc} alt="Empty Cart" />}
      <p>{message}</p>
      <Link to={linkRoute}>{linkText}</Link>
    </div>
  );
}
