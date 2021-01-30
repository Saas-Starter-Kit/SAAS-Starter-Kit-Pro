import React from 'react';
import ProductNav from '../Navigation/productNav';
import Layout from './index';

const ProductLayout = ({ children }) => {
  return (
    <Layout>
      <div>Product</div>
      <ProductNav />
      <div>{children}</div>
    </Layout>
  );
};

export default ProductLayout;
