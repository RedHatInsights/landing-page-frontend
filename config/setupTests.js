import { configure, mount, render, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;

global.fetch = require('jest-fetch-mock');

const returnBlank = () => undefined;

global.window.insights = {
  ...(window.insights || {}),
  chrome: {
    ...((window.insights && window.insights.chrome) || {}),
    init: returnBlank,
    identifyApp: returnBlank,
    isBeta: () => false,
    getEnvironment: () => 'prod',
    auth: {
      ...((window.insights &&
        window.insights.chrome &&
        window.insights.chrome) ||
        {}),
      login: returnBlank,
      getToken: () => Promise.resolve('blablatoken'),
      getUser: () =>
        new Promise((res) =>
          res({
            identity: {
              account_number: '0',
              type: 'User',
              user: {
                is_org_admin: true,
              },
            },
          })
        ),
    },
    getUserPermissions: jest.fn(),
  },
};
