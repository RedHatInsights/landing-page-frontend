import { fetchSupportCases, getSupportCasesUrl } from './fetchSupportCases';
import type { ChromeAPI } from '@redhat-cloud-services/types';

const getUser = jest.fn();
const getToken = jest.fn();
const auth = { getUser, getToken } as unknown as ChromeAPI['auth'];
const mockFetch = jest.fn();
const originalFetch = global.fetch;
const node = {
  Id: 'record-id',
  CaseNumber__c: { value: '00012345' },
  Subject: { value: 'R&D case' },
  Status: { value: 'Waiting on Engineering' },
  Priority: { value: '3 (Medium)' },
  LastModifiedDate: { value: '2026-10-01T00:00:00Z' },
  LastModifiedBy: { Name: { value: 'Case editor' } },
};
const page = (
  nodes = [node],
  hasNextPage = false,
  endCursor: string | null = null,
) => ({
  ok: true,
  status: 200,
  json: async () => ({
    data: {
      redhat_support_uiapi: {
        query: {
          RedHatSupportCase: {
            edges: nodes.map((node) => ({ node })),
            pageInfo: { hasNextPage, endCursor },
          },
        },
      },
    },
  }),
});
beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = mockFetch;
  getUser.mockResolvedValue({ identity: { user: { username: 'test-user' } } });
  getToken.mockResolvedValue('test-token');
});
afterAll(() => {
  global.fetch = originalFetch;
});

it('fetches all cursor pages and preserves raw field values and leading zeroes', async () => {
  mockFetch
    .mockResolvedValueOnce(page([node], true, 'next'))
    .mockResolvedValueOnce(page([{ ...node, Id: 'second' }]));
  const cases = await fetchSupportCases(auth, 'stage');
  expect(cases).toHaveLength(2);
  expect(cases[0]).toEqual({
    id: 'record-id',
    caseNumber: '00012345',
    summary: 'R&D case',
    status: 'Waiting on Engineering',
    severity: '3 (Medium)',
    lastModifiedById: 'Case editor',
    lastModifiedDate: '2026-10-01T00:00:00Z',
  });
  const [url, request] = mockFetch.mock.calls[0];
  expect(url).toBe('https://graphql.stage.redhat.com');
  expect(request.headers.Authorization).toBe('Bearer test-token');
  expect(request.credentials).toBe('omit');
  expect(JSON.parse(request.body).variables).toEqual({
    after: null,
    where: { CreatedBy: { FederationIdentifier: { eq: 'test-user' } } },
  });
  expect(JSON.parse(mockFetch.mock.calls[1][1].body).variables.after).toBe(
    'next',
  );
});
it('treats GraphQL errors with HTTP 200 as failures, even with partial data', async () => {
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({
      ...(await page().json()),
      errors: [{ message: 'Missing CRM contact' }],
    }),
  });
  await expect(fetchSupportCases(auth, 'stage')).rejects.toThrow('GraphQL');
});
it('rejects HTTP failures', async () => {
  mockFetch.mockResolvedValue({ ok: false, status: 403 });
  await expect(fetchSupportCases(auth, 'stage')).rejects.toThrow('403');
});
it('distinguishes empty cases from malformed responses', async () => {
  mockFetch.mockResolvedValueOnce(page([]));
  await expect(fetchSupportCases(auth, 'stage')).resolves.toEqual([]);
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: null }),
  });
  await expect(fetchSupportCases(auth, 'stage')).rejects.toThrow('Invalid');
});
it('does not send an unscoped request without a username', async () => {
  getUser.mockResolvedValue(undefined);
  await expect(fetchSupportCases(auth, 'stage')).rejects.toThrow('signed-in');
  expect(mockFetch).not.toHaveBeenCalled();
});
it('does not request cases without a token', async () => {
  getToken.mockResolvedValue(undefined);
  await expect(fetchSupportCases(auth, 'stage')).rejects.toThrow(
    'access token',
  );
  expect(mockFetch).not.toHaveBeenCalled();
});
it('rejects repeated pagination cursors rather than looping', async () => {
  mockFetch.mockResolvedValue(page([node], true, 'same'));
  await expect(fetchSupportCases(auth, 'stage')).rejects.toThrow('pagination');
  expect(mockFetch).toHaveBeenCalledTimes(2);
});
it('preserves environment selection', () => {
  expect(getSupportCasesUrl('frhStage')).toBe(
    'https://graphql.stage.redhat.com',
  );
  expect(getSupportCasesUrl('prod')).toBe('https://graphql.redhat.com');
});
