import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ErrorMessage, Formik } from 'formik';
import jwt_decode from 'jwt-decode';
import { SignupToServer, LoginToServer, LogintoContext } from '../../../api/authApi';
import { createCustomer } from '../../../api/stripeApi';
import AuthContext from '../../../utils/authContext';

import { ValidSchema, Authentication } from './helpers';

import useApi from '../../../hooks/useApi';

import LoadingOverlay from '../../../components/Admin/Common/loadingOverlay';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';
import SignUpFormHeader from './signupFormHeader';
import GoogleButton from 'react-google-button';
import errorNotification from '../../../components/Admin/Common/errorNotification';
import { FormProvider } from 'antd/lib/form/context';

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

const ErrorText = styled.div`
  color: red;
  font-size: 0.8em;
  margin-bottom: 0.5em;
  margin-top: -0.2rem;
`;

const StyledGoogleButton = styled(GoogleButton)`
  margin-top: 2rem;
`;

const StyledOrContinueWithText = styled.p`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin-top: 1rem;
`;

const StyledSpan = styled.span`
  background: #fff;
  padding: 0 0.7rem;
`;

const Signup = () => {
  const [isLoading, setLoading] = useState(false);
  const { firebase, LogIn, LogOut } = useContext(AuthContext);
  const [errMessage, setErrMessage] = useState('');
  const isLogin = false;

  //Save user information to our own db and and create stripe customer
  const Authentication2 = async (authRes, LogIn, isLogin, firebase, setErrMessage, setLoading) => {
    console.log(authRes);

    //Get Auth id token from Firebase
    let token = await firebase
      .auth()
      .currentUser.getIdToken()
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrMessage('Login Failed, please contact support');
        throw new Error('Firebase Token Not Found');
      });

    //server firebase authentication, returns jwt token
    let authServerRes;
    let username = authRes.user.displayName ? authRes.user.displayName : authRes.user.email;
    let email = authRes.user.email;

    authServerRes = await SignupToServer(email, username, token).catch((err) => {
      console.log(err);
      setLoading(false);
      setErrMessage('Server Signup Failed, please contact Support');
      throw new Error('Server Side Signup Fail');
    });

    let userId;
    //decode jwt token recieved from server
    if (jwt_decode(authServerRes.data.token)) {
      userId = jwt_decode(authServerRes.data.token).user;
    } else {
      setLoading(false);
      setErrMessage('Authentication Failed, please contact Support');
      throw new Error('JWT decode failed or JWT invalid');
    }

    //create stripe customer based on our own server user id
    let stripeServerRes = await createCustomer(userId, email).catch((err) => {
      console.log(err);
      setLoading(false);
      setErrMessage('Sign-Up Failed, Please Contact support');
      throw new Error('Stripe Signup Fail');
    });

    console.log(stripeServerRes);

    //save user data to React context
    LogintoContext(userId, authRes, stripeServerRes, LogIn);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    let email = values.email;
    let password = values.password;

    let authRes = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        //console.log(error);
        //setLoading(false);
        //setErrMessage(error.message);
        //throw new Error('Firebase Login Failed');
        setLoading(false);
        let errorType = 'Firebase Authentication Error';
        errorNotification(error.message, errorType);
      });

    Authentication(authRes, LogIn, isLogin, firebase, setErrMessage, setLoading);
  };

  //Google OAuth2 Signin
  const GoogleSignin = async () => {
    setLoading(true);
    let provider = new firebase.auth.GoogleAuthProvider();

    //wait for firebase to confirm signup
    let authRes = await firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrMessage(error.message);
        throw new Error('Firebase Login Failed');
      });

    Authentication(authRes, LogIn, isLogin, firebase, setErrMessage, setLoading);
  };

  return (
    <Wrapper>
      {isLoading && <LoadingOverlay />}
      <SignUpFormHeader />
      <CardWrapper>
        <Card>
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
                  <Button type="submit">SignUp</Button>
                </ButtonWrapper>
              </form>
            )}
          </Formik>

          <StyledOrContinueWithText>
            <StyledSpan>Or Continue With</StyledSpan>
          </StyledOrContinueWithText>

          <StyledGoogleButton
            style={{ width: '100%' }}
            label="Sign-Up with Google"
            onClick={GoogleSignin}
          />
        </Card>
      </CardWrapper>
    </Wrapper>
  );
};

export default Signup;
