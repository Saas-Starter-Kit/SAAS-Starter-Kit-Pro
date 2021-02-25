import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'antd';
import Testimonial from './testimonial';

const Wrapper = styled.div`
  padding-bottom: 3rem;
`;

const testimonials = [
  { title: 'Testimonial 1', name: 'Karel johnsoh', job: 'CEO, Company 1' },
  { title: 'Lorem Ipsep 2', name: 'Jenny Smith', job: 'CFO, Example Inc' },
  { title: 'Excellent Product', name: 'Racheal Aniston', job: 'CEO, Private LLC' }
];

const Testimonials = () => {
  return (
    <Wrapper>
      <Carousel autoplay>
        {testimonials.map((testimonial) => (
          <Testimonial
            testimonial={testimonial.title}
            name={testimonial.name}
            job={testimonial.job}
          />
        ))}
      </Carousel>
    </Wrapper>
  );
};

export default Testimonials;
