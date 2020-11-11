import AppLayout from '../components/app/AppLayout';
import { Router, Link } from '@reach/router';

let Home = () => (
  <div>
    Home
    <nav>
      <Link to='/routes/sett'>Home</Link> | <Link to='/routes/dashboard'>Dashboard</Link>
    </nav>
  </div>
);
let Dash = () => <div>Dash</div>;
let Sett = () => <div>Sett</div>;

export default function LoginPage() {
  return (
    <AppLayout>
      <Router>
        <Home path='/routes' />
        <Dash path='/routes/dashboard' />
        <Sett path='/routes/sett' />
      </Router>
    </AppLayout>
  );
}
