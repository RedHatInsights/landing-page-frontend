import { HttpResponse, http } from 'msw';
import type {
  Case,
  SupportCaseFilterResponse,
} from '../api/support-case.types';
import { DEFAULT_SUPPORT_CASES } from './support-case.fixtures';

/**
 * MSW handler factories for the support case filter endpoint.
 *
 * `getUrl()` in SupportCaseWidgetConsts resolves to either
 * `api.access.redhat.com` or `api.access.stage.redhat.com` depending on the
 * Chrome environment, so the path is matched with a leading wildcard rather
 * than pinned to one host. Keeping the URL in exactly one place is the point
 * of the factory — stories never spell it out.
 */
const SUPPORT_CASE_FILTER_PATH = '*/support/v3/cases/filter';

/** Happy path. Defaults to the shared seed data. */
export const supportCaseHandlers = (cases: Case[] = DEFAULT_SUPPORT_CASES) => [
  http.post(SUPPORT_CASE_FILTER_PATH, () =>
    HttpResponse.json<SupportCaseFilterResponse>({ cases }),
  ),
];

/** Empty state — the widget renders its "No open support cases" empty state. */
export const supportCaseEmptyHandlers = () => supportCaseHandlers([]);

/** Failure state. The widget logs and leaves the table empty. */
export const supportCaseErrorHandlers = (status = 500) => [
  http.post(SUPPORT_CASE_FILTER_PATH, () => new HttpResponse(null, { status })),
];
