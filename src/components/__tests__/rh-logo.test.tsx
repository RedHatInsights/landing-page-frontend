import React from 'react';
import { render } from '@testing-library/react';
import RhLogo from '../rh-logo';

describe('RH Logo component', () => {
  it('should render correctly', () => {
    const { container } = render(<RhLogo />);
    expect(container).toMatchSnapshot();
  });
});
