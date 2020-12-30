import React from 'react';
import { BodyContent, CodeBlock, Image, Quote } from './slicesPrismic';

const SliceZone = ({ body }) => {
  console.log(body);
  const slice = body.map((slice) => {
    switch (slice.slice_type) {
      // These are the API IDs of the slices
      case 'content':
        return <BodyContent key={slice.id} slice={slice} />;
      case 'code':
        return <CodeBlock key={slice.id} slice={slice} />;
      case 'image':
        return <Image key={slice.id} slice={slice} />;
      case 'quote':
        return <Quote key={slice.id} slice={slice} />;
      default:
        return null;
    }
  });
  return <div>{slice}</div>;
};

export default SliceZone;
