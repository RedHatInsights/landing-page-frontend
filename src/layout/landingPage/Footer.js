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
  BuilderImageIcon,
  CloudSecurityIcon,
  CloudTenantIcon,
  ConnectedIcon,
  ExternalLinkAltIcon,
  PencilAltIcon,
} from '@patternfly/react-icons';

// import IconInsights from '../../components/icon-insights';
import IconAnsible from '../../components/icon-ansible';

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
                <ConnectedIcon />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Connect your cloud resources
                </Text>
                <Text component="h4" className="tile-description">
                  Lorem Dolor ipsum Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-link">
                  <a href="/settings/sources">
                    Configure Sources&nbsp;
                    <ArrowRightIcon size="sm" />
                  </a>
                </Text>
              </TextContent>
            </SplitItem>
          </Split>
          <Split className="tile">
            <SplitItem>
              <div className="tile-icon">
                <PencilAltIcon />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Register with Insights
                </Text>
                <Text component="h4" className="tile-description">
                  Lorem Dolor ipsum Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-link">
                  <a>
                    Registration Assistant&nbsp;
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
                <BuilderImageIcon />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Image Builder
                </Text>
                <Text component="h4" className="tile-description">
                  Lorem Dolor ipsum Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-link">
                  <a>
                    Try it&nbsp;
                    <ArrowRightIcon size="sm" />
                  </a>
                </Text>
              </TextContent>
            </SplitItem>
          </Split>
          <Split className="tile">
            <SplitItem>
              <div className="tile-icon">
                <CloudTenantIcon />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Remediate from the cloud
                </Text>
                <Text component="h4" className="tile-description">
                  Lorem Dolor ipsum Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-link">
                  <a>
                    Try it&nbsp;
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
                <CloudSecurityIcon />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Trust & Security
                </Text>
                <Text component="h4" className="tile-description">
                  Lorem Dolor ipsum Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-link">
                  <a>
                    Learn more&nbsp;
                    <ExternalLinkAltIcon size="sm" />
                  </a>
                </Text>
              </TextContent>
            </SplitItem>
          </Split>
          <Split className="tile">
            <SplitItem>
              <div className="tile-icon">
                <IconAnsible />
              </div>
            </SplitItem>
            <SplitItem>
              <TextContent>
                <Text component="h4" className="tile-title">
                  Ansible Automation Hub
                </Text>
                <Text component="h4" className="tile-description">
                  Lorem Dolor ipsum Lorem Dolor ipsum
                </Text>
                <Text component="h4" className="tile-link">
                  <a>
                    Learn more&nbsp;
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
