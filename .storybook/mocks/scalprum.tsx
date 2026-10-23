import React from 'react';

/**
 * Storybook stub for @scalprum/react-core's remote loader.
 *
 * The app is a federation host: the Landing route mounts widgetLayout's
 * WidgetLayout module through ScalprumComponent. Stories exercise the
 * app's own wiring (routing, prop passthrough, chrome navigation) — the
 * stub renders what the federated module WOULD mount, labeled by
 * scope/module, without loading real remotes.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ScalprumComponent = ({ scope, module, layoutType }: any) => (
  <div
    data-testid="scalprum-stub"
    data-scope={scope}
    data-module={module}
    data-layout-type={layoutType}
  >
    Scalprum stub: {scope}/{module}
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ScalprumProvider = ({ children }: any) => <>{children}</>;
