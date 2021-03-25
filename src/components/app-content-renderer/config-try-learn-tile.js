import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import {
  ArrowRightIcon,
  BuilderImageIcon,
  CloudSecurityIcon,
  CloudTenantIcon,
  ConnectedIcon,
  QuestionCircleIcon,
} from '@patternfly/react-icons';
import IconInsights from '../icon-insights';
import IconAnsible from '../icon-ansible';

const iconMapper = {
  connected: ConnectedIcon,
  insights: IconInsights,
  builderImage: BuilderImageIcon,
  couldTenant: CloudTenantIcon,
  cloudSecurity: CloudSecurityIcon,
  ansible: IconAnsible,
  unknown: QuestionCircleIcon,
};

const TileItem = ({ icon, title, link: { href, title: linkTitle } = {} }) => {
  const Icon = iconMapper[icon] || QuestionCircleIcon;
  return (
    <Split className="pf-u-mb-xl tile-content">
      <SplitItem className="pf-u-mr-md icon-wrapper">
        <Icon size="xl" className="tile-icon" />
      </SplitItem>
      <SplitItem>
        <TextContent>
          <Text component="p" className="tile-text pf-u-mb-sm">
            {title}
          </Text>
          <Text component="p" className="tile-text">
            <a href={href}>
              {linkTitle}&nbsp;
              <ArrowRightIcon size="sm" />
            </a>
          </Text>
        </TextContent>
      </SplitItem>
    </Split>
  );
};

TileItem.propTypes = {
  icon: PropTypes.oneOf(['connected', 'insights']).isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const ConfigTryLearnTile = ({ title, items }) => {
  return (
    <Flex direction={{ default: 'column' }}>
      <FlexItem className="pf-u-mb-0">
        <Title headingLevel="h4" size="xl" className="pf-u-pb-xl section-title">
          {title}
        </Title>
      </FlexItem>
      {items.map((item) => (
        <TileItem key={item.title} {...item} />
      ))}
    </Flex>
  );
};

ConfigTryLearnTile.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOf(['connected', 'insights']).isRequired,
      title: PropTypes.string.isRequired,
      link: PropTypes.shape({
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
};

ConfigTryLearnTile.defaultProps = {
  items: [],
};

export default ConfigTryLearnTile;
