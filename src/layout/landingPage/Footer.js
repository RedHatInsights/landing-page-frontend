import React from 'react';
import {
  Gallery,
  GalleryItem,
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
import './styles/Footer.scss';

const Footer = () => {
  return (
    <Gallery hasGutter>
      <GalleryItem>
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
      </GalleryItem>
      <GalleryItem>
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
      </GalleryItem>
      <GalleryItem>
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
      </GalleryItem>
    </Gallery>
  );
};

export default Footer;
