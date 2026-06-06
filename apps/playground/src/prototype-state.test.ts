import { describe, expect, it } from 'vitest';
import {
  applyTicketFilters,
  getTicketMetrics,
  sortTicketRows,
  statusToTagStatus
} from './prototype-state';
import { ticketRows } from './prototype-state';

describe('interactive ticket prototype state', () => {
  it('filters ticket rows by keyword status priority category and assignee', () => {
    const rows = applyTicketFilters(ticketRows, {
      keyword: '网络',
      status: 'unassigned',
      priority: 'medium',
      category: '网络服务',
      assignee: ''
    });

    expect(rows.map((row) => row.ticketNo)).toEqual(['SR-1007']);
  });

  it('sorts ticket rows by creation time', () => {
    expect(sortTicketRows(ticketRows, 'descend')[0]?.ticketNo).toBe('SR-1008');
    expect(sortTicketRows(ticketRows, 'ascend')[0]?.ticketNo).toBe('SR-1001');
  });

  it('derives dashboard metrics from current rows', () => {
    expect(getTicketMetrics(ticketRows)).toEqual({
      total: 8,
      unassigned: 2,
      processing: 2,
      closed: 2,
      timeout: 1
    });
  });

  it('maps business status to platform status tag values', () => {
    expect(statusToTagStatus('closed')).toBe('success');
    expect(statusToTagStatus('processing')).toBe('processing');
    expect(statusToTagStatus('timeout')).toBe('danger');
  });
});
