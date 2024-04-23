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
import HeadsetIcon from '@patternfly/react-icons/dist/dynamic/icons/headset-icon';
import useCurrentUser from '../useCurrentUser';

export type Case = {
  id: string;
  caseNumber: string;
  summary: string;
  lastModifiedById: string;
  severity: string;
  status: string;
  isLoading: boolean;
};

const SupportCaseWidget: React.FunctionComponent = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const MAX_ROWS = 5;
  const { currentUser } = useCurrentUser();

  const fetchSupportCases = async () => {
    // eslint-disable-next-line rulesdir/no-chrome-api-call-from-window
    const token = await window.insights.chrome.auth.getToken();
    const url = 'https://api.access.stage.redhat.com/support/v1/cases/filter';
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        createdBySSOName: `${currentUser?.username}`,
      }),
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
      {cases.length === 0 ? (
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
