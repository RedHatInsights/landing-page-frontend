import React from 'react';
import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  TextContent,
  Text,
} from '@patternfly/react-core'; //eslint-disable-line
import {
  ArrowRightIcon,
  AutomationIcon,
  BlueprintIcon,
  CloudTenantIcon,
  DomainIcon,
  ExternalLinkAltIcon,
  FilterIcon,
  IntegrationIcon,
} from '@patternfly/react-icons';

const Footer = () => {
  return (
    <Flex className="third-level">
      <Flex className="level-wrapper">
        <Flex className="section">
          <FlexItem>
            <Text component="p" className="section-title">
              Configure
            </Text>
          </FlexItem>
          <FlexItem className="break" /> {/*break for mobile layout*/}
          <Split className="tile">
            <SplitItem>
              <div className="tile-icon">
                <CloudTenantIcon />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Manage your Red Hat products in the cloud
                </Text>
                <Text component="h4" className="tile-description">
                  Connect to Red Hat applications and public cloud providers
                </Text>
                <Text component="h4" className="tile-link">
                  <a href="/settings/sources">
                    Connect to Sources&nbsp;
                    <ArrowRightIcon size="sm" />
                  </a>
                </Text>
              </TextContent>
            </SplitItem>
          </Split>
          <Split className="tile">
            <SplitItem>
              <div className="tile-icon">
                <FilterIcon />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-description">
                  Lorem Dolor ipsum Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-link">
                  <a>
                    Lorem&nbsp;
                    <ArrowRightIcon size="sm" />
                  </a>
                </Text>
              </TextContent>
            </SplitItem>
          </Split>
        </Flex>
        <Flex className="section">
          <FlexItem>
            <Text component="p" className="section-title">
              Try
            </Text>
          </FlexItem>
          <FlexItem className="break" /> {/*break for mobile layout*/}
          <Split className="tile">
            <SplitItem>
              <div className="tile-icon">
                <AutomationIcon />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-description">
                  Lorem Dolor ipsum Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-link">
                  <a>
                    Lorem&nbsp;
                    <ArrowRightIcon size="sm" />
                  </a>
                </Text>
              </TextContent>
            </SplitItem>
          </Split>
          <Split className="tile">
            <SplitItem>
              <div className="tile-icon">
                <IntegrationIcon />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-description">
                  Lorem Dolor ipsum Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-link">
                  <a>
                    Lorem&nbsp;
                    <ArrowRightIcon size="sm" />
                  </a>
                </Text>
              </TextContent>
            </SplitItem>
          </Split>
        </Flex>
        <Flex className="section">
          <FlexItem>
            <Text component="p" className="section-title">
              Learn
            </Text>
          </FlexItem>
          <FlexItem className="break" /> {/*break for mobile layout*/}
          <Split className="tile">
            <SplitItem>
              <div className="tile-icon">
                <BlueprintIcon />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-description">
                  Lorem Dolor ipsum Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-link">
                  <a>
                    Lorem&nbsp;
                    <ExternalLinkAltIcon size="sm" />
                  </a>
                </Text>
              </TextContent>
            </SplitItem>
          </Split>
          <Split className="tile">
            <SplitItem>
              <div className="tile-icon">
                <DomainIcon />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-description">
                  Lorem Dolor ipsum Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-link">
                  <a>
                    Lorem&nbsp;
                    <ExternalLinkAltIcon size="sm" />
                  </a>
                </Text>
              </TextContent>
            </SplitItem>
          </Split>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
