import React from 'react';
import styled from 'styled-components';
import { BodyContent, CodeBlock, Image, Quote, WarningBlock } from './slicesPrismic';

const Wrapper = styled.div``;

const BottomSpace = styled.div`
  opacity: 0;
  margin-bottom: 2rem;
`;

const SliceZone = ({ body }) => {
  console.log(body);
  const slice = body.map((slice) => {
    switch (slice.slice_type) {
      // These are the API IDs of the slices
      case 'content':
        return <BodyContent key={slice.id} slice={slice} />;
      case 'code':
        return <CodeBlock key={slice.id} slice={slice} />;
      case 'fullwidthimage':
        return <Image key={slice.id} slice={slice} />;
      case 'quote':
        return <Quote key={slice.id} slice={slice} />;
      case 'warningblock':
        return <WarningBlock key={slice.id} slice={slice} />;
      default:
        return null;
    }
  });
  return (
    <div>
      <Wrapper>{slice}</Wrapper>
      <BottomSpace>Invisible Text</BottomSpace>
    </div>
  );
};

export default SliceZone;
