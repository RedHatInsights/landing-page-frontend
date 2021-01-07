import React from 'react';
import {
  Level,
  LevelItem,
  Stack,
  StackItem,
  Title,
} from '@patternfly/react-core';

const Body = () => {
  const ascTitle = 'Application Services Recommendations';

  return (
    <Level>
      <LevelItem>
        <Stack className="ins-c-body-tile-grouping">
          <StackItem>
            <Title headingLevel="h1" size="xl">
              Hello
            </Title>
          </StackItem>
          <StackItem>
            <h1>{ascTitle}</h1>
          </StackItem>
        </Stack>
      </LevelItem>
      <LevelItem>
        <Stack className="ins-c-body-tile-grouping">
          <StackItem>
            <h1>Platform Insights</h1>
          </StackItem>
        </Stack>
      </LevelItem>
    </Level>
  );
};

export default Body;
