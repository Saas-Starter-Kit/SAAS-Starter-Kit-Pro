import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import moment from 'moment';
import SliceZone from './sliceZone';
import Disqus from '../services/disqus';

const Wrapper = styled.div`
  margin: 3rem 7rem;
`;

const Post = ({ data }) => {
  const author = data.prismicPost.data.author.text;
  const date = moment(data.prismicPost.data.date).format('MMM Do YY');
  const title = data.prismicPost.data.title.text;
  const hero_image = data.prismicPost.data.hero_image;
  const body = data.prismicPost.data.body;

  const pageUid = data.prismicPost.uid;
  const siteUrl = data.site.siteMetadata.siteUrl;

  const tags = data.prismicPost.tags;
  const related_article1 = data.prismicPost.data.related_article1;
  const related_article2 = data.prismicPost.data.related_article2;
  const related_articles = [related_article1, related_article2];

  return (
    <Wrapper>
      <h1>{title}</h1>
      <h2>{author}</h2>
      <h3>{date}</h3>
      <SliceZone body={body} />
      <Disqus url={`${siteUrl + '/' + pageUid}`} identifier={pageUid} title={title} />
    </Wrapper>
  );
};

export default Post;

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    prismicPost(uid: { eq: $uid }) {
      uid
      tags
      data {
        title {
          text
        }
        date
        author {
          text
        }
        hero_image {
          thumbnails {
            Table {
              alt
              url
            }
            desktop {
              alt
              url
            }
            mobile {
              alt
              url
            }
            thumbnail {
              alt
              url
            }
          }
        }
        related_article1 {
          document {
            ... on PrismicPost {
              id
              data {
                hero_image {
                  alt
                  url
                }
                title {
                  text
                }
                date
              }
            }
          }
          tags
        }
        related_article2 {
          document {
            ... on PrismicPost {
              id
              data {
                hero_image {
                  alt
                  url
                }
                title {
                  text
                }
                date
              }
            }
          }
          tags
        }
        body {
          ... on PrismicPostBodyCode {
            id
            slice_type
            primary {
              code {
                text
              }
            }
          }
          ... on PrismicPostBodyContent {
            id
            primary {
              content {
                html
              }
            }
            slice_type
          }
          ... on PrismicPostBodyQuote {
            id
            primary {
              quote {
                text
              }
            }
            slice_type
          }
          ... on PrismicPostBodyFullwidthimage {
            id
            primary {
              image {
                thumbnails {
                  desktop {
                    url
                    alt
                  }
                  mobile {
                    alt
                    url
                  }
                }
              }
            }
            slice_type
          }
        }
      }
    }
  }
`;
