import { useState, useContext } from 'react';
import AuthContext from '../../../utils/authContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import LoadingOverlay from '../../../components/app/Common/loadingOverlay';

const Settings = () => {
  const { firebase, authState } = useContext(AuthContext);
  let userEmail = authState.user ? authState.user.email : 'Guest@guest.com';
  let displayName = authState.user ? authState.user.username : 'Guest';

  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState(userEmail);
  const [username, setUsername] = useState(displayName);
  const [resMessage, setResMessage] = useState('');

  const curUser = firebase.auth().currentUser;
  const id = authState.user ? authState.user.id.user : null;
  const isEmail = authState.user ? authState.user.provider === 'password' : null;

  const router = useRouter();

  const updateUsername = (event) => {
    event.preventDefault();
    setLoading(true);

    curUser
      .updateProfile({
        displayName: username
      })
      .then(() => {
        // Update successful.
        let data = { id, username };
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/put/username`, data);
        setTimeout(() => router.push('/login'), 500);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        setResMessage('An error occured please try again later');
        setLoading(false);
      });
  };

  const updateEmail = (event) => {
    event.preventDefault();
    setLoading(true);

    let data = { id, email };

    curUser
      .updateEmail(email)
      .then(() => {
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/put/email`, data);
        setTimeout(() => router.push('/login'), 500);
      })
      .catch(function (error) {
        console.log(error);
        setResMessage('An error occured please try again later');
        setLoading(false);
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <h1 className='text-2xl'>Settings</h1>
      <div className='bg-white w-full p-4 rounded-xl shadow md:w-3/4'>
        <p className='text-l font-bold'>{resMessage}</p>
        {!isEmail ? (
          <p className='text-l font-bold'>
            Email, password and username change is only available for email signups. If you signed
            up with third party providers such as Google or Facebook please follow their respective
            process for changing emails, usernames and passwords.
          </p>
        ) : null}
        {isLoading ? <LoadingOverlay /> : null}
        <div className='py-6'>
          <h2 className='text-xl'>Update Username</h2>
          <form>
            <label htmlFor='title' className='block text-sm font-medium leading-5 text-gray-700'>
              Username:
            </label>
            <input
              className='mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5'
              onChange={handleUsernameChange}
              value={username}
              type='text'
              disabled={isEmail ? false : true}
            />
            <button
              className='mt-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out'
              onClick={updateUsername}
              disabled={isEmail ? false : true}
            >
              Save
            </button>
          </form>
        </div>
        <div className='py-6'>
          <h2 className='text-xl'>Update Email</h2>
          <form>
            <label htmlFor='title' className='block text-sm font-medium leading-5 text-gray-700'>
              Email:
            </label>
            <input
              className='mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5'
              type='email'
              onChange={handleEmailChange}
              value={email}
              type='text'
              disabled={isEmail ? false : true}
            />
            <button
              className='mt-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out'
              onClick={updateEmail}
              disabled={isEmail ? false : true}
            >
              Save
            </button>
          </form>
        </div>

        <div className='my-8'>
          <h2 className='text-xl'>Update Password</h2>
          <p>Please Reset Password on Login Page</p>
          <button
            onClick={() => router.push('/login')}
            className='mt-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out'
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
