import { useState, useContext } from 'react';
import AuthContext from '../../../utils/authContext';

const Settings = () => {
  const { firebase, authState } = useContext(AuthContext);
  const [email, setEmail] = useState(authState.user.email);
  const [username, setUsername] = useState(authState.user.username);
  const curUser = firebase.auth().currentUser;
  const id = authState.user ? authState.user.id.user : null;

  const updateUsername = (event) => {
    event.preventDefault();

    curUser
      .updateProfile({
        displayName: username
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const updateEmail = (event) => {
    event.preventDefault();

    curUser
      .updateEmail(email)
      .then((res) => {
        // Update successful.
        console.log('ffff');
      })
      .catch(function (error) {
        console.log(error);
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
      <h1>Settings</h1>
      <h3>Changing username and email will cause user to get logged out</h3>
      <div>
        <h2>Update Username</h2>
        <form>
          <label htmlFor='title' className='block text-sm font-medium leading-5 text-gray-700'>
            Username:
          </label>
          <input onChange={handleUsernameChange} value={username} type='text' />
          <button onClick={updateUsername}>Save</button>
        </form>
      </div>
      <div>
        <h2>Update Email</h2>
        <form>
          <label htmlFor='title' className='block text-sm font-medium leading-5 text-gray-700'>
            Username:
          </label>
          <input type='email' onChange={handleEmailChange} value={email} type='text' />
          <button onClick={updateEmail}>Save</button>
        </form>
      </div>
      {console.log(authState, firebase)}
      <p>Reset Password on Login Page</p>
      {/*<Link to="login">*/}
    </div>
  );
};

export default Settings;
