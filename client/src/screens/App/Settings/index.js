import { useState, useContext } from 'react';
import AuthContext from '../../../utils/authContext';

const Settings = () => {
  const { firebase, authState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const curUser = firebase.auth().currentUser;
  const id = authState.user ? authState.user.id.user : null;

  const updateEmail = () => {
    curUser
      .updateProfile({
        displayName: 'RRRR'
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <h2>Update Username</h2>
        <form>
          <input type='text' />
          <button onClick={updateEmail}>Save</button>
        </form>
      </div>
      <div>
        <h2>Update Email</h2>
        <form>
          <input type='text' />
          <button>Save</button>
        </form>
      </div>
      {console.log(authState, firebase)}
      <p>Reset Password on Login Page</p>
      {/*<Link to="login">*/}
    </div>
  );
};

export default Settings;
