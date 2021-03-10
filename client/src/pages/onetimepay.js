import React from 'react';
import OneTimePay from '../screens/Purchase/OneTimePay';
import SEO from '../components/Marketing/Layout/seo';
import AltHeader from '../components/Purchase/Navigation/altHeader';

export default function OneTimePayPage() {
  const seoData = {
    title: 'Saas Starter Kit Pro Payment page',
    description: 'Saas Starter Kit Pro Payment page'
  };
  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <div>
        <AltHeader />
        <OneTimePay />
      </div>
    </React.Fragment>
  );
}
