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

## Adding a new card/tile

### Marketing Page

in `src/consts/marketing.js`, fill out the appropriate fields:

```js
{
    title: 'Tile Title',
    id: 'tile-id',
    marketingImage: marketingImage,
    marketingText: 'marketing-description',
    marketingUrls: {
        learnMore: 'https://www.redhat.com/en/technologies/marketing-link',
        tryIt: 'https://www.redhat.com/en/technologies/try-it-link'
    }
},
```

### Authenticated Page

in `src/consts/technologies.js` you have two options:

1. Place your app info inside a pre-existing category:

    ```js
        {
            id: 'app-id',
            name: 'App Title',
            url: '{bundle}/{app-path}'
        }
    ```

2. Create a new category:

    ```js
        {
            id: 'category-id',
            title: 'Category Title',
            description: 'This is the category description',
            image: imagePath,
            apps: [
                {
                    id: 'app-id',
                    name: 'App Title',
                    url: '{bundle}/{app-path}'
                }
            ]
        }
    ```

### Unentitled Modal

If a user is not entitled, they will hit an unentitled modal when trying to access a bundle, these can be seen at cloud.redhat.com/?not_entitled=bundle_name

You can create a modal in `src/consts/unentitled.js`

```js
    {
        id: 'id',
        entitlement: 'bundle_entitlement',
        image: `${document.baseURI}apps/chrome/assets/images/platform-icons/icon.svg`,
        title: 'Unentitled Title',
        description: 'Unentitled Description',
        actions: {
            primary: { // Primary CTA (blue button)
                title: 'Request an evaluation',
                navigate: 'https://access.redhat.com/products/eval_link'
            },
            secondary: { // Secondary Action (link button)
                title: 'Learn more',
                navigate: 'https://access.redhat.com/products/learn_more_link'
            },
            close: { // Closes Modal (link button)
                title: 'Not now'
            }
        }
    }
```
