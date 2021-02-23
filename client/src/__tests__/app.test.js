import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Marketing/Navigation/footer';

test('Footer displays correct text', () => {
  const { getByText } = render(<Footer />);

  expect(getByText('Header 1')).toBeInTheDocument();
});
