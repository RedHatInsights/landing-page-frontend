import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  PageSection,
  TextContent,
  Title,
} from '@patternfly/react-core';
import { activeTechnologies as technologies } from '../consts';
import './KeyFeatures.scss';
import { keyFeatures as keyFeatures } from '../consts';

const KeyFeatures = () => (
  <PageSection
    className="ins-c-key-features ins-m-display-md pf-m-center"
    landing-page-type="unauthenticated"
    isWidthLimited
  >
    <Flex
      direction={{ default: 'column' }}
      spaceItems={{ default: 'spaceItems2xl' }}
    >
      <Title
        headingLevel="h2"
        size="4xl"
        className="pf-u-font-weight-light pf-u-text-align-center"
      >
        {keyFeatures.title}
      </Title>
      <Grid md={6} xl={3} hasGutter>
        {technologies
          .filter(({ keyFeature }) => keyFeature)
          .map(({ icon, title, text, id }, key) => (
            <Card application-id={id} key={key}>
              {icon && (
                <CardHeader>
                  <img
                    className="ins-c-icon"
                    src={icon}
                    alt={`${title} icon`}
                    aria-hidden="true"
                  />
                </CardHeader>
              )}
              <CardBody>
                <Flex direction={{ default: 'column' }}>
                  <Title headingLevel="h3" size="xl">
                    {title}
                  </Title>
                  <TextContent className="pf-u-font-size-lg">
                    {text}
                  </TextContent>
                </Flex>
              </CardBody>
            </Card>
          ))}
      </Grid>
    </Flex>
  </PageSection>
);

export default KeyFeatures;
