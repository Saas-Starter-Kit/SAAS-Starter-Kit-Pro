import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AuthContext from '../../../utils/authContext';

import LoadingOverlay from '../../../components/Common/loadingOverlay';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';
import ResetFormHeader from './resetFormHeader';
import ResetSuccess from './resetSuccessMessage';
import ApiContext from '../../../utils/apiContext';

const Wrapper = styled.div`
  background-color: ${colors.gray50};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
  padding-top: 0.5rem;
`;

const InputWrapper = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const Input = styled.input`
  ${fieldStyles}
`;

const ButtonWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: ${colors.white};
  text-align: left;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-weight: 500;
  width: 100%;
  color: ${colors.white};
  background-color: ${colors.indigo600};
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &:active {
    background-color: ${colors.indigo600};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const CardWrapper = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;

  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
    max-width: 28rem;
  }
`;

const Card = styled.div`
  background-color: ${colors.white};
  padding: 2rem 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.small}) {
    border-radius: 0.5rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
`;

const PasswordReset = () => {
  const { firebase, LogIn, LogOut } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchInit();

    let email = event.target.email.value;

    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .catch((err) => {
        fetchFailure(err);
      });

    setSuccess(true);
    fetchSuccess();
  };

  return (
    <Wrapper>
      {isLoading && <LoadingOverlay />}
      {!success ? (
        <div>
          <ResetFormHeader />
          <CardWrapper>
            <Card>
              <form onSubmit={handleSubmit}>
                <Label htmlFor="email">Email:</Label>
                <InputWrapper>
                  <Input type="email" name="email" id="email" />
                </InputWrapper>
                <ButtonWrapper>
                  <Button type="submit">Submit</Button>
                </ButtonWrapper>
              </form>
            </Card>
          </CardWrapper>
        </div>
      ) : (
        <ResetSuccess />
      )}
    </Wrapper>
  );
};

export default PasswordReset;
