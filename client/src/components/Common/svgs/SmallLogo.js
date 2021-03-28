import React from 'react';
import { colors } from '../../../styles/theme';

const SmallLogo = ({
  color1 = colors.electricViolet,
  color2 = colors.denim,
  overlapColor = colors.matisse,
  height = 24,
  width = 28,
  className
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="140 140 230 230"
    height={height}
    width={width}
    className={className}
    shapeRendering="geometricPrecision"
  >
    <title>Small Logo</title>
    <path fill={color1} d="M301.38 272.84l-16.21 9.37-74.57-43.05 16.23-9.37 28.41 16.42z" />
    <path
      fill={color1}
      d="M362.99 308.42L256 370.19l-44.64-25.77-89-51.38v-71.15l41.38 23.9 1.48.84-16.21 9.37-10.42-6.01v33.68l88.73 51.22L256 351.45l74.55-43.03-29.17-16.85 16.21-9.36zM389.64 219v71.11l-42.88-24.74 16.23-9.37 10.42 6.01v-33.67l-117.43-67.79-74.53 43.05 29.15 16.84-16.21 9.35-45.38-26.19 106.97-61.79z"
    />
    <path
      fill={color2}
      d="M285.17 282.21L256 299.05 181.45 256l29.15-16.84-16.21-9.37-29.17 16.84-16.21 9.37L256 317.77h.02l45.36-26.19-16.21-9.37zm76.04-27.23l-105.23-60.74-45.36 26.19-.02.02 16.23 9.35 29.15-16.84L330.55 256l-29.17 16.84 16.21 9.37 29.17-16.84 16.23-9.37-1.78-1.02z"
    />
    <path
      fill={overlapColor}
      d="M317.59 282.21l-16.21 9.36-16.21-9.36 16.21-9.37zM226.83 229.79l-16.23 9.37-16.21-9.37 16.21-9.35z"
    />
  </svg>
);

export default SmallLogo;
