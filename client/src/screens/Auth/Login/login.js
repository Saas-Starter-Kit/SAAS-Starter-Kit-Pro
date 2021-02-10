import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { LoginAuth } from '../helpers';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';

import ErrorText from '../../../components/Common/errorText';
import InputWrapper from '../../../components/Common/forms/TextInputWrapper';
import Button from '../../../components/Auth/Buttons/authButton';
import Label from '../../../components/Auth/authFormLabel';
import Input from '../../../components/Common/forms/TextInput';
import ContinueWith from '../../../components/Auth/continueWith';
import GoogleButton from '../../../components/Auth/Buttons/googleButton';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import LoginFormHeader from './loginFormHeader';
import AuthCard from '../../../components/Auth/authCard';

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

const Login = () => {
  const location = useLocation();
  const { firebase, LogIn, LogOut } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [appId, setAppId] = useState();
  const [isInviteFlow, setInviteFlow] = useState();
  const [isPaymentFlow, setPaymentFlow] = useState();

  //extract data from query params
  useEffect(() => {
    if (location.search) {
      const queryParams = location.search.split('=');
      setAppId(queryParams[1].split('&')[0]);
      setInviteFlow(queryParams[2]);
    }
  }, [location]);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);

  useEffect(() => {
    if (location.state) setPaymentFlow(location.state.isPaymentFlow);
  }, [location]);

  const handleSubmit = async (values) => {
    fetchInit();
    let email = values.email;
    let password = values.password;

    let authRes = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        fetchFailure(error);
      });

    LoginAuth(authRes, LogIn, firebase, fetchFailure, isPaymentFlow, isInviteFlow, appId);
  };

  //Google OAuth2 Signin
  const GoogleSignin = async () => {
    fetchInit();
    let provider = new firebase.auth.GoogleAuthProvider();

    let authRes = await firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        fetchFailure(error);
      });

    LoginAuth(authRes, LogIn, firebase, fetchFailure, isPaymentFlow, isInviteFlow, appId);
  };

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <LoginFormHeader />

      <AuthCard>
        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
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

              <Button type="submit">Signin</Button>
            </form>
          )}
        </Formik>
        <ForgotPasswordWrapper>
          <RememberMeWrapper>
            <input id="remember_me" name="remember_me" type="checkbox" />
            <RememberMeLabel htmlFor="remember_me">Remember me</RememberMeLabel>
          </RememberMeWrapper>

          <ForgotPassword>
            <Link to="/auth/passwordreset"> Forgot your password?</Link>
          </ForgotPassword>
        </ForgotPasswordWrapper>

        <ContinueWith />
        <GoogleButton GoogleSignin={GoogleSignin} />
      </AuthCard>
    </div>
  );
};

export default Login;
