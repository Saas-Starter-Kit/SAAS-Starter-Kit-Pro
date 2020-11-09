import LoginForm from './loginForm';
import LoginFormHeader from './loginFormHeader';
import SocialBar from './socialBar';
import AuthContext from '../../../utils/authContext';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const LoginSignup = () => {
  const context = useContext(AuthContext);

  //useEffect(() => {
  //  context.firebase.auth().signOut();
  //  setTimeout(() => context.LogOut(), 200);
  //}, []);

  const uiConfig = {
    credentialHelper: 'none',
    signInFlow: 'popup',
    signInOptions: [
      context.firebase.auth.GoogleAuthProvider.PROVIDER_ID
      //context.firebaseApp.auth.GithubAuthProvider.PROVIDER_ID,
      //context.firebaseApp.auth.FacebookAuthProvider.PROVIDER_ID,
      //context.firebaseApp.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        saveProfile(authResult);
        return false;
      },
      signInFailure: function (error) {
        console.log(error);
      }
    }
  };

  const saveProfile = (authResult) => {
    console.log(authResult);
    //setLoading(true);

    context.firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => sendtokenToServer(token));

    const sendtokenToServer = (token) => {
      axios
        .post(`http://localhost:3001/auth/sendtoken`, { token })
        .then((res) => LogintoContext(res.data))
        .catch((err) => console.log(err));
    };

    const LogintoContext = (data) => {
      let email = authResult.user.email;
      let username = authResult.user.displayName;
      let id = jwt_decode(data.token);
      let photo = authResult.user.photoURL;

      let user = {
        email,
        username,
        id,
        photo
      };

      context.LogIn(user);
      //setTimeout(() => navigate('/app/profile'), 400);
    };
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      {/*<LoginFormHeader />*/}
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {/*<LoginForm />*/}
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={context.firebase.auth()} />
          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm leading-5'>
                <span className='px-2 bg-white text-gray-500'>Or continue with</span>
              </div>
            </div>
            <SocialBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
