import React, { Fragment, useEffect, useState } from 'react';
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
  CogsIcon,
  PlayIcon,
  LightbulbIcon,
} from '@patternfly/react-icons';
import classNames from 'classnames';
import useRequest from './use-request';
import { Skeleton } from '@redhat-cloud-services/frontend-components/Skeleton';
import { permissionProcessor } from '../../contentApi/request-processor';

const iconMapper = {
  config: CogsIcon,
  try: PlayIcon,
  learn: LightbulbIcon,
};

const TileItem = (props) => {
  const [{ response, loaded, ...rest }] = useRequest(props);
  const { title, description, link: { href, title: linkTitle } = {} } =
    response || rest;

  return (
    <Split className="pf-u-mb-xl">
      <SplitItem>
        <TextContent>
          {loaded ? (
            <Title headingLevel="h4" size="md" className="tile-text pf-u-mb-sm">
              {title}
            </Title>
          ) : (
            <Skeleton size="lg" />
          )}
          {description ? (
            loaded ? (
              <Text className="pf-u-m-0" component="small">
                {description}
              </Text>
            ) : (
              <Skeleton size="lg" />
            )
          ) : null}
          <Text component="p" className="tile-text pf-u-mb-0">
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
  shape: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    link: PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
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

const ConfigTryLearnTile = ({ title, column, items, sectionName }) => {
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
          className="pf-u-mb-lg"
          style={{ gridRow: 1 }}
        >
          <FlexItem>
            <Icon size="md" />
          </FlexItem>
          <FlexItem>
            <Title
              headingLevel="h4"
              size="xl"
              className={classNames(column, 'section-title')}
            >
              {title}
            </Title>
          </FlexItem>
        </Flex>
      )}
      {tiles.map((item, index) => (
        <div
          className={column}
          style={{ gridRow: index + 2 }}
          key={item.key || item.shape.title}
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
};

ConfigTryLearnTile.defaultProps = {
  items: [],
};

export default ConfigTryLearnTile;
