import React, { useEffect, useState } from 'react';
import {
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
import { EmptyStateIcon } from '@patternfly/react-core/dist/dynamic/components/EmptyState';
import { EmptyStateVariant } from '@patternfly/react-core/dist/dynamic/components/EmptyState';
import { Stack } from '@patternfly/react-core/dist/dynamic/layouts/Stack';
import { StackItem } from '@patternfly/react-core/dist/dynamic/layouts/Stack';
import { Title } from '@patternfly/react-core/dist/dynamic/components/Title';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/dynamic/icons/external-link-alt-icon';
import { Label } from '@patternfly/react-core/dist/dynamic/components/Label';

export type Case = {
  id: string;
  caseNumber: string;
  summary: string;
  lastModifiedById: string;
  severity: string;
  status: string;
  isLoading: boolean;
};

const HeadsetIcon: React.FunctionComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 512 512"
    fill="currentColor"
    className="pf-c-empty-state__icon"
  >
    <path d="M192 208c0-17.7-14.3-32-32-32h-16c-35.4 0-64 28.7-64 64v48c0 35.4 28.7 64 64 64h16c17.7 0 32-14.3 32-32V208zm176 144c35.4 0 64-28.7 64-64v-48c0-35.4-28.7-64-64-64h-16c-17.7 0-32 14.3-32 32v112c0 17.7 14.3 32 32 32h16zM256 0C113.2 0 4.6 118.8 0 256v16c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-16c0-114.7 93.3-208 208-208s208 93.3 208 208h-.1c.1 2.4 .1 165.7 .1 165.7 0 23.4-18.9 42.3-42.3 42.3H320c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48 48s21.5 48 48 48h181.7c49.9 0 90.3-40.4 90.3-90.3V256C507.4 118.8 398.8 0 256 0z" />
  </svg>
);

const SupportCaseWidget: React.FunctionComponent = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const MAX_ROWS = 5;

  const fetchSupportCases = async () => {
    // eslint-disable-next-line rulesdir/no-chrome-api-call-from-window
    const token = await window.insights.chrome.auth.getToken();
    const url = 'https://api.access.redhat.com/support/v1/cases/filter';
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    };

    try {
      const response = await fetch(url, options);
      const { cases } = await response.json();
      setCases(cases);
    } catch (error) {
      console.error('Unable to fetch support cases', error);
    }
  };

  useEffect(() => {
    fetchSupportCases();
  }, []);

  const labelColor = (severity: string) => {
    switch (severity) {
      case '1 (Urgent)':
        return <Label color="red">{severity}</Label>;
      case '2 (High)':
        return <Label color="orange">{severity}</Label>;
      case '3 (Normal)':
        return <Label color="blue">{severity}</Label>;
      case '4 (Low)':
        return <Label color="grey">{severity}</Label>;
      default:
    }
  };

  return (
    <>
      {cases?.length === 0 ? (
        <EmptyState variant={EmptyStateVariant.lg}>
          <EmptyStateIcon icon={HeadsetIcon} />
          <Title headingLevel="h4" size="lg">
            No open support cases
          </Title>
          <EmptyStateBody>
            <Stack>
              <StackItem>
                We can&apos;t find any active support cases opened by you.
              </StackItem>
            </Stack>
          </EmptyStateBody>
          <Button
            variant="link"
            icon={<ExternalLinkAltIcon />}
            iconPosition="end"
            href="https://access.redhat.com/support/cases/#/case/new/get-support?caseCreate=true"
          >
            Open a support case
          </Button>
        </EmptyState>
      ) : (
        <Table
          aria-label="Support case table widget"
          variant={TableVariant.compact}
        >
          <Thead>
            <Tr>
              <Th>Case ID</Th>
              <Th>Issue summary</Th>
              <Th>Modified by</Th>
              <Th>Severity</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cases?.slice(0, MAX_ROWS).map((c) => (
              <Tr key={c.id}>
                <Td dataLabel="Case ID">
                  <Button
                    className="pf-v5-u-pl-0"
                    variant="link"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    component="a"
                    href={`https://access.redhat.com/support/cases/#/case/${c.caseNumber}`}
                  >
                    {c.caseNumber}
                  </Button>
                </Td>
                <Td dataLabel="Issue Summary">{c.summary}</Td>
                <Td dataLabel="Modified by">{c.lastModifiedById}</Td>
                <Td dataLabel="Severity">{labelColor(c.severity)}</Td>
                <Td dataLabel="Status">{c.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default SupportCaseWidget;
