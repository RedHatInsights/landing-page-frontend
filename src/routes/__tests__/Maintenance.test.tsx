import React from 'react';
import { render, screen } from '@testing-library/react';
import Maintenance from '../Maintenance';

describe('Maintenance page', () => {
  it('should render correctly', () => {
    const { container } = render(<Maintenance />);
    expect(container).toMatchSnapshot();
  });

  it('Maintenance: go home', () => {
    render(<Maintenance />);
    screen.getByText('Return to homepage').click();
    expect(window.location.pathname).toBe('/');
  });
});
