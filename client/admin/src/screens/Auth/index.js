import { useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
// import { useRouter } from 'next/router';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import AuthContext from '../../utils/authContext';
import { sendtokenToServer } from '../../api/authApi';
import LoadingOverlay from '../../components/loadingOverlay';
import { colors, breakpoints } from '../../styles/theme';
import LoginFormHeader from './loginFormHeader';

const Wrapper = styled.div`
  background-color: ${colors.gray50};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -4rem;

  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
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

const LoginSignup = () => {
  const [isLoading, setLoading] = useState(false);
  const { firebase, LogIn, LogOut } = useContext(AuthContext);

  // const router = useRouter();

  useEffect(() => {
    setTimeout(() => LogOut(), 200);
  }, []);

  const uiConfig = {
    credentialHelper: 'none',
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        setLoading(true);
        saveProfile(authResult);
        return false;
      },
      signInFailure: function (error) {
        console.log(error);
      }
    }
  };

  const saveProfile = (authResult) => {
    let username = authResult.user.displayName;

    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => sendtokenToServer(token, username))
      .then((res) => LogintoContext(res.data))
      .catch((err) => console.log(err));

    const LogintoContext = (data) => {
      let email = authResult.user.email;
      let id = jwt_decode(data.token);
      let photo = authResult.user.photoURL;
      let provider = authResult.user.providerData[0].providerId;

      let user = {
        email,
        username,
        id,
        photo,
        provider
      };

      LogIn(user);
      setTimeout(() => navigate('/app'), 200);
      // setTimeout(() => router.push('/app'), 400);
    };
  };

  return (
    <Wrapper>
      <LoginFormHeader />
      {isLoading && <LoadingOverlay />}
      <CardWrapper>
        <Card>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          <hr />
        </Card>
      </CardWrapper>
    </Wrapper>
  );
};

export default LoginSignup;
