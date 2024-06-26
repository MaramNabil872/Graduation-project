import React from 'react';
import { Link } from 'react-router-dom';
import classes from './tags.module.css';

export default function Tags({ tags, forFoodPage }) {
  // Ensure that tags is always an array before calling map
  const tagItems = Array.isArray(tags)
    ? tags.map(tag => (
        <Link key={tag.name} to={`/tag/${tag.name}`}>
          {tag.name}
          {!forFoodPage && `(${tag.count})`}
        </Link>
      ))
    : null;

  return (
    <div
      className={classes.container}
      style={{
        justifyContent: forFoodPage ? 'start' : 'center',
      }}
    >
      {tagItems}
    </div>
  );
}
