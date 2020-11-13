import AppLayout from '../AppLayout';
import { Router } from '@reach/router';
import Dashboard from '../../../screens/App/Dashboard';
import Settings from '../../../screens/App/Settings';
import Create from '../../../screens/App/Create';
import ReadUpdate from '../../../screens/App/ReadUpdate';

const Routes = () => {
  return (
    <AppLayout>
      <Router>
        <Dashboard path='/app' />
        <Settings path='/app/settings' />
        <Create path='/app/create' />
        <ReadUpdate path='/app/readupdate' />
      </Router>
    </AppLayout>
  );
};

export default Routes;
