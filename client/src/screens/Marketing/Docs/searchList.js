import React from 'react';
import { Link } from 'gatsby';

const SearchList = ({ hit }) => {
  const excerpt = hit.contentItems[0].substring(0, 20);
  console.log(hit);

  return (
    <div>
      <Link to={`/docs/${hit.objectID}`}>
        <div>
          <h2>{hit.title}</h2>
          <p> {excerpt}</p>
        </div>
      </Link>
    </div>
  );
};

export default SearchList;
