import React from 'react';
import { render, screen } from '@testing-library/react';
import {App} from '../implementations/App';

test('renders learn react link', () =>
{
  // Arrange
  render(<App />);
  const conversions = screen.getByRole("form");
  // Assert
  expect(conversions).toBeDefined();
});
