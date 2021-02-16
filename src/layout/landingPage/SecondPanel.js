import React from 'react';
import { Button, Flex, FlexItem, Text, Title } from '@patternfly/react-core';
// import SecondPanelTile from './SecondPanelTile';

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
  ProcessAutomationIcon,
  SecurityIcon,
} from '@patternfly/react-icons';

const SecondPanel = () => {
  return (
    <Flex className="second-level">
      <Flex className="level-wrapper">
        <Flex className="section">
          {/*          <Flex className="subsection">
            <FlexItem>
              <Text component="h1">Application Services Recommendations</Text>
            </FlexItem>
            <FlexItem className="tile-group">  
              <Flex className="tile">
                <FlexItem>
                  <Title headingLevel="h5" size="sm">
                  title
                  </Title>
                </FlexItem>
                <FlexItem align={{ default: 'alignRight' }}>
                  <Button variant="secondary" isSmall={true}>
                  button
                  </Button>
                </FlexItem>
              </Flex>
            </FlexItem>
          </Flex>*/}
          <Flex className="subsection">
            <FlexItem>
              <Text component="h1" className="title">
                Automation recommendations
              </Text>
            </FlexItem>
            <FlexItem className="tile-group">
              <Flex className="tile">
                <FlexItem className="icon">
                  <ProcessAutomationIcon className="error" />
                </FlexItem>
                <FlexItem className="title">
                  <Title headingLevel="h5" size="sm">
                    65 jobs with ‘error’ state detected in last 24h
                  </Title>
                </FlexItem>
                <FlexItem className="button" align={{ default: 'alignRight' }}>
                  <Button variant="secondary" isSmall={true}>
                    Details
                  </Button>
                </FlexItem>
              </Flex>
            </FlexItem>

            <FlexItem className="tile-group">
              <Flex className="tile">
                <FlexItem className="icon">
                  <ProcessAutomationIcon className="warning" />
                </FlexItem>
                <FlexItem className="title">
                  <Title headingLevel="h5" size="sm">
                    No data received in 5 days
                  </Title>
                </FlexItem>
                <FlexItem className="button" align={{ default: 'alignRight' }}>
                  <Button variant="secondary" isSmall={true}>
                    Details
                  </Button>
                </FlexItem>
              </Flex>
            </FlexItem>

            <FlexItem className="tile-group">
              <Flex className="tile">
                <FlexItem className="icon">
                  <ExclamationTriangleIcon className="warning" />
                </FlexItem>
                <FlexItem className="title">
                  <Title headingLevel="h5" size="sm">
                    License expires in 7 days
                  </Title>
                </FlexItem>
                <FlexItem className="button" align={{ default: 'alignRight' }}>
                  <Button variant="secondary" isSmall={true}>
                    Update
                  </Button>
                </FlexItem>
              </Flex>
            </FlexItem>

            <FlexItem className="tile-group">
              <Flex className="tile">
                <FlexItem className="icon">
                  <ExclamationCircleIcon className="error" />
                </FlexItem>
                <FlexItem className="title">
                  <Title headingLevel="h5" size="sm">
                    License capacity is insufficient
                  </Title>
                </FlexItem>
                <FlexItem className="button" align={{ default: 'alignRight' }}>
                  <Button variant="secondary" isSmall={true}>
                    Update
                  </Button>
                </FlexItem>
              </Flex>
            </FlexItem>
          </Flex>
        </Flex>
        <Flex className="section">
          <Flex className="subsection">
            <FlexItem>
              <Text component="h1">Platform insights</Text>
            </FlexItem>
            <FlexItem className="tile-group">
              <Title headingLevel="h2" size="md">
                Operational
              </Title>

              <FlexItem className="tile-group">
                <Flex className="tile">
                  <FlexItem className="icon">
                    <InfoCircleIcon className="info" />
                  </FlexItem>
                  <FlexItem className="title">
                    <Title headingLevel="h5" size="sm">
                      9 Active Incidents Detected
                    </Title>
                  </FlexItem>
                  <FlexItem
                    className="button"
                    align={{ default: 'alignRight' }}
                  >
                    <Button variant="secondary" isSmall={true}>
                      Details
                    </Button>
                  </FlexItem>
                </Flex>
              </FlexItem>

              <FlexItem className="tile-group">
                <Flex className="tile">
                  <FlexItem className="icon">
                    <InfoCircleIcon className="info" />
                  </FlexItem>
                  <FlexItem className="title">
                    <Title headingLevel="h5" size="sm">
                      140 Systems Available for Registration
                    </Title>
                  </FlexItem>
                  <FlexItem
                    className="button"
                    align={{ default: 'alignRight' }}
                  >
                    <Button variant="secondary" isSmall={true}>
                      Register
                    </Button>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </FlexItem>
            <FlexItem className="tile-group">
              <Title headingLevel="h2" size="md">
                Business
              </Title>
              <FlexItem className="tile-group">
                <Flex className="tile">
                  <FlexItem className="icon">
                    <ExclamationTriangleIcon className="warning" />
                  </FlexItem>
                  <FlexItem className="title">
                    <Title headingLevel="h5" size="sm">
                      Subscription consumption threshold reached
                    </Title>
                  </FlexItem>
                  <FlexItem
                    className="button"
                    align={{ default: 'alignRight' }}
                  >
                    <Button variant="secondary" isSmall={true}>
                      View
                    </Button>
                  </FlexItem>
                </Flex>
              </FlexItem>

              <FlexItem className="tile-group">
                <Flex className="tile">
                  <FlexItem className="icon">
                    <CheckCircleIcon className="green" />
                  </FlexItem>
                  <FlexItem className="title">
                    <Title headingLevel="h5" size="sm">
                      41 Under Utilized Cloud Resources
                    </Title>
                  </FlexItem>
                  <FlexItem
                    className="button"
                    align={{ default: 'alignRight' }}
                  >
                    <Button variant="secondary" isSmall={true}>
                      Optimize
                    </Button>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </FlexItem>
          </Flex>
          <Flex className="subsection">
            <FlexItem>
              <Text component="h1" className="security">
                .
              </Text>
            </FlexItem>
            <FlexItem className="tile-group">
              <Title headingLevel="h2" size="md">
                Security
              </Title>

              <FlexItem className="tile-group">
                <Flex className="tile">
                  <FlexItem className="icon">
                    <SecurityIcon className="error" />
                  </FlexItem>
                  <FlexItem className="title">
                    <Title headingLevel="h5" size="sm">
                      37 Critical CVEs Identified
                    </Title>
                  </FlexItem>
                  <FlexItem
                    className="button"
                    align={{ default: 'alignRight' }}
                  >
                    <Button variant="secondary" isSmall={true}>
                      Respond
                    </Button>
                  </FlexItem>
                </Flex>
              </FlexItem>

              <FlexItem className="tile-group">
                <Flex className="tile">
                  <FlexItem className="icon">
                    <SecurityIcon className="warning" />
                  </FlexItem>
                  <FlexItem className="title">
                    <Title headingLevel="h5" size="sm">
                      12 Systems out of compliance
                    </Title>
                  </FlexItem>
                  <FlexItem
                    className="button"
                    align={{ default: 'alignRight' }}
                  >
                    <Button variant="secondary" isSmall={true}>
                      View
                    </Button>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </FlexItem>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SecondPanel;
