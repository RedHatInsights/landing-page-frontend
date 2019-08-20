import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../App';

const mockStore = configureMockStore();
const store = mockStore({});

describe('App component', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <Provider store={ store }>
                <Router>
                    <App />
                </Router>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
