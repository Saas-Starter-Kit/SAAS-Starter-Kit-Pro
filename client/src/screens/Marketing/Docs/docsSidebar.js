import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import _ from 'lodash';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import Search from './algoliaSearch';
import { colors } from '../../../styles/theme';

const { SubMenu } = Menu;
const { Sider } = Layout;

const Container = styled.div`
  position: relative;
  width: 200px;
`;

const StyledLayout = styled(Layout)`
  background-color: ${colors.white};
  padding: 24px 0;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const StyledSider = styled(Sider)`
  width: 16rem;
`;

const StyledMenu = styled(Menu)`
  height: 100%;
`;

const StyledSubMenu = styled(SubMenu)`
  .ant-menu-sub {
    background-color: ${colors.alabaster};
  }
`;

const getKeys = (groupedDocsArr, location) => {
  const keys = [];
  groupedDocsArr.forEach((group) => {
    const nodes = group[1];
    nodes.forEach((node) => {
      if (location.pathname.includes(node.node.uid)) {
        keys.push(node.node.uid);
        keys.push(group[0]);
      }
    });
  });
  return keys;
};

const DocsSidebar = () => {
  const location = useLocation();
  const data = useStaticQuery(staticQuery);
  const { allPrismicDocs } = data;
  const { edges } = allPrismicDocs;

  const groupedDocs = _.groupby(edges, (edge) => edge.node.data.group.text);
  const groupedDocsArr = Object.entries(groupedDocs);
  const [selectedKey, openKey] = getKeys(groupedDocsArr, location);

  return (
    <Container>
      <StyledLayout>
        <StyledSider>
          <Search />
          <StyledMenu mode="inline" selectedKeys={[selectedKey]} defaultOpenKeys={[openKey]}>
            {groupedDocsArr.map((docGroup) =>
              docGroup[0] ? (
                <StyledSubMenu key={docGroup[0]} icon={<UserOutlined />} title={docGroup[0]}>
                  {docGroup[1].map(({ node }) => (
                    <Menu.Item key={node.uid}>
                      <Link to={`/docs/${node.uid}`}>{node.data.title.text}</Link>
                    </Menu.Item>
                  ))}
                </StyledSubMenu>
              ) : (
                docGroup[1].map(({ node }) => (
                  <Menu.Item key={node.uid}>
                    <Link to={`/docs/${node.uid}`}>{node.data.title.text}</Link>
                  </Menu.Item>
                ))
              )
            )}
          </StyledMenu>
        </StyledSider>
      </StyledLayout>
    </Container>
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
