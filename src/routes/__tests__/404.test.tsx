import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../404';

describe('404 page', () => {
  it('should render correctly', () => {
    const { container } = render(<NotFound />);
    expect(container).toMatchSnapshot();
  });

  it('click: Return to homepage', () => {
    render(<NotFound />);
    screen.getByText('Return to homepage').click();
    expect(window.location.pathname).toBe('/');
  });
});
