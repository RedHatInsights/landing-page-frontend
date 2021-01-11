/* eslint-disable */
import React from 'react';
import { Flex, FlexItem, Title } from '@patternfly/react-core'; //eslint-disable-line
import FooterTile from './FooterTile'; //eslint-disable-line
import './styles/Footer.scss';
// import { 
//   FlagIcon,
//   UsersIcon,
//   OutlinedQuestionCircleIcon,
//   PlayCircleIcon, 
//   OutlinedWindowRestoreIcon
// } from '@patternfly/react-icons';

const Footer = () => {
  return (
    <Flex className="ins-c-footer">
      <FlexItem>
        <Title className="ins-c-footer__title" headingLevel="h1" size="xl">
          Configure
        </Title>
        <Flex
          className="ins-c-footer__grouping"
          direction={{ default: 'column' }}
        >
          {/* <FooterTile
            icon={
              <FlagIcon className="--pf-global--icon--FontSize--lg"/>
            }
          /> */}
        </Flex>
      </FlexItem>
      <Flex
        className="ins-c-footer__grouping"
        direction={{ default: 'column' }}
      >
        <FlexItem>
          <Title className="ins-c-footer__title" headingLevel="h1" size="xl">
            Try
          </Title>
        </FlexItem>
        <FlexItem>
          <Title headingLevel="h3" size="lg">
            Lorem Ipsum dolor sin mate ir
          </Title>
        </FlexItem>
        <FlexItem>
          <Title headingLevel="h3" size="lg">
            Lorem Dolor ipsum
          </Title>
        </FlexItem>
      </Flex>
      <Flex
        className="ins-c-footer__grouping"
        direction={{ default: 'column' }}
      >
        <FlexItem>
          <Title className="ins-c-footer__title" headingLevel="h1" size="xl">
            Learn
          </Title>
        </FlexItem>
        <FlexItem>
          <Title headingLevel="h3" size="lg">
            Lorem Ipsum dolor sin mate ir
          </Title>
        </FlexItem>
        <FlexItem>
          <Title headingLevel="h3" size="lg">
            Lorem Dolor ipsum
          </Title>
        </FlexItem>
      </Flex>
    </Flex>
  );
};

export default Footer;
