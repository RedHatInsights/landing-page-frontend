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
      <FlexItem className="section">
        <Stack>
          <StackItem>
            <Text component="p" className="section-title">
              Configure
            </Text>
          </StackItem>
          <StackItem>
            <Split className="tile">
              <SplitItem>
                <div className="tile-icon">
                  <CogIcon />
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
          </StackItem>
          <StackItem>
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
          </StackItem>
        </Stack>
      </FlexItem>
      <FlexItem className="section">
        <Stack>
          <StackItem>
            <Text component="p" className="section-title">
              Try
            </Text>
          </StackItem>
          <StackItem>
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
          </StackItem>
          <StackItem>
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
          </StackItem>
        </Stack>
      </FlexItem>
      <FlexItem className="section">
        <Stack>
          <StackItem>
            <Text component="p" className="section-title">
              Learn
            </Text>
          </StackItem>
          <StackItem>
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
          </StackItem>
          <StackItem>
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
          </StackItem>
        </Stack>
      </FlexItem>
    </Flex>
  );
};

export default Footer;
