# landing-page-frontend

[![Build Status](https://travis-ci.org/RedHatInsights/landing-page-frontend.svg?branch=master)](https://travis-ci.org/RedHatInsights/landing-page-frontend)

## Getting Started

There is a [comprehensive quick start guide in the Storybook Documentation](https://github.com/RedHatInsights/insights-frontend-storybook/blob/master/src/docs/welcome/quickStart/DOC.md) to setting up an Insights environment complete with:

- [Insights Frontend Starter App](https://github.com/RedHatInsights/insights-frontend-starter-app)
- [Insights Chroming](https://github.com/RedHatInsights/insights-chrome)
- [Insights Proxy](https://github.com/RedHatInsights/insights-proxy)

## Getting started

Prior to running npm, ensure that you have the appropriate local changes to your `/etc/hosts` file in-place. Here's an example:

```
127.0.0.1   prod.foo.redhat.com
127.0.0.1   stage.foo.redhat.com
127.0.0.1   qa.foo.redhat.com
127.0.0.1   ci.foo.redhat.com
127.0.0.1   dev.foo.redhat.com
::1         prod.foo.redhat.com
::1         stage.foo.redhat.com
```

1. ```npm install```

2. ```npm run start```

Checkout https://stage.foo.redhat.com:1337/ [Read more](https://github.com/RedHatInsights/frontend-components/tree/master/packages/config#useproxy).

## Testing

- `npm run test` tests
- `npm run lint` will run the linter

## Deployment

The following four branches are used

- Stable
  - prod-stable -> releases to console.redhat.com
  - master-stable -> releases to console.stage.redhat.com

- Beta
  - prod-beta -> releases to console.redhat.com/beta
  - master -> releases to console.stage.redhat.com/beta

