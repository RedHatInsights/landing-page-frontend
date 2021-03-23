import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Text,
  TextContent,
} from '@patternfly/react-core';
import {
  ArrowRightIcon,
  BuilderImageIcon,
  CloudSecurityIcon,
  CloudTenantIcon,
  ConnectedIcon,
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
};

console.log({ iconMapper });

const NoIcon = () => <div>No icon</div>;
const TileItem = ({ icon, title, link: { href, title: linkTitle } = {} }) => {
  const Icon = iconMapper[icon] || NoIcon;
  console.log(Icon, icon);
  return (
    <Split className="tile">
      <SplitItem>
        <div className="tile-icon">
          <Icon />
        </div>
      </SplitItem>
      <SplitItem>
        <TextContent>
          <Text component="h4" className="tile-title">
            {title}
          </Text>
          <Text component="h4" className="tile-link">
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
  console.log(items);
  return (
    <Flex className="section">
      <FlexItem>
        <Text component="p" className="section-title">
          {title}
        </Text>
      </FlexItem>
      <FlexItem className="break" /> {/*break for mobile layout*/}
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
