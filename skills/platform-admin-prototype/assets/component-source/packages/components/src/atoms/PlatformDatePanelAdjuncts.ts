import {
  DatePicker as ArcoDatePicker,
  MonthPicker as ArcoMonthPicker,
  QuarterPicker as ArcoQuarterPicker,
  RangePicker as ArcoRangePicker,
  WeekPicker as ArcoWeekPicker,
  YearPicker as ArcoYearPicker
} from '@arco-design/web-vue';
import { IconDoubleLeft, IconDoubleRight, IconLeft, IconRight } from '@arco-design/web-vue/es/icon';
import { defineComponent, h, type Component, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export type PlatformDatePanelValue = string | number | Date;
export type PlatformDatePanelModelValue = PlatformDatePanelValue | PlatformDatePanelValue[];
export type PlatformDatePickerKind = 'date' | 'month' | 'year' | 'quarter' | 'week';
export type PlatformDateShortcutPosition = 'left' | 'bottom' | 'right';
export type PlatformDatePopupPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';
export type PlatformDateHeaderDirection = 'super-prev' | 'prev' | 'next' | 'super-next';
export type PlatformPickerCellType = 'month' | 'year';

export interface PlatformDateShortcut {
  label: string | number;
  value: PlatformDatePanelModelValue | (() => PlatformDatePanelModelValue);
  format?: string;
}

const pickerByKind: Record<PlatformDatePickerKind, Component> = {
  date: ArcoDatePicker as unknown as Component,
  month: ArcoMonthPicker as unknown as Component,
  year: ArcoYearPicker as unknown as Component,
  quarter: ArcoQuarterPicker as unknown as Component,
  week: ArcoWeekPicker as unknown as Component
};

const headerIconByDirection: Record<PlatformDateHeaderDirection, Component> = {
  'super-prev': IconDoubleLeft as unknown as Component,
  prev: IconLeft as unknown as Component,
  next: IconRight as unknown as Component,
  'super-next': IconDoubleRight as unknown as Component
};

export const PlatformDatePickerDropdown = defineComponent({
  name: 'PlatformDatePickerDropdown',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Date, Array] as PropType<PlatformDatePanelModelValue>,
      default: undefined
    },
    defaultValue: {
      type: [String, Number, Date, Array] as PropType<PlatformDatePanelModelValue>,
      default: undefined
    },
    range: {
      type: Boolean,
      default: false
    },
    picker: {
      type: String as PropType<PlatformDatePickerKind>,
      default: 'date'
    },
    format: {
      type: String,
      default: undefined
    },
    valueFormat: {
      type: String,
      default: undefined
    },
    showTime: {
      type: Boolean,
      default: false
    },
    shortcuts: {
      type: Array as PropType<PlatformDateShortcut[]>,
      default: () => []
    },
    shortcutsPosition: {
      type: String as PropType<PlatformDateShortcutPosition>,
      default: 'bottom'
    },
    extraFooter: {
      type: String,
      default: ''
    },
    popupVisible: {
      type: Boolean,
      default: undefined
    },
    defaultPopupVisible: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: [String, Array] as PropType<string | string[]>,
      default: undefined
    },
    disabled: {
      type: [Boolean, Array] as PropType<boolean | boolean[]>,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    showNowBtn: {
      type: Boolean,
      default: true
    },
    size: {
      type: String as PropType<PlatformSize>,
      default: 'medium'
    },
    position: {
      type: String as PropType<PlatformDatePopupPosition>,
      default: 'bottom'
    }
  },
  emits: {
    'update:modelValue': (_value: PlatformDatePanelModelValue | undefined) => true,
    'update:popupVisible': (_visible: boolean) => true,
    change: (_value: unknown, _date?: unknown, _dateString?: unknown) => true,
    select: (_value: unknown, _date?: unknown, _dateString?: unknown) => true,
    popupVisibleChange: (_visible: boolean) => true,
    clear: () => true
  },
  setup(props, { attrs, emit, slots }) {
    return () => {
      const Picker = props.range ? (ArcoRangePicker as unknown as Component) : pickerByKind[props.picker];
      const pickerProps = {
        ...platformAttrs(attrs, 'datepicker-dropdown', '1:19116', 'platform-date-picker-dropdown'),
        modelValue: props.modelValue,
        defaultValue: props.defaultValue,
        mode: props.picker,
        format: props.format,
        valueFormat: props.valueFormat,
        showTime: props.showTime,
        shortcuts: props.shortcuts,
        shortcutsPosition: props.shortcutsPosition,
        popupVisible: props.popupVisible,
        defaultPopupVisible: props.defaultPopupVisible,
        placeholder: props.placeholder,
        disabled: props.disabled,
        allowClear: props.allowClear,
        showNowBtn: props.showNowBtn,
        size: props.size,
        position: props.position,
        'onUpdate:modelValue': (value: PlatformDatePanelModelValue | undefined) => emit('update:modelValue', value),
        'onUpdate:popupVisible': (visible: boolean) => emit('update:popupVisible', visible),
        onChange: (value: unknown, date?: unknown, dateString?: unknown) => emit('change', value, date, dateString),
        onSelect: (value: unknown, date?: unknown, dateString?: unknown) => emit('select', value, date, dateString),
        onPopupVisibleChange: (visible: boolean) => emit('popupVisibleChange', visible),
        onClear: () => emit('clear')
      };
      const extra = slots.extra ?? (props.extraFooter ? () => props.extraFooter : undefined);

      return h(Picker as never, pickerProps, {
        ...slots,
        ...(extra ? { extra } : {})
      });
    };
  }
});

export const PlatformDateHeaderIcon = defineComponent({
  name: 'PlatformDateHeaderIcon',
  inheritAttrs: false,
  props: {
    direction: {
      type: String as PropType<PlatformDateHeaderDirection>,
      default: 'prev'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  emits: {
    click: (_ev: MouseEvent) => true
  },
  setup(props, { attrs, emit }) {
    return () => {
      const Icon = headerIconByDirection[props.direction];

      return h(
        'button',
        {
          ...platformAttrs(attrs, '.header-icon', '1:18754', [
            'platform-date-header-icon',
            `platform-date-header-icon--${props.direction}`,
            props.disabled ? 'platform-date-header-icon--disabled' : ''
          ].join(' ')),
          type: 'button',
          disabled: props.disabled,
          title: props.label || props.direction,
          'aria-label': props.label || props.direction,
          onClick: (ev: MouseEvent) => emit('click', ev)
        },
        h(Icon as never)
      );
    };
  }
});

export const PlatformPickerCell = defineComponent({
  name: 'PlatformPickerCell',
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<PlatformPickerCellType>,
      default: 'month'
    },
    label: {
      type: [String, Number],
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    today: {
      type: Boolean,
      default: false
    },
    inView: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    select: (_value: string | number) => true
  },
  setup(props, { attrs, emit }) {
    return () =>
      h(
        'button',
        {
          ...platformAttrs(attrs, `picker-cell/${props.type}`, props.type === 'month' ? '1:18690' : '1:18735', [
            'platform-picker-cell',
            `platform-picker-cell--${props.type}`,
            props.selected ? 'platform-picker-cell--selected' : '',
            props.today ? 'platform-picker-cell--today' : '',
            props.inView ? '' : 'platform-picker-cell--outside-view',
            props.disabled ? 'platform-picker-cell--disabled' : ''
          ].join(' ')),
          type: 'button',
          disabled: props.disabled,
          onClick: () => emit('select', props.label)
        },
        h('span', { class: 'platform-picker-cell__inner' }, props.label)
      );
  }
});
