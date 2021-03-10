import React from 'react';
import ConfirmPayment from '../screens/Purchase/OneTimePay/ConfirmPayment';
import SEO from '../components/Marketing/Layout/seo';
import AltHeader from '../components/Purchase/Navigation/altHeader';

export default function ConfirmPaymentPage() {
  const seoData = {
    title: 'Saas Starter Kit Pro Confirm Payment page',
    description: 'Saas Starter Kit Pro Confirm Payment page'
  };
  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <div>
        <AltHeader />
        <ConfirmPayment />
      </div>
    </React.Fragment>
  );
}
