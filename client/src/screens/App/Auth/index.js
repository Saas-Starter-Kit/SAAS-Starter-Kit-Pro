import LoginFormHeader from './loginFormHeader';
import AuthContext from '../../../utils/authContext';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { navigate } from '@reach/router';
import { sendtokenToServer } from '../../../api/authApi';
import LoadingOverlay from '../../../components/app/Common/loadingOverlay';

const LoginSignup = () => {
  const [isLoading, setLoading] = useState(false);
  const { firebase, LogIn, LogOut } = useContext(AuthContext);

  const router = useRouter();

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
      setTimeout(() => router.push('/app'), 400);
    };
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <LoginFormHeader />
      {isLoading ? <LoadingOverlay /> : null}
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
