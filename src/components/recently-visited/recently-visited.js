import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import React, { Fragment } from 'react';
import { useLastVisited } from '@redhat-cloud-services/chrome';

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
          <Text
            component={TextVariants.a}
            href={`${document.baseURI.replace(/\/$/, '')}${pathname}`}
          >
            {title}
          </Text>
          <Text component={TextVariants.small}>{bundle}</Text>
        </Fragment>
      ))}
    </TextContent>
  );
};

export default RecentlyVisited;
