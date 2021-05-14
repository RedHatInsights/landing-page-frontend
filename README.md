# landing-page-frontend

[![Build Status](https://travis-ci.org/RedHatInsights/landing-page-frontend.svg?branch=master)](https://travis-ci.org/RedHatInsights/landing-page-frontend)

## Getting Started

There is a [comprehensive quick start guide in the Storybook Documentation](https://github.com/RedHatInsights/insights-frontend-storybook/blob/master/src/docs/welcome/quickStart/DOC.md) to setting up an Insights environment complete with:

- [Insights Frontend Starter App](https://github.com/RedHatInsights/insights-frontend-starter-app)
- [Insights Chroming](https://github.com/RedHatInsights/insights-chrome)
- [Insights Proxy](https://github.com/RedHatInsights/insights-proxy)

## Running locally

1. `npm install`
2. Have [insights-proxy](https://github.com/RedHatInsights/insights-proxy) installed under PROXY_PATH and run the following command:

    ```shell
    SPANDX_CONFIG="./proxy-config/local-frontend.js" bash $PROXY_PATH/scripts/run.sh
    ```

3. `npm run start`

4. Checkout https://ci.foo.redhat.com:1337/

### Testing

- `npm run test` tests
- `npm run lint` will run the linter

### Deploying

The following four branches are used

- Stable
  - prod-stable -> releases to cloud.redhat.com
  - master-stable -> releases to qa/ci.cloud.redhat.com

- Beta
  - prod-beta -> releases to cloud.redhat.com/beta
  - master -> releases to qa/ci.cloud.redhat.com/beta

## Adding content

Detailed documentation can be found [here](https://github.com/RedHatInsights/landing-page-frontend/blob/master/docs/content-schema.md)
