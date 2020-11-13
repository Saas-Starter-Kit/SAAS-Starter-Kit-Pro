import AppLayout from '../AppLayout';
import { Router, Link } from '@reach/router';
import Login from '../../../screens/App/Auth';
import Dashboard from '../../../screens/App/Dashboard';
import Settings from '../../../screens/App/Settings';
import Create from '../../../screens/App/Create';
import ReadUpdate from '../../../screens/App/ReadUpdate';

const Routes = () => {
  return (
    <AppLayout>
      <Router>
        <Login path='/login' />
        <Dashboard path='/app/dashboard' />
        <Settings path='/app/settings' />
        <Create path='/app/create' />
        <ReadUpdate path='/app/readupdate' />
      </Router>
    </AppLayout>
  );
};

export default Routes;
