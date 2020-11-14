import Stats from './stats';
import ActivityList from './activityList';

const Dashboard = () => {
  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
      <Stats />
      <ActivityList />
    </div>
  );
};

export default Dashboard;
