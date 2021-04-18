import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../../styles/theme';
import NavLink from './navLink';

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
      <NavLink link="/product/page1" text="Page1" />
      <NavLink link="/product/page2" text="Page2" />
      <NavLink link="/product/page3" text="Page3" />
      <NavLink link="/product/page4" text="Page4" />
    </Wrapper>
  );
};

export default ProductNav;
