import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FancyLink from '../FancyLink';

describe('BannerCard component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<FancyLink to='#' className='testClassname'>Test</FancyLink>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
