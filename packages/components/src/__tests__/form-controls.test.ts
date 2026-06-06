import { describe, expect, it } from 'vitest';
import {
  PlatformCascader,
  PlatformCheckbox,
  PlatformDatePicker,
  PlatformInputNumber,
  PlatformInputTag,
  PlatformPassword,
  PlatformRadio,
  PlatformSwitch,
  PlatformTextarea,
  PlatformTimePicker,
  PlatformTreeSelect,
  formControlComponents
} from '../index';

describe('official Arco form controls', () => {
  const propKeys = (component: unknown) => Object.keys((component as { props: Record<string, unknown> }).props);

  it('exports the second-batch form control wrappers', () => {
    expect(PlatformDatePicker.name).toBe('PlatformDatePicker');
    expect(PlatformTimePicker.name).toBe('PlatformTimePicker');
    expect(PlatformInputNumber.name).toBe('PlatformInputNumber');
    expect(PlatformTextarea.name).toBe('PlatformTextarea');
    expect(PlatformCheckbox.name).toBe('PlatformCheckbox');
    expect(PlatformRadio.name).toBe('PlatformRadio');
    expect(PlatformSwitch.name).toBe('PlatformSwitch');
    expect(PlatformInputTag.name).toBe('PlatformInputTag');
    expect(PlatformCascader.name).toBe('PlatformCascader');
    expect(PlatformTreeSelect.name).toBe('PlatformTreeSelect');
    expect(PlatformPassword.name).toBe('PlatformPassword');
  });

  it('declares second-batch metadata in Figma registry order', () => {
    expect(formControlComponents.map((item) => item.name)).toEqual([
      'datepicker',
      'timepicker',
      'InputNumber',
      'textarea',
      'checkbox',
      'components/radio',
      'switch',
      'inputtag',
      'cascader',
      'treeselect',
      'password'
    ]);
    expect(formControlComponents.every((item) => item.status === 'implemented')).toBe(true);
  });

  it('keeps date and time pickers aligned with official Arco interaction props', () => {
    expect(propKeys(PlatformDatePicker)).toEqual(
      expect.arrayContaining([
        'modelValue',
        'defaultValue',
        'format',
        'dayStartOfWeek',
        'showTime',
        'timePickerProps',
        'disabled',
        'disabledDate',
        'disabledTime',
        'showNowBtn',
        'allowClear',
        'placeholder',
        'popupContainer',
        'range'
      ])
    );
    expect(propKeys(PlatformTimePicker)).toEqual(
      expect.arrayContaining([
        'type',
        'modelValue',
        'defaultValue',
        'disabled',
        'allowClear',
        'readonly',
        'error',
        'format',
        'placeholder',
        'size',
        'popupContainer',
        'use12Hours',
        'step',
        'popupVisible',
        'defaultPopupVisible',
        'unmountOnClose'
      ])
    );
  });

  it('keeps text and choice controls aligned with official Arco interaction props', () => {
    expect(propKeys(PlatformInputNumber)).toEqual(
      expect.arrayContaining(['modelValue', 'defaultValue', 'mode', 'precision', 'step', 'disabled', 'error', 'max', 'min', 'placeholder', 'hideButton', 'size', 'allowClear'])
    );
    expect(propKeys(PlatformTextarea)).toEqual(
      expect.arrayContaining(['modelValue', 'defaultValue', 'placeholder', 'disabled', 'error', 'maxLength', 'showWordLimit', 'allowClear', 'autoSize'])
    );
    expect(propKeys(PlatformCheckbox)).toEqual(expect.arrayContaining(['modelValue', 'defaultChecked', 'value', 'disabled', 'indeterminate']));
    expect(propKeys(PlatformRadio)).toEqual(expect.arrayContaining(['modelValue', 'defaultChecked', 'value', 'type', 'disabled']));
    expect(propKeys(PlatformSwitch)).toEqual(
      expect.arrayContaining(['modelValue', 'defaultChecked', 'disabled', 'loading', 'type', 'size', 'checkedValue', 'uncheckedValue', 'beforeChange'])
    );
    expect(propKeys(PlatformPassword)).toEqual(expect.arrayContaining(['modelValue', 'defaultValue', 'visibility', 'defaultVisibility', 'invisibleButton', 'allowClear', 'placeholder']));
  });

  it('keeps selection controls aligned with official Arco interaction props', () => {
    expect(propKeys(PlatformInputTag)).toEqual(
      expect.arrayContaining(['modelValue', 'defaultValue', 'inputValue', 'defaultInputValue', 'placeholder', 'disabled', 'error', 'readonly', 'allowClear', 'maxTagCount'])
    );
    expect(propKeys(PlatformCascader)).toEqual(
      expect.arrayContaining(['pathMode', 'multiple', 'modelValue', 'defaultValue', 'options', 'disabled', 'error', 'size', 'allowSearch', 'allowClear', 'popupVisible'])
    );
    expect(propKeys(PlatformTreeSelect)).toEqual(
      expect.arrayContaining(['modelValue', 'defaultValue', 'data', 'disabled', 'loading', 'error', 'size', 'allowSearch', 'allowClear', 'multiple', 'treeCheckable', 'popupVisible'])
    );
  });
});
