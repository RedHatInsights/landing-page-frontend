import type { Case } from '../api/support-case.types';

/**
 * Seed data for support case stories. Play functions must reference these
 * constants rather than repeating literals — see AGENTS.md non-negotiable #6.
 */
export const DEFAULT_SUPPORT_CASES: Case[] = [
  {
    id: '1',
    caseNumber: '03926115',
    summary: 'Cannot access cluster',
    lastModifiedById: 'jdoe',
    severity: '2 (High)',
    status: 'Waiting on Customer',
    productFamily: 'OpenShift',
  },
  {
    id: '2',
    caseNumber: '03926189',
    summary: 'Node flapping in cluster',
    lastModifiedById: 'jdoe',
    severity: '1 (Urgent)',
    status: 'Waiting on Red Hat',
    productFamily: 'OpenShift',
  },
];
