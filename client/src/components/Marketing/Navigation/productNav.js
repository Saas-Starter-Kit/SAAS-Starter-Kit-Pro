import React from 'react';
import { Link } from 'gatsby';

const ProductNav = () => {
  return (
    <div>
      <Link to="/product/page1">Page1</Link>
      <Link to="/product/page2">Page2</Link>
      <Link to="/product/page3">Page3</Link>
    </div>
  );
};

export default ProductNav;
