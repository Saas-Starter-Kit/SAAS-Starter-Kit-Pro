import AppLayout from '../AppLayout';
import { Router, Link } from '@reach/router';
import Login from '../../../screens/App/Auth';
import Dashboard from '../../../screens/App/Dashboard';
import Settings from '../../../screens/App/Settings';

let Home = () => (
  <div>
    Home
    <nav>
      <Link to='/app/sett'>Home</Link> | <Link to='/app/dashboard'>Dashboard</Link>
    </nav>
  </div>
);

const Routes = () => {
  return (
    <AppLayout>
      <Router>
        <Dashboard path='/app' />
        <Login path='/app/login' />
        <Settings path='/app/settings' />
      </Router>
    </AppLayout>
  );
};

export default Routes;
