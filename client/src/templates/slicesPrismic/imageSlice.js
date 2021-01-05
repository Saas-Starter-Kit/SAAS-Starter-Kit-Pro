import React from 'react';
import styled from 'styled-components';
//import Img from 'gatsby-image';

const Image = ({ slice }) => {
  const desktop = slice.primary.image.thumbnails.desktop;
  const mobile = slice.primary.image.thumbnails.mobile;

  return (
    <picture>
      <source width="100%" srcSet={mobile.url} alt={mobile.alt} media="(max-width: 678px)" />
      <img width="100%" src={desktop.url} alt={desktop.alt} />
    </picture>
  );
};

export default Image;
