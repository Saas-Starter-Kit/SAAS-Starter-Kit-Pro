import React from 'react';
import { Link } from 'gatsby';

const NullSubscriptionCard = () => {
  return (
    <div>
      <div>No Subscription Found</div>
      <div>Click Here to add subscription</div>
      <Link to="/purchase/plan">Submit</Link>
    </div>
  );
};

export default NullSubscriptionCard;
