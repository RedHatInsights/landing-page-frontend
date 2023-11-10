import React from 'react';
import Logout from '../Logout';
import { render, screen } from '@testing-library/react';

describe('Logout component', () => {
  it('should render correctly', () => {
    const { container } = render(<Logout />);
    expect(container).toMatchSnapshot();
  });

  it('click: take me home', () => {
    render(<Logout />);
    screen.getByText('Take me home').click();
    expect(window.location.pathname).toBe('/');
  });
});
