import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  FlexItem,
  Grid,
  GridItem,
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

const TileItem = ({
  icon,
  title,
  description,
  link: { href, title: linkTitle } = {},
}) => {
  const Icon = iconMapper[icon] || QuestionCircleIcon;
  return (
    <Split className="pf-u-mb-xl">
      <SplitItem className="pf-u-mr-md icon-wrapper">
        <Icon size="xl" className="tile-icon" />
      </SplitItem>
      <SplitItem>
        <TextContent>
          <Text component="p" className="tile-text pf-u-mb-sm">
            {title}
          </Text>
          {description && <Text component="small">{description}</Text>}
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
  description: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const ConfigTryLearnTile = ({ title, items }) => {
  return (
    <Flex direction={{ default: 'column', md: 'column', lg: 'row' }}>
      <FlexItem className="pf-u-mb-0 title-wrapper">
        <Title headingLevel="h4" size="xl" className="pf-u-pb-xl section-title">
          {title}
        </Title>
      </FlexItem>
      <FlexItem>
        <Grid hasGutter>
          {items.map((item) => (
            <GridItem md={6} lg={6} xl={12} sm={12} key={item.title}>
              <TileItem {...item} />
            </GridItem>
          ))}
        </Grid>
      </FlexItem>
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
