import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useLastVisited } from '@redhat-cloud-services/chrome';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { Link } from 'react-router-dom';

const LinkWrapper = ({ pathname, title }) => {
  const { updateDocumentTitle } = useChrome();
  return (
    <Link onClick={() => updateDocumentTitle(title)} to={pathname}>
      {title}
    </Link>
  );
};

LinkWrapper.propTypes = {
  pathname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const RecentlyVisited = () => {
  const lastVisited = useLastVisited();
  const lastVisitedData = lastVisited.slice(0, 10);
  return (
    <TextContent className="pf-m-fill pf-u-px-xl pf-u-py-lg">
      <Text component={TextVariants.h3} className="pf-u-mb-lg">
        Recently visited
      </Text>
      {lastVisitedData.map(({ bundle, pathname, title }, index) => (
        <Fragment key={index}>
          <LinkWrapper title={title} pathname={pathname} />
          <Text component={TextVariants.small}>{bundle}</Text>
        </Fragment>
      ))}
    </TextContent>
  );
};

export default RecentlyVisited;
