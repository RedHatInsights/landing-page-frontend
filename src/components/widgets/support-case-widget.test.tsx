import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SupportCaseWidget from './support-case-widget';
import { fetchSupportCases } from '../../utils/fetchSupportCases';
jest.mock('../../utils/fetchSupportCases');
jest.mock('@redhat-cloud-services/frontend-components/useChrome', () => ({
  __esModule: true,
  default: () => ({ auth: {}, getEnvironment: () => 'stage' }),
}));
const fetchCases = fetchSupportCases as jest.MockedFunction<
  typeof fetchSupportCases
>;
afterEach(() => jest.restoreAllMocks());
it('filters across all fetched cases before selecting the five visible rows', async () => {
  fetchCases.mockResolvedValue(
    Array.from({ length: 6 }, (_, i) => ({
      id: String(i),
      caseNumber: `000${i}`,
      summary: `Case title ${i}`,
      lastModifiedById: 'Editor',
      lastModifiedDate: '',
      severity: '3 (Medium)',
      status: i === 5 ? 'Waiting on Engineering' : 'Closed',
    })),
  );
  render(<SupportCaseWidget />);
  expect(await screen.findByText('Case title 0')).toBeInTheDocument();
  expect(screen.queryByText('Case title 5')).not.toBeInTheDocument();
  expect(screen.getAllByText('3 (Medium)').length).toBeGreaterThan(0);
  fireEvent.click(
    screen.getByRole('button', { name: 'Status', expanded: false }),
  );
  fireEvent.click(
    screen.getByRole('checkbox', { name: 'Waiting on Engineering' }),
  );
  expect(await screen.findByText('Case title 5')).toBeInTheDocument();
  expect(screen.queryByText('Case title 0')).not.toBeInTheDocument();
});
it('stops loading and shows an error if the request fails', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
  fetchCases.mockRejectedValue(new Error('GraphQL failed'));
  render(<SupportCaseWidget />);
  expect(
    await screen.findByText(
      'Unable to load support cases. Please try again later.',
    ),
  ).toBeInTheDocument();
});
