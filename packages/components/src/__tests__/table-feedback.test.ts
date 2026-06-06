import { describe, expect, it } from 'vitest';
import {
  PlatformPopover,
  PlatformProgress,
  PlatformResult,
  PlatformTableAvatarTextCell,
  PlatformTableCheckboxCell,
  PlatformTableExpandCell,
  PlatformTableHeaderCell,
  PlatformTableIconTextCell,
  PlatformTableLinkCell,
  PlatformTableStatusCell,
  PlatformTableSwitchCell,
  PlatformTableTagCell,
  PlatformTimeline,
  PlatformTooltip,
  PlatformUpload,
  tableCellComponents,
  feedbackComponents
} from '../index';

describe('official Arco table cells and feedback wrappers', () => {
  const propKeys = (component: unknown) => Object.keys((component as { props: Record<string, unknown> }).props);

  it('exports the third-batch table cell wrappers', () => {
    expect(PlatformTableHeaderCell.name).toBe('PlatformTableHeaderCell');
    expect(PlatformTableIconTextCell.name).toBe('PlatformTableIconTextCell');
    expect(PlatformTableAvatarTextCell.name).toBe('PlatformTableAvatarTextCell');
    expect(PlatformTableTagCell.name).toBe('PlatformTableTagCell');
    expect(PlatformTableStatusCell.name).toBe('PlatformTableStatusCell');
    expect(PlatformTableCheckboxCell.name).toBe('PlatformTableCheckboxCell');
    expect(PlatformTableExpandCell.name).toBe('PlatformTableExpandCell');
    expect(PlatformTableSwitchCell.name).toBe('PlatformTableSwitchCell');
    expect(PlatformTableLinkCell.name).toBe('PlatformTableLinkCell');
  });

  it('exports the third-batch feedback wrappers', () => {
    expect(PlatformTooltip.name).toBe('PlatformTooltip');
    expect(PlatformPopover.name).toBe('PlatformPopover');
    expect(PlatformProgress.name).toBe('PlatformProgress');
    expect(PlatformResult.name).toBe('PlatformResult');
    expect(PlatformTimeline.name).toBe('PlatformTimeline');
    expect(PlatformUpload.name).toBe('PlatformUpload');
  });

  it('declares table-cell metadata in Figma registry order', () => {
    expect(tableCellComponents.map((item) => item.name)).toEqual([
      'components/table-cell/header',
      'components/table-cell/text+icon',
      'components/table-cell/avatar+text',
      'components/table-cell/tag',
      'components/table-cell/status',
      'components/table-cell/checkbox',
      'components/table-cell/expand icon',
      'components/table-cell/switch',
      'components/table-cell/link'
    ]);
    expect(tableCellComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('declares feedback metadata in Figma registry order', () => {
    expect(feedbackComponents.map((item) => item.name)).toEqual([
      'Tooltip',
      'popover',
      'progress-line',
      'Result',
      'timeline',
      'upload'
    ]);
    expect(feedbackComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('keeps table cells aligned with official Arco building blocks', () => {
    expect(propKeys(PlatformTableHeaderCell)).toEqual(
      expect.arrayContaining(['label', 'sortable', 'sortOrder', 'filterable', 'searchable', 'active'])
    );
    expect(propKeys(PlatformTableIconTextCell)).toEqual(expect.arrayContaining(['text', 'secondary', 'iconPosition', 'ellipsis']));
    expect(propKeys(PlatformTableAvatarTextCell)).toEqual(expect.arrayContaining(['text', 'secondary', 'avatarText', 'imageUrl', 'shape', 'size']));
    expect(propKeys(PlatformTableTagCell)).toEqual(expect.arrayContaining(['label', 'color', 'size', 'bordered']));
    expect(propKeys(PlatformTableStatusCell)).toEqual(expect.arrayContaining(['label', 'status', 'count', 'dot']));
    expect(propKeys(PlatformTableCheckboxCell)).toEqual(expect.arrayContaining(['modelValue', 'disabled', 'indeterminate']));
    expect(propKeys(PlatformTableExpandCell)).toEqual(expect.arrayContaining(['expanded', 'expandable', 'disabled']));
    expect(propKeys(PlatformTableSwitchCell)).toEqual(expect.arrayContaining(['modelValue', 'disabled', 'loading', 'checkedValue', 'uncheckedValue']));
    expect(propKeys(PlatformTableLinkCell)).toEqual(expect.arrayContaining(['label', 'href', 'status', 'hoverable', 'icon', 'loading', 'disabled']));
  });

  it('keeps feedback wrappers aligned with official Arco interaction props', () => {
    expect(propKeys(PlatformTooltip)).toEqual(
      expect.arrayContaining(['popupVisible', 'defaultPopupVisible', 'disabled', 'content', 'position', 'mini', 'backgroundColor', 'popupContainer'])
    );
    expect(propKeys(PlatformPopover)).toEqual(
      expect.arrayContaining(['popupVisible', 'defaultPopupVisible', 'title', 'content', 'trigger', 'position', 'popupContainer'])
    );
    expect(propKeys(PlatformProgress)).toEqual(
      expect.arrayContaining(['type', 'size', 'percent', 'steps', 'animation', 'strokeWidth', 'width', 'color', 'trackColor', 'showText', 'status'])
    );
    expect(propKeys(PlatformResult)).toEqual(expect.arrayContaining(['status', 'title', 'subtitle']));
    expect(propKeys(PlatformTimeline)).toEqual(expect.arrayContaining(['items', 'reverse', 'direction', 'mode', 'pending', 'labelPosition']));
    expect(propKeys(PlatformUpload)).toEqual(
      expect.arrayContaining(['fileList', 'defaultFileList', 'accept', 'action', 'disabled', 'multiple', 'draggable', 'tip', 'limit', 'autoUpload', 'listType'])
    );
  });
});
