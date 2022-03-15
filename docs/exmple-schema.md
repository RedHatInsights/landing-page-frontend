# Self-service schema

**Be aware that all previously dynamic data must be pre-filled in the self-service schema!** in order to improve the landing page performance, the self-service schema does not support dynamic behavior! All data must be already present in the schema. It is redundant to make API calls to get schema which then creates another API to retrieve the data.

The same applies for conditions. If the user is not supposed to see a tile, it should not be listed in the schema. 


This is an example of a self-service schema with data for every landing page section.

```js
{
  "estate": {
    "items": [
      {
        "id": "some-id", // this id is used internally and is not displayed to the user
        "count": 5000, // This value must be pre-filled from your DB/API,
        "shape": {
          "title": "Connected systems", // title of the estate tile
          "href": "/insights/inventory" // estate link which wil bring the user to relevant application
        }
      }, {
        ... // next tile
      }
    ],
  },
  "recommendations": {
    /**
    * These objects will be listed in the RHEL recommendation section
    */
    "redhatInsights": [
      // this entry will be only visible if current user has systems with incidents
      {
        "id": "unique-id",
        "description": "Insights has identified 3 incidents affecting your systems.", // description with filled dynamic value
        "icon": "error",
        "action": {
          "title": "View 3 incidents",
          "href": "./insights/advisor/recommendations?impacting=true&rule_status=enabled&sort=-publish_date&limit=10&offset=0&reports_shown=true&incident=true"
        }
      }
    ],
    /**Goes under the general recommendations section*/
    "recs": [
      {
        "id": "managed-services-id",
        "icon": "download",
        "description": "Get started using your managed Kafka instances.",
        "action": {
          "title": "Download and install the Application Services CLI",
          "external": true,
          "href": "https://access.redhat.com/documentation/en-us/red_hat_openshift_streams_for_apache_kafka/1/guide/f520e427-cad2-40ce-823d-96234ccbc047",
        },
      }
    ]
  },
  "configTryLearn": {
    // items for the configure column
    "configure": [{
      "shape": {
        "title": "Sync Red Hat certified collections",
        "description":
          "Configure access to sync collections to Private Automation Hub.",
        "link": {
          "title": "Get started",
          "href": "./ansible/automation-hub/token",
        },
      },
    }],
    // items for the try column
    "try": [],
    // items for the learn column
    "learn": []
  }
}
```
