import React, { useMemo } from 'react';
import {
  ScalprumComponent,
  ScalprumComponentProps,
} from '@scalprum/react-core';
import { Bullseye, Spinner } from '@patternfly/react-core';

const Fallback = () => (
  <Bullseye>
    <Spinner />
  </Bullseye>
);

const Landing: React.FC<{ layoutType?: string }> = ({ layoutType }) => {
  const props: ScalprumComponentProps<
    Record<string, unknown>,
    {
      layoutType?: string;
    }
  > = useMemo(
    () => ({
      scope: 'widgetLayout',
      module: './WidgetLayout',
      layoutType,
      fallback: <Fallback />,
      LoadingComponent: Fallback,
    }),
    [layoutType],
  );
  return <ScalprumComponent {...props} />;
};

export default Landing;
