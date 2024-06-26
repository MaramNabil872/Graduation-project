// Tags.jsx

import React from 'react';

export default function Tags({ tags }) {
  const tagItems = Array.isArray(tags) ? tags.map(tag => (
    <div key={tag} className="tag">{tag}</div>
  )) : null;

  return (
    <div className="tags">
      {tagItems}
    </div>
  );
}
