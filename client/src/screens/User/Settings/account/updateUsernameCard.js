import React from 'react';
import styled from 'styled-components';

import Card from '../../../../components/Common/Card';
import Button from '../../../../components/Common/buttons/PrimaryButton';
import Label from '../../../../components/Common/forms/FieldLabel';
import Input from '../../../../components/Common/forms/TextInput';

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

const Form = styled.form`
  padding-bottom: 1.5rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const UpdateUsernameCard = ({ handleUsernameChange, isEmail, username, updateUsername }) => {
  return (
    <StyledCard>
      {!isEmail ? (
        <Paragraph>Username Changes Only Available for Email Signups</Paragraph>
      ) : (
        <Paragraph>Username Changes will reqire Sign-in</Paragraph>
      )}
      <SectionTitle>Update Username</SectionTitle>
      <Form>
        <Label htmlFor="title">Username:</Label>
        <Input
          onChange={handleUsernameChange}
          value={username}
          type="text"
          disabled={isEmail ? false : true}
        />
        <ButtonWrapper>
          <Button onClick={updateUsername} disabled={isEmail ? false : true}>
            Save
          </Button>
        </ButtonWrapper>
      </Form>
    </StyledCard>
  );
};

export default UpdateUsernameCard;
