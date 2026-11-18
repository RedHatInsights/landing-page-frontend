/**
 * Response contract for the Red Hat Customer Portal support case filter
 * endpoint (`POST /support/v3/cases/filter`), consumed by SupportCaseWidget.
 *
 * This is the canonical definition. Mock handler factories in
 * `src/data/mocks/` are typed against it, so a drift between the mocks and
 * what the widget reads fails type checking rather than silently passing a
 * green story.
 */

export type Case = {
  id: string;
  caseNumber: string;
  summary: string;
  lastModifiedById: string;
  severity: string;
  status: string;
  productFamily: string;
};

export type SupportCaseFilterResponse = {
  cases: Case[];
};
