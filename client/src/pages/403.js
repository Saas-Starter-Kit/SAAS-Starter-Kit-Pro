import React from 'react';
import Layout from '../components/Marketing/Layout';

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <h2>Access Denied</h2>
      <div>You do not have permission to view this page</div>
    </React.Fragment>
  );
};

NotFoundPage.Layout = Layout;

export default NotFoundPage;
