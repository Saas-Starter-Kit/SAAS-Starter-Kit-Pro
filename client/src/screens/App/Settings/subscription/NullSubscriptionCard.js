import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Card from '../../../../components/Common/Card';
import Button from '../../../../components/Common/buttons/PrimaryButton';

const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
`;

const NullSubscriptionCard = () => {
  return (
    <Card>
      <h2>No Subscription Found</h2>
      <h3>Click Below to add subscription</h3>
      <ButtonWrapper>
        <Link to="/purchase/plan">
          <Button>Submit</Button>
        </Link>
      </ButtonWrapper>
    </Card>
  );
};

export default NullSubscriptionCard;
