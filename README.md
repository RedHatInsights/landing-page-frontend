# landing-page-frontend

[![Build Status](https://travis-ci.org/RedHatInsights/landing-page-frontend.svg?branch=master)](https://travis-ci.org/RedHatInsights/landing-page-frontend)

## Getting Started

There is a [comprehensive quick start guide in the Storybook Documentation](https://github.com/RedHatInsights/insights-frontend-storybook/blob/master/src/docs/welcome/quickStart/DOC.md) to setting up an Insights environment complete with:

- [Insights-Frontend-Starter-App](https://github.com/RedHatInsights/insights-frontend-starter-app)
- [Insights Chroming](https://github.com/RedHatInsights/insights-chrome)
- [Insights Proxy](https://github.com/RedHatInsights/insights-proxy)

## Running locally

1. `npm install`
2. Have [insights-proxy](https://github.com/RedHatInsights/insights-proxy) installed under PROXY_PATH and run the following command:

    ```shell
    SPANDX_CONFIG="./config/spandx.config.js" bash $PROXY_PATH/scripts/run.sh
    ```

3. `npm run start`

4. Checkout https://ci.foo.redhat.com:1337/

### Testing

- `npm run test` tests
- `npm run lint` will run the linter

### Deploying

The follow six branches are used

- Stable
  - prod-stable -> releases to cloud.redhat.com
  - master-stable -> releases to qa/ci.cloud.paas.psi.redhat.com

- Beta
  - prod-beta -> releases to cloud.redhat.com/beta
  - master -> releases to qa/ci.cloud.paas.psi.redhat.com/beta

## Adding a new card/tile

in `src/consts.js`, make a new section with these fields:

```js
{
    id: // string: ID of your app.
    disabled: // bool: does it need to be disabled? - this could be only on prod, only on beta, etc.
    entitlement: // string: what entitlement is this? should be similar to the ID?
    url: // string: your base url. cloud.redhat.com/{url}
    baseApp: // string: your base app. cloud.redhat.com/{url}{baseapp}, should start with '/'
    image: // oneOfType([ func, string ]): on the authenticated page, what image/icon should be at the top of your card?
    title: // string: title on the top of your card
    body: // string: body text in the middle of your card
    apps: { // object: sub application shown on the card
        'string to show on the card': '/path',
        'foo': '/foo',
        'bar': '/bar'
    },
    marketing: // bool: do you want a tile on the unauthenticated page? If not, remove all instances of "marketing"
    marketingImage: // oneOfType([ func, string ]): on the marketing page, what image/icon should be at the top of your card?
    marketingText: // string: title in the middle of your card
    marketingUrl: // string: "Learn more" url to redirect to your app's marketing material
    emptyTitle: // string: if unentitled, the top title in the unentitled modal
    emptyText: // string: if unentitled, the middle text in the unentitled modal
    emptyAction: { // object: Button to redirect to an eval or to sign up for sku
        title: 'Learn More', // string: title of button
        navigate: 'www.redhat.com' // string: where the button will link to
    }
}
```
