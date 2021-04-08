import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Drawer } from 'antd';

import SEO from '../components/Layout/seo';
import { breakpoints } from '../styles/theme';
import Menu from '../components/svgs/BurgerIcon';

import SliceZone from './sliceZone';
import DocsSidebar from '../screens/docsSidebar';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Sidebar = styled.div`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: block;
    width: 200px;
  }
`;

const DocsHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const MobileSideBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 2rem;
  @media (min-width: ${breakpoints.medium}) {
    width: calc(100% - 200px);
  }
`;

const Docs = ({ data }) => {
  const title = data.prismicDocs.data.title.text;
  const body = data.prismicDocs.data.body;

  const [showMobileMenu, toggleShowMobileMenu] = useState(false);

  const mobileMenuHandler = () =>
    showMobileMenu ? toggleShowMobileMenu(false) : toggleShowMobileMenu(true);

  const seoData = {
    title: 'Saas Starter Kit Pro Documentation',
    description: 'Saas Starter Kit Pro Documentation'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        <Drawer
          placement="left"
          onClose={() => toggleShowMobileMenu(false)}
          visible={showMobileMenu}
        >
          <MobileSideBar>
            {showMobileMenu && <DocsSidebar mobileMenuHandler={mobileMenuHandler} />}
          </MobileSideBar>
        </Drawer>
        <Sidebar>
          <DocsSidebar />
        </Sidebar>
        <Content>
          <DocsHeader>
            <Menu onClick={mobileMenuHandler} />
          </DocsHeader>
          <h1>{title}</h1>
          <div>
            <SliceZone body={body} />
          </div>
        </Content>
      </Wrapper>
    </React.Fragment>
  );
};

export default Docs;

export const pageQuery = graphql`
  query DocsBySlug($uid: String!) {
    prismicDocs(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        body {
          ... on PrismicDocsBodyCode {
            id
            slice_type
            primary {
              code {
                text
              }
            }
          }
          ... on PrismicDocsBodyContent {
            id
            slice_type
            primary {
              content {
                html
              }
            }
          }
          ... on PrismicDocsBodyQuote {
            id
            slice_type
            primary {
              quote {
                text
              }
            }
          }
          ... on PrismicDocsBodyWarningblock {
            id
            slice_type
            primary {
              warningblock {
                text
              }
            }
          }
        }
      }
    }
  }
`;
