import React from 'react';
import { Level, LevelItem } from '@patternfly/react-core';

const NuBody = () => {
  const title = 'Hello my friend!';

  return (
    <Level>
      <LevelItem>
        <h1>{title}</h1>
      </LevelItem>
    </Level>
  );
};

export default NuBody;
