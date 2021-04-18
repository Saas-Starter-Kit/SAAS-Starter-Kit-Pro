import React from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import Card from '../../../../components/Common/Card';
import Button from '../../../../components/Common/buttons/PrimaryButton';

const StyledCard = styled(Card)`
  margin-bottom: 2rem;
`;

const Paragraph = styled.p`
  font-weight: 700;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  padding-top: 1.5rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

const UpdatePasswordCard = () => {
  const router = useRouter();
  return (
    <StyledCard>
      <SectionTitle>Update Password</SectionTitle>
      <Paragraph>Please Reset Password on Login Page</Paragraph>
      <ButtonWrapper>
        <Button
          onClick={() => {
            router.push('/auth/login');
          }}
        >
          Go to Login
        </Button>
      </ButtonWrapper>
    </StyledCard>
  );
};

export default UpdatePasswordCard;
