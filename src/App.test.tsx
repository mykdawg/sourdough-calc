import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sourdough starter header', () => {
  render(<App />);
  const header = screen.getByText('Sourdough Starter Calculator');
  expect(header).toBeInTheDocument();
});
