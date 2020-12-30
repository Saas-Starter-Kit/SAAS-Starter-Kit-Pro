import React from 'react';
import { BodyText, CodeBlock, Image, Quote } from '../slices';

const SliceZone = (props) => {
  console.log(props);
  //  const slice = allSlices.map((s) => {
  //    switch (s.slice_type) {
  //      // These are the API IDs of the slices
  //      case 'text':
  //        return <BodyText key={s.id} input={s} />;
  //      case 'code_block':
  //        return <CodeBlock key={s.id} input={s} />;
  //      case 'image':
  //        return <Image key={s.id} input={s} />;
  //      case 'quote':
  //        return <Quote key={s.id} input={s} />;
  //      default:
  //        return null;
  //    }
  //  });
  //  return <div>{slice}</div>;

  return <div>Slice</div>;
};

export default SliceZone;
