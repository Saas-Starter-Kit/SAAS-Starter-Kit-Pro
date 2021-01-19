import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: ${({ textColor }) => textColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
    color: ${({ hoverTextColor, textColor }) => hoverTextColor || textColor};
  }
  &:active {
    background-color: ${({ activeBackgroundColor }) => activeBackgroundColor};
  }
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
`;

const OriginalButton = ({
  onClick,
  children,
  disabled,
  backgroundColor,
  hoverBackgroundColor,
  hoverTextColor,
  activeBackgroundColor,
  textColor,
  className
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    className={className}
    backgroundColor={backgroundColor}
    hoverBackgroundColor={hoverBackgroundColor}
    hoverTextColor={hoverTextColor}
    activeBackgroundColor={activeBackgroundColor}
    textColor={textColor}
  >
    {children}
  </Button>
);

export default OriginalButton;
