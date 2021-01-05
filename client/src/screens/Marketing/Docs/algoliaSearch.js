import React from 'react';
import { InstantSearch, connectHits } from 'react-instantsearch-dom';
import SearchList from './SearchList';
import { connectSearchBox } from 'react-instantsearch/connectors';
import { FcSearch } from 'react-icons/fc';
import searchClient from '../../../services/algolia';

const Results = connectSearchBox(({ currentRefinement }) => (currentRefinement ? <Hits /> : null));

const Hits = connectHits(({ hits }) => (
  <div>{hits && hits.map((hit) => <SearchList key={hit.id} hit={hit} />)}</div>
));

const SearchBox = ({ currentRefinement, refine }) => {
  return (
    <div>
      <form noValidate action="" role="search">
        <input
          type="search"
          placeholder="Search..."
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
      </form>
      <div>
        <FcSearch />
      </div>
    </div>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

const Search = () => {
  return (
    <InstantSearch indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME} searchClient={searchClient}>
      <CustomSearchBox />
      <Results />
    </InstantSearch>
  );
};

export default Search;
