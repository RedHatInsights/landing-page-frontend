# Application content schemas

## Self service schema

Be aware that the interfaces below also include dynamic attributes like `url`, `method` and `accessor`. Do not use these if you are creating API response for the self service!

## Full application schema

```TS
interface fullSchema {
  estate: {
    section: string // Section title
    items: EstateTile[] // Tiles definition, see below
  }[],
  recommendations: {
    recs?: RecommendationItem[] // items in recommendations section
    ansible?: RecommendationItem[] // items in ansible section
    openshift?: RecommendationItem[] // items in openshift section
    redhatInsights?: RecommendationItem[] // items in rhel section
  },
  configTryLearn: {
    configure: ConfigureTryLearnItem[]
    try: ConfigureTryLearnItem[]
    learn: ConfigureTryLearnItem[]
  }
}
```

## Estate tile

```TS
interface EstateTile {
  id: string
  url?: string // If the count is not in schema, the tile will retrieve the data from this URL
  count?: number // Count value of the etsate tile. If the count is specified the API will not be triggered.
  accessor?: string // lodash like object accessor to API response object, see: https://lodash.com/docs/4.17.15#get
  method?: 'get'|'post' // API method
  args?: any[] // API request body content
  condition?: Condition // see below
  shape: {
    title: string // tile text
    href: string // link to crc app
  }
  permissions?: Permission[] // see below
}
```

## Recommendation item

```TS
interface RecommendationItem {
  id: string;
  description: string | { id: string, defaultMessage: string } // see https://formatjs.io/docs/react-intl/api/#formatmessage
  condition?: Condition // see below
  url?: string // Url to API endpoint
  accessor?: string // lodash like object accessor to API response object, see: https://lodash.com/docs/4.17.15#get
  icon: 'insights'|'ansible'|'lightbulb'|'error'|'list'|'history'|'cog'|'play'|'unknown'|'download' // tile icon
  state?: 'error'|'warning'|'info'|'success' // changes icon color based on PF defined states
  permissions?: Permission[] // see below
  action: {
    href: string // action link
    title: string // action text
    external?: boolean // open link in a new tab
  }
}
```

## Configure try learn item
```TS
interface ConfigureTryLearnItem {
  id: string
  url?: string // Url to API endpoint
  accessor?: string // lodash like object accessor to API response object, see: https://lodash.com/docs/4.17.15#get
  permissions?: Permission[] // see below
  shape: {
    title: string, // Tile main text
    description?: string,
    link: {
      title: string, // Link text
      href: string, // Link URL
      external?: boolean // open link in a new tab
    }
  }
}

```

## Condition

Conditions are used to show the content based on API response. Currently, we support `is` and `isNot` comparators. Only one comparator can be defined at the same time.

```TS
interface Condition {
  when: string // lodash like object accessor to API response object, see: https://lodash.com/docs/4.17.15#get
  is: any // when === is
  isNot: any // when !== is
}
```

## Permission

Permissions are used to show content to the user only if they have required permissions. User must have **all** permissions listed in the configuration.

[See chrome permissions documentation](https://github.com/RedHatInsights/insights-chrome/blob/master/docs/navigation.md#permissions)


```TS
interface Permission {
  method: 'isOrgAdmin'|'isActive'|'isInternal'|'isEntitled'|'isNotEntitled'|'isProd'|'isBeta'|'loosePermissions'|'hasPermissions'|'hasLocalStorage'|'hasCookie'|'apiRequest'
  args: any[]
}
```


