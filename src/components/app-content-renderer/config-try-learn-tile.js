import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
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
import classNames from 'classnames';
import { Skeleton } from '@redhat-cloud-services/frontend-components/Skeleton';

import IconInsights from '../icon-insights';
import IconAnsible from '../icon-ansible';
import { permissionProcessor } from '../../contentApi/request-processor';
import useRequest from './use-request';

const iconMapper = {
  connected: ConnectedIcon,
  insights: IconInsights,
  builderImage: BuilderImageIcon,
  couldTenant: CloudTenantIcon,
  cloudSecurity: CloudSecurityIcon,
  ansible: IconAnsible,
  unknown: QuestionCircleIcon,
};

const TileItem = (props) => {
  const [{ response, loaded, ...rest }] = useRequest(props);
  const { icon, title, description, link: { href, title: linkTitle } = {} } =
    response || rest;

  const Icon = iconMapper[icon] || QuestionCircleIcon;
  return (
    <Split className="pf-u-mb-xl">
      <SplitItem className="pf-u-mr-md icon-wrapper">
        <Icon size="xl" className="tile-icon" />
      </SplitItem>
      <SplitItem>
        <TextContent>
          {loaded ? (
            <Text component="p" className="tile-text pf-u-mb-sm">
              {title}
            </Text>
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
    icon: PropTypes.oneOf(Object.keys(iconMapper)),
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

const ConfigTryLearnTile = ({ title, column, items }) => {
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

  return (
    <Fragment>
      {title && (
        <Title
          style={{ gridRow: 1 }}
          headingLevel="h4"
          size="xl"
          className={classNames(column, 'pf-u-pb-xl', 'section-title')}
        >
          {title}
        </Title>
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
};

ConfigTryLearnTile.defaultProps = {
  items: [],
};

export default ConfigTryLearnTile;
