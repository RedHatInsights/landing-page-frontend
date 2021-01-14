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
  AutomationIcon,
  BlueprintIcon,
  CogIcon,
  DomainIcon,
  FilterIcon,
  IntegrationIcon,
} from '@patternfly/react-icons';
import './styles/ThirdPanel.scss';

const Footer = () => {
  return (
    <Flex className="ins-p-console-landing-third-level" hasGutter>
      <FlexItem>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h2" size="xl">
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
                </TextContent>
              </SplitItem>
            </Split>
          </StackItem>
        </Stack>
      </FlexItem>
      <FlexItem>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h2" size="xl">
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
                </TextContent>
              </SplitItem>
            </Split>
          </StackItem>
        </Stack>
      </FlexItem>
      <FlexItem>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h2" size="xl">
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
