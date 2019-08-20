import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;

function initFunc() { return; }

function identifyAppFunc() { return; }

global.window.insights = {
    ...window.insights || {},
    chrome: {
        ...(window.insights && window.insights.chrome) || {},
        init: initFunc,
        identifyApp: identifyAppFunc,
        auth: {
            ...(window.insights && window.insights.chrome && window.insights.chrome) || {},
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
