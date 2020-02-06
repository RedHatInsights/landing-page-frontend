import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BannerCard from '../BannerCard';

describe('BannerCard component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<BannerCard image='' title='test' description='description'/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
