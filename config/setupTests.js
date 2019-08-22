import { configure, mount, render, shallow } from 'enzyme';
import { sinon } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;
global.sinon = sinon;

const returnBlank = () => undefined;

global.window.insights = {
    ...window.insights || {},
    chrome: {
        ...(window.insights && window.insights.chrome) || {},
        init: returnBlank,
        identifyApp: returnBlank,
        auth: {
            ...(window.insights && window.insights.chrome && window.insights.chrome) || {},
            login: returnBlank,
            getUser: () => new Promise((res) => res({
                identity: {
                    // eslint-disable-next-line camelcase
                    account_number: '0',
                    type: 'User'
                }
            }))
        }
    }
};
