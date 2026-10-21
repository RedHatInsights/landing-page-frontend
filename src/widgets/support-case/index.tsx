import React, { useEffect, useMemo, useState } from 'react';
import {
  ISortBy,
  SortByDirection,
  Table,
  TableVariant,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import { Button } from '@patternfly/react-core/dist/dynamic/components/Button';
import { EmptyState } from '@patternfly/react-core/dist/dynamic/components/EmptyState';
import { EmptyStateBody } from '@patternfly/react-core/dist/dynamic/components/EmptyState';

import { EmptyStateVariant } from '@patternfly/react-core/dist/dynamic/components/EmptyState';
import { Stack } from '@patternfly/react-core/dist/dynamic/layouts/Stack';
import { StackItem } from '@patternfly/react-core/dist/dynamic/layouts/Stack';
import { Title } from '@patternfly/react-core/dist/dynamic/components/Title';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/dynamic/icons/external-link-alt-icon';
import HeadsetIcon from '@patternfly/react-icons/dist/dynamic/icons/headset-icon';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import SkeletonTable from '@patternfly/react-component-groups/dist/dynamic/SkeletonTable';
import { MAX_ROWS, columnNames, getUrl, labelColor } from './consts';
import { defineMessages, useIntl } from 'react-intl';
import './index.scss';
import {
  SupportCaseFilters,
  SupportCaseWidgetTableFilter,
} from './SupportCaseWidgetTableFilter';

const SUPPORT_CASE_URL =
  'https://access.redhat.com/support/cases/#/case/new/get-support?caseCreate=true';

export type Case = {
  id: string;
  caseNumber: string;
  summary: string;
  lastModifiedById: string;
  severity: string;
  status: string;
  productFamily: string;
};

const messages = defineMessages({
  noOpenCases: {
    id: 'supportCase.empty.title',
    description: 'Support cases widget empty state title',
    defaultMessage: 'No open support cases',
  },
  noOpenCasesBody: {
    id: 'supportCase.empty.body',
    description: 'Support cases widget empty state body',
    defaultMessage: "We can't find any active support cases opened by you.",
  },
  openCase: {
    id: 'supportCase.empty.openCase',
    description: 'Support cases widget link to open a case',
    defaultMessage: 'Open a support case',
  },
  noMatch: {
    id: 'supportCase.filteredEmpty',
    description: 'Support cases widget: no cases match the filters',
    defaultMessage:
      'No support cases match the selected filters. Adjust your filters to see more results.',
  },
  tableAria: {
    id: 'supportCase.table.aria',
    description: 'Support cases table accessible label',
    defaultMessage: 'Support case table widget',
  },
});

const SupportCaseWidget: React.FunctionComponent = () => {
  const intl = useIntl();
  const [cases, setCases] = useState<Case[]>([]);
  const chrome = useChrome();
  const [isLoading, setIsLoading] = useState(false);

  const [sortBy, setSortBy] = useState<ISortBy>({
    index: 0,
    direction: SortByDirection.asc,
  });

  const [filters, setFilters] = useState<SupportCaseFilters>({
    severity: [],
    status: [],
  });

  const columns = [
    {
      name: intl.formatMessage(columnNames.caseId),
      sort: (a: Case, b: Case) => a.caseNumber.localeCompare(b.caseNumber),
    },
    {
      name: intl.formatMessage(columnNames.issueSummary),
      sort: (a: Case, b: Case) => a.summary.localeCompare(b.summary),
    },
    {
      name: intl.formatMessage(columnNames.modifiedBy),
      sort: (a: Case, b: Case) =>
        a.lastModifiedById.localeCompare(b.lastModifiedById),
    },
    {
      name: intl.formatMessage(columnNames.severity),
      sort: (a: Case, b: Case) => a.severity.localeCompare(b.severity),
    },
    {
      name: intl.formatMessage(columnNames.status),
      sort: (a: Case, b: Case) => a.status.localeCompare(b.status),
    },
  ];

  const onSort = (
    _event: React.MouseEvent,
    index: number,
    direction: SortByDirection,
  ) => {
    setSortBy({ index, direction });

    const sortedCases = [...cases].sort((a, b) => {
      const sortFunc = columns[index].sort;

      if (direction === SortByDirection.asc) {
        return sortFunc(a, b);
      } else {
        return sortFunc(b, a);
      }
    });
    setCases([...sortedCases]);
  };

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      // Apply severity filter
      if (
        filters.severity.length > 0 &&
        !filters.severity.includes(c.severity)
      ) {
        return false;
      }

      // Apply status filter
      if (filters.status.length > 0 && !filters.status.includes(c.status)) {
        return false;
      }

      return true;
    });
  }, [cases, filters]);

  const fetchSupportCases = async () => {
    const token = await chrome.auth.getToken();
    const user = await chrome.auth.getUser();
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        createdBySSOName: `${user?.identity.user?.username}`,
      }),
    };

    try {
      const response = await fetch(getUrl(chrome.getEnvironment()), options);
      const { cases } = await response.json();
      setCases(cases || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Unable to fetch support cases', error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchSupportCases();
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonTable
          rows={3}
          columns={[
            intl.formatMessage(columnNames.caseId),
            intl.formatMessage(columnNames.issueSummary),
            intl.formatMessage(columnNames.modifiedBy),
            intl.formatMessage(columnNames.severity),
            intl.formatMessage(columnNames.status),
          ]}
        />
      ) : cases.length === 0 ? (
        <EmptyState
          icon={HeadsetIcon}
          titleText={
            <Title headingLevel="h4" size="lg">
              {intl.formatMessage(messages.noOpenCases)}
            </Title>
          }
          variant={EmptyStateVariant.lg}
        >
          <EmptyStateBody>
            <Stack>
              <StackItem>
                {intl.formatMessage(messages.noOpenCasesBody)}
              </StackItem>
            </Stack>
          </EmptyStateBody>
          <Button
            variant="link"
            icon={<ExternalLinkAltIcon />}
            iconPosition="end"
            href={SUPPORT_CASE_URL}
            onClick={() => {
              window.open(SUPPORT_CASE_URL, '_blank');
            }}
          >
            {intl.formatMessage(messages.openCase)}
          </Button>
        </EmptyState>
      ) : (
        <Table
          aria-label={intl.formatMessage(messages.tableAria)}
          variant={TableVariant.compact}
        >
          <Thead>
            <>
              <SupportCaseWidgetTableFilter
                filters={filters}
                onFiltersChange={setFilters}
              />
              <Tr>
                {columns.map((col, index) => (
                  <Th
                    key={index}
                    sort={{
                      sortBy,
                      onSort,
                      columnIndex: index,
                    }}
                  >
                    {col.name}
                  </Th>
                ))}
              </Tr>
            </>
          </Thead>
          <Tbody>
            {filteredCases.length === 0 ? (
              <Tr>
                <Td colSpan={columns.length}>
                  <EmptyState variant={EmptyStateVariant.sm}>
                    <EmptyStateBody>
                      {intl.formatMessage(messages.noMatch)}
                    </EmptyStateBody>
                  </EmptyState>
                </Td>
              </Tr>
            ) : (
              filteredCases?.slice(0, MAX_ROWS).map((c) => (
                <Tr key={c.id}>
                  <Td dataLabel={intl.formatMessage(columnNames.caseId)}>
                    <Button
                      className="pf-v6-u-pl-0"
                      variant="link"
                      icon={<ExternalLinkAltIcon />}
                      iconPosition="end"
                      component="a"
                      href={`https://access.redhat.com/support/cases/#/case/${c.caseNumber}`}
                    >
                      {c.caseNumber}
                    </Button>
                  </Td>
                  <Td dataLabel={intl.formatMessage(columnNames.issueSummary)}>
                    {c.summary}
                  </Td>
                  <Td dataLabel={intl.formatMessage(columnNames.modifiedBy)}>
                    {c.lastModifiedById}
                  </Td>
                  <Td dataLabel={intl.formatMessage(columnNames.severity)}>
                    {labelColor(c.severity)}
                  </Td>
                  <Td dataLabel={intl.formatMessage(columnNames.status)}>
                    {c.status}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default SupportCaseWidget;
