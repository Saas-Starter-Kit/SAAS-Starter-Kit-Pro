import AppLayout from '../AppLayout';
import { Router } from '@reach/router';
import Dashboard from '../../../screens/App/Dashboard';
import Settings from '../../../screens/App/Settings';
import Create from '../../../screens/App/Create';
import ReadUpdate from '../../../screens/App/ReadUpdate';
import { useRouter } from 'next/router';

const Routes = () => {
  const router = useRouter();

  //check token expires time on private routes
  const isTokenValid = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expiresIn'));
    return new Date().getTime() < expiresAt;
  };

  const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isTokenValid()) {
      router.push('/login');
      return null;
    } else {
      return <Component {...rest} />;
    }
  };

  return (
    <AppLayout>
      <Router>
        {/*<PrivateRoute path="/app" component={Dashboard}/>*/}
        <Dashboard path='/app' />
        <Settings path='/app/settings' />
        <Create path='/app/create' />
        <ReadUpdate path='/app/readupdate' />
      </Router>
    </AppLayout>
  );
};

export default Routes;
