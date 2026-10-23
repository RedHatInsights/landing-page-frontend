import { defineMessages } from 'react-intl';
import { Label } from '@patternfly/react-core/dist/dynamic/components/Label';
import React from 'react';

// for the support cases widget
export const getUrl = (env: string) =>
  `https://api.access${
    env === 'stage' || env === 'frhStage' ? '.stage' : ''
  }.redhat.com/support/v3/cases/filter`;

export const MAX_ROWS = 5;

export const columnNames = defineMessages({
  caseId: {
    id: 'supportCase.column.caseId',
    description: 'Support cases table column header',
    defaultMessage: 'Case ID',
  },
  issueSummary: {
    id: 'supportCase.column.issueSummary',
    description: 'Support cases table column header',
    defaultMessage: 'Issue summary',
  },
  modifiedBy: {
    id: 'supportCase.column.modifiedBy',
    description: 'Support cases table column header',
    defaultMessage: 'Modified by',
  },
  severity: {
    id: 'supportCase.column.severity',
    description: 'Support cases table column header',
    defaultMessage: 'Severity',
  },
  status: {
    id: 'supportCase.column.status',
    description: 'Support cases table column header',
    defaultMessage: 'Status',
  },
});

export const severityTypes = {
  urgent: '1 (Urgent)',
  high: '2 (High)',
  normal: '3 (Normal)',
  low: '4 (Low)',
};

export const statusTypes = {
  closed: 'Closed',
  customerWaiting: 'Waiting on Customer',
  redHatWaiting: 'Waiting on Red Hat',
};

export const labelColor = (severity: string) => {
  const severityMapper = {
    [severityTypes.urgent]: <Label color="red">{severity}</Label>,
    [severityTypes.high]: <Label color="orange">{severity}</Label>,
    [severityTypes.normal]: <Label color="blue">{severity}</Label>,
    [severityTypes.low]: <Label color="grey">{severity}</Label>,
  };
  return severityMapper[severity] ?? '';
};
