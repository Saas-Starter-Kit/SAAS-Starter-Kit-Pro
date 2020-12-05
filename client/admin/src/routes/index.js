import { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
// import { useRouter } from 'next/router';
import Login from '../screens/Auth';
import Dashboard from '../screens/Dashboard';
import Settings from '../screens/Settings';
import Create from '../screens/Create';
import ReadUpdate from '../screens/ReadUpdate';
import AuthContext from '../utils/authContext';

const Routes = () => {
  const { LogIn, LogOut } = useContext(AuthContext);

  // const router = useRouter();

  const silentAuth = () => {
    let user, expiresAt;

    user = JSON.parse(localStorage.getItem('user'));
    expiresAt = JSON.parse(localStorage.getItem('expiresIn'));

    console.log(user);
    if (user && new Date().getTime() < expiresAt) {
      LogIn();
      console.log('fffff');
    } else if (!user || new Date().getTime() > expiresAt) {
      LogOut();
      console.log('rrrrr');
    }
  };

  useEffect(() => {
    if (!typeof window === 'undefined') {
      setTimeout(() => silentAuth(), 300);
    }
  }, []);

  //check token expires time on private routes
  const isTokenValid = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expiresIn'));
    return new Date().getTime() < expiresAt;
  };

  // const PrivateRoute = ({ component: Component, location, ...rest }) => {
  //   if (!isTokenValid()) {
  //     router.push('/login');
  //     return null;
  //   } else {
  //     return <Component {...rest} />;
  //   }
  // };

  return (
    <Router>
      {/*<PrivateRoute path='/app' component={Dashboard} />*/}
      <Login path='/login' />
      <Dashboard path='/app' />
      <Settings path='/app/settings' />
      <Create path='/app/create' />
      <ReadUpdate path='/app/readupdate' />
    </Router>
  );
};

export default Routes;
