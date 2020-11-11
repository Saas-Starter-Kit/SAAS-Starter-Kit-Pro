import AppLayout from '../AppLayout';
import { Router, Link } from '@reach/router';

let Home = () => (
  <div>
    Home
    <nav>
      <Link to='/app/sett'>Home</Link> | <Link to='/app/dashboard'>Dashboard</Link>
    </nav>
  </div>
);
let Dash = () => <div>Dash</div>;
let Sett = () => <div>Sett</div>;

const Routes = () => {
  return (
    <AppLayout>
      <Router>
        <Home path='/app' />
        <Dash path='/app/dashboard' />
        <Sett path='/app/sett' />
      </Router>
    </AppLayout>
  );
};

export default Routes;
