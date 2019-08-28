import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Landing from '../Landing';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Landing component renders authenticated page', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <Provider store={ store }>
                <Router>
                    <Landing />
                </Router>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
