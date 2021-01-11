/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Text, Title } from '@patternfly/react-core';
import './styles/FooterTile.scss';

const FooterTile = ({ title, bodyText, link, children }) => {
  return (
    <Flex>
      <FlexItem className="ins-c-footer-tile__icon">
        {children}
      </FlexItem>
      <FlexItem>
        <Title className="ins-c-footer-tile__title">
          {title}
        </Title>
        <Text className="ins-c-footer-tile__text">
          {bodyText}
        </Text>
      </FlexItem>
      <FlexItem>
        <Text className="ins-c-footer-tile__link">
          <a>{link}</a>
        </Text>
      </FlexItem>
    </Flex>
  );
};

FooterTile.propTypes = {
  title: PropTypes.string,
  bodyText: PropTypes.string,
  link: PropTypes.string,
}

FooterTile.defaultValues = {
  title: "Lorem Ipsum dolor sin mate ir",
  bodyText: "Lorem ipsum dolor sit amet",
  link: "Lorem",
}

export default FooterTile;
