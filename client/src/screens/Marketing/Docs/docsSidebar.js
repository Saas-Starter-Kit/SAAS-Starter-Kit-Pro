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
  console.log(edges);

  //const docsLinks = edges;

  console.log(_.groupby(edges, (edge) => edge.node.data.group.text));
  const groupedDocs = _.groupby(edges, (edge) => edge.node.data.group.text);

  let newObj = Object.entries(groupedDocs);
  //console.log(newObj);

  return (
    <Wrapper>
      {/*{docsLinks.map((docLink) => (
        <Link to={`/docs/${docLink.node.uid}`}>{docLink.node.data.title.text}</Link>
      ))}*/}
      {/*{groupedDocs.map((doc) => {
        console.log(doc);
      })}*/}
      {newObj.map((obj) => (
        <>
          <div>{obj[0]}</div>
          {obj[1].map((item) => (
            <div>{item.node.data.title.text} </div>
          ))}
        </>
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
