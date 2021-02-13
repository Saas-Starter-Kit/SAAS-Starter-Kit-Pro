import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { breakpoints } from '../../../styles/theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${breakpoints.small}) {
    display: block;
    margin-left: 2rem;
  }
`;

const ProductNav = () => {
  return (
    <Wrapper>
      <h1>Product</h1>
      <Link
        className="header_link_product"
        activeClassName="header_link_product_active"
        to="/product/page1"
      >
        Page1
      </Link>
      <Link
        className="header_link_product"
        activeClassName="header_link_product_active"
        to="/product/page2"
      >
        Page2
      </Link>
      <Link
        className="header_link_product"
        activeClassName="header_link_product_active"
        to="/product/page3"
      >
        Page3
      </Link>
    </Wrapper>
  );
};

export default ProductNav;
