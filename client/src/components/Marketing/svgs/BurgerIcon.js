import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../../styles/theme';

const Wrapper = styled.div`
  @media (min-width: ${breakpoints.large}) {
    display: none;
  }

  border: 0;
  background: transparent;
  width: 44px;
  height: 30px;
  cursor: pointer;
  padding: 1px 6px;

  > span {
    display: block;
    width: 100%;
    height: 2px;
    margin: 4px 0;
    float: right;
    background-color: #eb4d4b;
    transition: all 0.3s ease;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      width: calc(100% - 10px);
      margin-bottom: 0;
    }
  }
  &:focus,
  &:hover {
    outline: none;
    > span {
      &:last-child {
        width: 100%;
      }
    }
  }

  &:focus,
  &.active {
    > span {
      &:first-child {
        transform: rotate(45deg);
        transform-origin: 8px 50%;
      }
      &:nth-child(2) {
        display: none;
      }
      &:last-child {
        width: 100%;
        transform: rotate(-45deg);
        transform-origin: 9px 50%;
      }
    }
  }
`;

const BurgerIcon = ({ onClick }) => (
  <Wrapper onClick={onClick}>
    <span />
    <span />
    <span />
  </Wrapper>
);

export default BurgerIcon;
