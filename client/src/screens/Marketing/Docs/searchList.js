import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const Header = styled.h2`
  font-size: 16px;
  color: ${colors.gray600};
`;

const Paragraph = styled.p`
  font-size: 12px;
  color: ${colors.gray400};
`;

const SearchList = ({ hit }) => {
  const excerpt = hit.contentItems[0].substring(0, 20);
  console.log(hit);

  return (
    <React.Fragment>
      <Link to={`/docs/${hit.objectID}`}>
        <Header>{hit.title}</Header>
        <Paragraph>{excerpt}</Paragraph>
      </Link>
    </React.Fragment>
  );
};

export default SearchList;
