import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
                <Router>
                    <NotFound />
                </Router>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('click: Return to homepage', () => {
        const wrapper = mount(
            <Provider store={ store }>
                <Router>
                    <NotFound />
                </Router>
            </Provider>
        );
        wrapper.find('button').simulate('click');
        expect(window.location.pathname).toBe('/');
    })
});
