import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrContinueWith from '../components/Auth/continueWith';

test('Continue With text correctly displays', () => {
  render(<OrContinueWith />);
  expect(screen.getByText('Or Continue With')).toBeInTheDocument();
});
