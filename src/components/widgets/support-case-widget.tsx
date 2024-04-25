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
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import SkeletonTable from '@patternfly/react-component-groups/dist/dynamic/SkeletonTable';

export type Case = {
  id: string;
  caseNumber: string;
  summary: string;
  lastModifiedById: string;
  severity: string;
  status: string;
};

const SupportCaseWidget: React.FunctionComponent = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const MAX_ROWS = 5;
  const chrome = useChrome();
  const [isLoading, setIsLoading] = useState(false);
  const url = 'https://api.access.stage.redhat.com/support/v1/cases/filter';

  const columnNames = {
    caseId: 'Case ID',
    issueSummary: 'Issue summary',
    modifiedBy: 'Modified by',
    severity: 'Severity',
    status: 'Status',
  };

  const labelColor = (severity: string) => {
    const severityMapper: Record<string, JSX.Element> = {
      '1 (Urgent)': <Label color="red">{severity}</Label>,
      '2 (High)': <Label color="orange">{severity}</Label>,
      '3 (Normal)': <Label color="blue">{severity}</Label>,
      '4 (Low)': <Label color="grey">{severity}</Label>,
    };
    return severityMapper[severity] ?? '';
  };

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
      const response = await fetch(url, options);
      const { cases } = await response.json();
      setCases(cases);
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
            columnNames.caseId,
            columnNames.issueSummary,
            columnNames.modifiedBy,
            columnNames.severity,
            columnNames.status,
          ]}
        />
      ) : cases.length === 0 ? (
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
              <Th>{columnNames.caseId}</Th>
              <Th>{columnNames.issueSummary}</Th>
              <Th>{columnNames.modifiedBy}</Th>
              <Th>{columnNames.severity}</Th>
              <Th>{columnNames.status}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cases?.slice(0, MAX_ROWS).map((c) => (
              <Tr key={c.id}>
                <Td dataLabel={columnNames.caseId}>
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
                <Td dataLabel={columnNames.issueSummary}>{c.summary}</Td>
                <Td dataLabel={columnNames.modifiedBy}>{c.lastModifiedById}</Td>
                <Td dataLabel={columnNames.severity}>
                  {labelColor(c.severity)}
                </Td>
                <Td dataLabel={columnNames.status}>{c.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default SupportCaseWidget;
