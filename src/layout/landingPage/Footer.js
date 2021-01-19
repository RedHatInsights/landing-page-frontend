import React from 'react';
import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Stack,
  StackItem,
  TextContent,
  Text,
  Title,
} from '@patternfly/react-core'; //eslint-disable-line
import {
  ArrowRightIcon,
  AutomationIcon,
  BlueprintIcon,
  CogIcon,
  DomainIcon,
  ExternalLinkAltIcon,
  FilterIcon,
  IntegrationIcon,
} from '@patternfly/react-icons';

const Footer = () => {
  return (
    <Flex className="third-level" hasGutter>
      <FlexItem>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h2" size="xl" className="title1">
              Configure
            </Title>
          </StackItem>
          <StackItem>
            <Split>
              <SplitItem>
                <div className="footer-icon">
                  <CogIcon />
                </div>
              </SplitItem>
              <SplitItem>
                <TextContent>
                  <Text component="h4">Lorem Dolor ipsum</Text>
                  <Text component="p">Lorem Dolor ipsum Lorem Dolor ipsum</Text>
                  <Text component="a">
                    Lorem&nbsp;
                    <ArrowRightIcon size="sm" />
                  </Text>
                </TextContent>
              </SplitItem>
            </Split>
          </StackItem>
          <StackItem>
            <Split>
              <SplitItem>
                <div className="footer-icon">
                  <FilterIcon />
                </div>
              </SplitItem>
              <SplitItem>
                <TextContent>
                  <Text component="h4">Lorem Dolor ipsum</Text>
                  <Text component="p">Lorem Dolor ipsum Lorem Dolor ipsum</Text>
                  <Text component="a">
                    Lorem&nbsp;
                    <ArrowRightIcon size="sm" />
                  </Text>
                </TextContent>
              </SplitItem>
            </Split>
          </StackItem>
        </Stack>
      </FlexItem>
      <FlexItem>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h2" size="xl" className="title1">
              Try
            </Title>
          </StackItem>
          <StackItem>
            <Split>
              <SplitItem>
                <div className="footer-icon">
                  <AutomationIcon />
                </div>
              </SplitItem>
              <SplitItem>
                <TextContent>
                  <Text component="h4">Lorem Dolor ipsum</Text>
                  <Text component="p">Lorem Dolor ipsum Lorem Dolor ipsum</Text>
                  <Text component="a">
                    Ipsum&nbsp;
                    <ArrowRightIcon size="sm" />
                  </Text>
                </TextContent>
              </SplitItem>
            </Split>
          </StackItem>
          <StackItem>
            <Split>
              <SplitItem>
                <div className="footer-icon">
                  <IntegrationIcon />
                </div>
              </SplitItem>
              <SplitItem>
                <TextContent>
                  <Text component="h4">Lorem Dolor ipsum</Text>
                  <Text component="p">Lorem Dolor ipsum Lorem Dolor ipsum</Text>
                  <Text component="a">
                    Ipsum&nbsp;
                    <ArrowRightIcon size="sm" />
                  </Text>
                </TextContent>
              </SplitItem>
            </Split>
          </StackItem>
        </Stack>
      </FlexItem>
      <FlexItem>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h2" size="xl" className="title1">
              Learn
            </Title>
          </StackItem>
          <StackItem>
            <Split>
              <SplitItem>
                <div className="footer-icon">
                  <BlueprintIcon />
                </div>
              </SplitItem>
              <SplitItem>
                <TextContent>
                  <Text component="h4">Lorem Dolor ipsum</Text>
                  <Text component="p">Lorem Dolor ipsum Lorem Dolor ipsum</Text>
                  <Text component="a">
                    Ipsum&nbsp;
                    <ExternalLinkAltIcon size="sm" />
                  </Text>
                </TextContent>
              </SplitItem>
            </Split>
          </StackItem>
          <StackItem>
            <Split>
              <SplitItem>
                <div className="footer-icon">
                  <DomainIcon />
                </div>
              </SplitItem>
              <SplitItem>
                <TextContent>
                  <Text component="h4">Lorem Dolor ipsum</Text>
                  <Text component="p">Lorem Dolor ipsum Lorem Dolor ipsum</Text>
                  <Text component="a">
                    Ipsum&nbsp;
                    <ExternalLinkAltIcon size="sm" />
                  </Text>
                </TextContent>
              </SplitItem>
            </Split>
          </StackItem>
        </Stack>
      </FlexItem>
    </Flex>
  );
};

export default Footer;
