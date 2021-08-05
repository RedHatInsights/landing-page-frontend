import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  FlexItem,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import { ArrowRightIcon } from '@patternfly/react-icons';
import IconLightBulb from './icon-light-bulb';
import IconManagementAutomation from './icon-management-automation';
import IconOpenSource from './icon-open-source';

import classNames from 'classnames';
import useRequest from './use-request';
import { Skeleton } from '@redhat-cloud-services/frontend-components/Skeleton';
import { permissionProcessor } from '../../contentApi/request-processor';

const iconMapper = {
  config: IconManagementAutomation,
  try: IconOpenSource,
  learn: IconLightBulb,
};

const TileItem = (props) => {
  const [{ response, loaded, ...rest }] = useRequest(props);
  const {
    title,
    description,
    link: { href, title: linkTitle, external } = {},
  } = response || rest;

  return (
    <TextContent className="pf-u-mb-xl tile">
      {loaded ? (
        <Title headingLevel="h4" size="md" className="pf-u-mb-0">
          {title}
        </Title>
      ) : (
        <Skeleton size="lg" />
      )}
      {description ? (
        loaded ? (
          <Text component="small" className="pf-u-m-0">
            {description}
          </Text>
        ) : (
          <Skeleton size="lg" />
        )
      ) : null}
      <Text component="p" className="pf-u-mb-0">
        <a
          href={href}
          {...(external
            ? {
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : {})}
        >
          {linkTitle}&nbsp;
          <ArrowRightIcon size="sm" />
        </a>
      </Text>
    </TextContent>
  );
};

TileItem.propTypes = {
  shape: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    link: PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      external: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  url: PropTypes.string,
  permissions: PropTypes.arrayOf(
    PropTypes.shape({
      method: PropTypes.string.isRequired,
      args: PropTypes.array,
    })
  ),
};

const ConfigTryLearnTile = ({
  title,
  isExpanded,
  column,
  items,
  sectionName,
}) => {
  const [tiles, setTiles] = useState([]);

  useEffect(async () => {
    let tiles = items.map(async ({ permissions, ...item }) => {
      const hasPermission = await permissionProcessor(permissions);
      return { ...item, hasPermission };
    });
    tiles = await Promise.all(tiles).then((data) =>
      data.filter(({ hasPermission }) => hasPermission === true)
    );
    setTiles(tiles);
  }, []);

  if (tiles.length === 0) {
    return null;
  }

  const Icon = iconMapper[sectionName];
  return (
    <Fragment>
      {title && (
        <Flex
          alignItems={{ default: 'alignItemsFlexEnd' }}
          className="pf-u-mb-lg section-header"
          style={{ gridRow: 1 }}
        >
          <FlexItem>
            <Icon />
          </FlexItem>
          <FlexItem>
            <Title headingLevel="h4" size="xl" className={classNames(column)}>
              {title}
            </Title>
          </FlexItem>
        </Flex>
      )}
      {tiles.slice(0, isExpanded ? -1 : 2).map((item, index) => (
        <div
          className={column}
          style={{ gridRow: index + 2 }}
          key={item.id || item.shape.title}
        >
          <TileItem {...item} />
        </div>
      ))}
    </Fragment>
  );
};

ConfigTryLearnTile.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(TileItem.propTypes)),
  column: PropTypes.string.isRequired,
  sectionName: PropTypes.oneOf(['config', 'try', 'learn']).isRequired,
  isExpanded: PropTypes.bool,
};

ConfigTryLearnTile.defaultProps = {
  items: [],
};

export default ConfigTryLearnTile;
