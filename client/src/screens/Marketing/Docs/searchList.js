import React from 'react';
import { Link } from 'gatsby';

const SearchList = ({ hit }) => {
  //  const excerpt = hit._snippetResult.excerpt.value;
  console.log(hit);

  return (
    <div>
      ddddd
      {/*<Link to={`/${hit.path}`}>
        <div>
          <h2>{hit.title}</h2>
          <small>
            {hit.date} by {hit.author}
          </small>
          <h4>{hit.heading}</h4>
          <p> {excerpt}</p>
        </div>
      </Link>*/}
    </div>
  );
};

export default SearchList;
