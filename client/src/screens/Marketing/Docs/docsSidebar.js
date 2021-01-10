import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Search from './algoliaSearch';
import _ from 'lodash';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DocsSidebar = () => {
  const data = useStaticQuery(staticQuery);
  const { allPrismicDocs } = data;
  const { edges } = allPrismicDocs;

  const groupedDocs = _.groupby(edges, (edge) => edge.node.data.group.text);
  const groupedDocsArr = Object.entries(groupedDocs);

  return (
    <Wrapper>
      {groupedDocsArr.map((docGroup) => (
        <div>
          <div>{docGroup[0]}</div>
          {docGroup[1].map((doc) => (
            <div>
              <Link to={`/docs/${doc.node.uid}`}>{doc.node.data.title.text}</Link>
            </div>
          ))}
        </div>
      ))}
      <Search />
    </Wrapper>
  );
};

export default DocsSidebar;

const staticQuery = graphql`
  query DocsAll {
    allPrismicDocs {
      edges {
        node {
          uid
          data {
            group {
              text
            }
            title {
              text
            }
          }
        }
      }
    }
  }
`;
