import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: 2rem;
`;

const ProductNav = () => {
  return (
    <Wrapper>
      <h1>Product</h1>
      <Link
        className="header_link_settings"
        activeClassName="header_link_settings_active"
        to="/product/page1"
      >
        Page1
      </Link>
      <Link
        className="header_link_settings"
        activeClassName="header_link_settings_active"
        to="/product/page2"
      >
        Page2
      </Link>
      <Link
        className="header_link_settings"
        activeClassName="header_link_settings_active"
        to="/product/page3"
      >
        Page3
      </Link>
    </Wrapper>
  );
};

export default ProductNav;
