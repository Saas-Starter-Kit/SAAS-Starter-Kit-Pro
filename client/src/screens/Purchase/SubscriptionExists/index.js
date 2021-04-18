import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import { useRouter } from 'next/router';

import ConfirmButton from '../../../components/Purchase/purchaseButton';

const Wrapper = styled.div`
  background-color: ${colors.coolGray50};
  height: 100vh;
  padding-top: 2rem;
`;

const SubscriptionExistsCard = styled.div`
  text-align: center;
  background-color: white;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 28rem;
`;

const Title = styled.h2`
  padding-right: 2rem;
  padding-left: 2rem;
  margin-top: 1.5rem;
  color: green;
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;
`;

const Text = styled.h2`
  padding-right: 2rem;
  padding-left: 2rem;
  margin-top: 1.5rem;
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
`;

const SubscriptionExists = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <SubscriptionExistsCard>
        <Title>Our Records indicate you already have an active subscription with us</Title>
        <Text>
          If you would like to upgrade an existing plan, please visit your subscription settings
          page by clicking the link below.
        </Text>
        <ConfirmButton onClick={() => router.push('/user/settings/subscription')}>
          Click Here
        </ConfirmButton>
        <Text>If you think you are getting this message in error, please contact support</Text>
      </SubscriptionExistsCard>
    </Wrapper>
  );
};

export default SubscriptionExists;
