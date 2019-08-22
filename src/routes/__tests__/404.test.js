import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NotFound from '../404';

const mockStore = configureMockStore();
const store = mockStore({});

describe('404 page', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <Provider store={ store }>
                <NotFound />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('click: Return to homepage', () => {
        const wrapper = mount(
            <Provider store={ store }>
                <NotFound />
            </Provider>
        );
        wrapper.find('button').simulate('click');
        expect(window.location.pathname).toBe('/');
    });
});
