import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Title,
  TitleSizes,
} from '@patternfly/react-core';
import React from 'react';

const ThirdPanel = () => {
  return (
    <Card
      isFlat
      className="land-c-card-third-panel pf-u-mx-xl-on-sm pf-u-mx-3xl-on-md pf-u-my-md"
    >
      <CardHeader>
        <Title
          headingLevel="h3"
          size={TitleSizes['xl']}
          className="pf-u-text-align-right pf-u-pb-md"
        >
          Configure Hybrid Cloud Console
        </Title>
      </CardHeader>
      <CardBody>
        <Flex>
          <Flex flex={{ default: 'flex_1' }}>
            <Title
              headingLevel="h4"
              size={TitleSizes['lg']}
              className="pf-u-text-align-right pf-u-pb-md"
            >
              Sources
            </Title>
          </Flex>
          <Flex flex={{ default: 'flex_1' }}>
            <Title
              headingLevel="h4"
              size={TitleSizes['lg']}
              className="pf-u-text-align-right pf-u-pb-md"
            >
              User Access
            </Title>
          </Flex>
          <Flex flex={{ default: 'flex_1' }}>
            <Title
              headingLevel="h4"
              size={TitleSizes['lg']}
              className="pf-u-text-align-right pf-u-pb-md"
            >
              Notifications
            </Title>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ThirdPanel;
