import React, { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';
import { Formik } from 'formik';
import { Link } from 'gatsby';
import AuthContext from '../../../utils/authContext';
import { ValidSchema, saveToDb } from './helpers';

import LoadingOverlay from '../../../components/Admin/Common/loadingOverlay';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';
import LoginFormHeader from './loginFormHeader';
import GoogleButton from 'react-google-button';

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

const ForgotPasswordWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const ForgotPassword = styled.div`
  text-decoration: underline;
  color: blue;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
`;

const RememberMeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RememberMeLabel = styled.label`
  margin-left: 0.1rem;
  font-size: 0.925rem;
  color: ${colors.coolGray900};
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.8em;
  margin-bottom: 0.5em;
  margin-top: -0.2rem;
`;

const ErrorResponse = styled.div`
  font-size: 0.9rem;
  color: red;
  font-weight: 100;
  margin-bottom: 1rem;
`;

const StyledGoogleButton = styled(GoogleButton)`
  margin-top: 2rem;
`;

const StyledOrContinueWithText = styled.p`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin-top: 2rem;
`;

const StyledSpan = styled.span`
  background: #fff;
  padding: 0 0.7rem;
`;

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const { firebase, LogIn, LogOut } = useContext(AuthContext);
  const [resMessage, setResMessage] = useState('');

  const handleSubmit = (values) => {
    setLoading(true);

    let email = values.email;
    let password = values.password;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((authRes) => saveToDb(authRes, LogIn, true, firebase, setResMessage, setLoading))
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setResMessage(error.message);
      });
  };

  //Google OAuth2 Signin
  const GoogleSignin = () => {
    setLoading(true);
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((authRes) => saveToDb(authRes, LogIn, true, firebase, setResMessage, setLoading))
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setResMessage(error.message);
      });
  };

  return (
    <Wrapper>
      {isLoading && <LoadingOverlay />}
      <LoginFormHeader />
      <CardWrapper>
        <Card>
          <ErrorResponse>{resMessage}</ErrorResponse>
          <Formik
            validationSchema={ValidSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit}>
                <Label htmlFor="email">Email:</Label>
                <InputWrapper>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </InputWrapper>
                {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}
                <Label htmlFor="password">Password:</Label>
                <InputWrapper>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </InputWrapper>
                {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}
                <ButtonWrapper>
                  <Button type="submit">Signin</Button>
                </ButtonWrapper>
              </form>
            )}
          </Formik>
          <ForgotPasswordWrapper>
            <RememberMeWrapper>
              <input id="remember_me" name="remember_me" type="checkbox" />
              <RememberMeLabel htmlFor="remember_me">Remember me</RememberMeLabel>
            </RememberMeWrapper>

            <ForgotPassword>
              <Link to="/passwordreset"> Forgot your password?</Link>
            </ForgotPassword>
          </ForgotPasswordWrapper>

          <StyledOrContinueWithText>
            <StyledSpan>Or Continue With</StyledSpan>
          </StyledOrContinueWithText>

          <StyledGoogleButton
            style={{ width: '100%' }}
            label="Login with Google"
            onClick={GoogleSignin}
          />
        </Card>
      </CardWrapper>
    </Wrapper>
  );
};

export default Login;
