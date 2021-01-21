import React from 'react';
import { Link } from 'gatsby';

const SubscriptionExists = () => {
  return (
    <div>
      <p>Our Records indicate you already have an active subscription with us</p>
      <p>
        If you would like to upgrade an existing plan, please visit your subscription settings page
        by clicking the link below.
      </p>
      <Link to="/user/settings/subscription">Go to Settings</Link>
      <p>If you think you are getting this message in error, please contact support</p>
    </div>
  );
};

export default SubscriptionExists;
