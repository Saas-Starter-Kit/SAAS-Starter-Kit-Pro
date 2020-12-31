import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;
//just use graphql nad make welcome page
const Docs = () => {
  return (
    <Wrapper>
      <div>Sidebar</div>
      <div>Docs</div>
    </Wrapper>
  );
};

export default Docs;
