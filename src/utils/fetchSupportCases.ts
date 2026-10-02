import type { ChromeAPI } from '@redhat-cloud-services/types';

export interface SupportCase {
  id: string;
  caseNumber: string;
  summary: string;
  lastModifiedById: string;
  lastModifiedDate: string;
  severity: string;
  status: string;
}

type Value = { value: string | null } | null;
interface CaseNode {
  Id: string;
  CaseNumber__c: Value;
  Subject: Value;
  Status: Value;
  Priority: Value;
  LastModifiedDate: Value;
  LastModifiedBy: { Name: Value } | null;
}
interface CaseResponse {
  errors?: { message: string }[];
  data?: {
    redhat_support_uiapi?: {
      query?: {
        RedHatSupportCase?: {
          edges: { node: CaseNode }[];
          pageInfo: { hasNextPage: boolean; endCursor: string | null };
        };
      };
    };
  };
}

export const supportCasesQuery = `query ConsoleSupportCases(
  $after: String, $where: RedHatSupportCase_Filter
) {
  redhat_support_uiapi {
    query {
      RedHatSupportCase(first: 100, after: $after, where: $where,
        orderBy: {LastModifiedDate: {order: DESC}}) {
        edges { node {
          Id
          CaseNumber__c { value }
          Subject { value }
          Status { value }
          Priority { value }
          LastModifiedDate { value }
          LastModifiedBy { Name { value } }
        } }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
}`;

export function getSupportCasesUrl(environment: string) {
  // Preserve the existing stage/frhStage environment selection.
  return environment === 'stage' || environment === 'frhStage'
    ? 'https://graphql.stage.redhat.com'
    : 'https://graphql.redhat.com';
}

export async function fetchSupportCases(
  auth: ChromeAPI['auth'],
  environment: string,
  signal?: AbortSignal,
): Promise<SupportCase[]> {
  const user = await auth.getUser();
  const username = user?.identity.user?.username;
  if (!username) throw new Error('Support cases require a signed-in user');
  const cases: SupportCase[] = [];
  const cursors = new Set<string>();
  let after: string | null = null;
  // Fetch every page before applying local filters or showing a total count.
  do {
    signal?.throwIfAborted();
    const token = await auth.getToken();
    if (!token) throw new Error('Support cases require an access token');
    const response = await fetch(getSupportCasesUrl(environment), {
      method: 'POST',
      signal,
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'apollographql-client-name': 'landing-page-frontend',
        'apollographql-client-version': '0.0.1',
        'X-Chatter-Entity-Encoding': 'false',
      },
      body: JSON.stringify({
        query: supportCasesQuery,
        variables: {
          after,
          where: { CreatedBy: { FederationIdentifier: { eq: username } } },
        },
      }),
    });
    if (!response.ok)
      throw new Error(`Support cases request failed (${response.status})`);
    const payload: CaseResponse = await response.json();
    // A GraphQL failure can arrive with HTTP 200 and partial data.
    if (payload.errors?.length)
      throw new Error('Support cases GraphQL request failed');
    const connection =
      payload.data?.redhat_support_uiapi?.query?.RedHatSupportCase;
    if (
      !connection ||
      !Array.isArray(connection.edges) ||
      !connection.pageInfo
    ) {
      throw new Error('Invalid support cases response');
    }
    cases.push(
      ...connection.edges.map(({ node }) => ({
        id: node.Id,
        caseNumber: node.CaseNumber__c?.value ?? '',
        summary: node.Subject?.value ?? '',
        lastModifiedById: node.LastModifiedBy?.Name?.value ?? '',
        lastModifiedDate: node.LastModifiedDate?.value ?? '',
        severity: node.Priority?.value ?? '',
        status: node.Status?.value ?? '',
      })),
    );
    if (!connection.pageInfo.hasNextPage) return cases;
    after = connection.pageInfo.endCursor;
    if (!after || cursors.has(after))
      throw new Error('Invalid support cases pagination cursor');
    cursors.add(after);
  } while (after);
  return cases;
}
