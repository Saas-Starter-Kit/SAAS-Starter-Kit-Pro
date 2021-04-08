import React from 'react';
import { BaseCard } from '../../components/Blog/cards';

const Image = ({ slice }) => {
  const desktop = slice.primary.image.thumbnails.desktop;
  const mobile = slice.primary.image.thumbnails.mobile;

  return (
    <BaseCard>
      <picture>
        <source
          width="100%"
          srcSet={mobile.url}
          alt={mobile.alt || 'Dynamically fetched image'}
          media="(max-width: 678px)"
        />
        <img width="100%" src={desktop.url} alt={desktop.alt || 'Image'} />
      </picture>
    </BaseCard>
  );
};

export default Image;
