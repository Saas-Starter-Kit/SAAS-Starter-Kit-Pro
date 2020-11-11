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
        <Dashboard path='/app' />
        <Login path='/app/login' />
        <Settings path='/app/settings' />
        <Create path='/app/create' />
        <ReadUpdate path='/app/readupdate' />
      </Router>
    </AppLayout>
  );
};

export default Routes;
