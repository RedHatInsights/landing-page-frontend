import React from 'react';
import { render } from '@testing-library/react';
import Icon404 from '../icon-404';

describe('404 component', () => {
  it('should render correctly', () => {
    const { container } = render(<Icon404 />);
    expect(container).toMatchSnapshot();
  });
});
