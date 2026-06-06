import { TimePicker as ArcoTimePicker } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export type PlatformTimeValue = string | number | Date;
export type PlatformTimeModelValue = PlatformTimeValue | PlatformTimeValue[] | undefined;
export type PlatformTimePickerType = 'time' | 'time-range';
export type PlatformTimePickerPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';

type PopupContainer = string | HTMLElement;

export const PlatformTimePicker = defineComponent({
  name: 'PlatformTimePicker',
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<PlatformTimePickerType>,
      default: 'time'
    },
    modelValue: {
      type: [String, Number, Object, Array] as PropType<PlatformTimeModelValue>,
      default: undefined
    },
    defaultValue: {
      type: [String, Number, Object, Array] as PropType<PlatformTimeModelValue>,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    placeholder: {
      type: [String, Array] as PropType<string | string[]>,
      default: undefined
    },
    size: {
      type: String as PropType<PlatformSize | undefined>,
      default: undefined
    },
    popupContainer: {
      type: [String, Object] as PropType<PopupContainer>,
      default: undefined
    },
    use12Hours: {
      type: Boolean,
      default: false
    },
    step: {
      type: Object as PropType<{ hour?: number; minute?: number; second?: number }>,
      default: undefined
    },
    disabledHours: {
      type: Function as PropType<() => number[]>,
      default: undefined
    },
    disabledMinutes: {
      type: Function as PropType<(selectedHour?: number) => number[]>,
      default: undefined
    },
    disabledSeconds: {
      type: Function as PropType<(selectedHour?: number, selectedMinute?: number) => number[]>,
      default: undefined
    },
    hideDisabledOptions: {
      type: Boolean,
      default: false
    },
    disableConfirm: {
      type: Boolean,
      default: false
    },
    position: {
      type: String as PropType<PlatformTimePickerPosition>,
      default: 'bl'
    },
    popupVisible: {
      type: Boolean,
      default: undefined
    },
    defaultPopupVisible: {
      type: Boolean,
      default: false
    },
    triggerProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    unmountOnClose: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_value: string | Array<string | undefined> | undefined) => true,
    'update:popupVisible': (_visible: boolean) => true,
    change: (_timeString: string | Array<string | undefined> | undefined, _time?: Date | Array<Date | undefined>) => true,
    select: (_timeString: string | Array<string | undefined>, _time?: Date | Array<Date | undefined>) => true,
    clear: () => true,
    popupVisibleChange: (_visible: boolean) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoTimePicker as never,
        {
          ...platformAttrs(attrs, 'timepicker', '1:24418', 'platform-time-picker'),
          type: props.type,
          modelValue: props.modelValue,
          defaultValue: props.defaultValue,
          disabled: props.disabled,
          allowClear: props.allowClear,
          readonly: props.readonly,
          error: props.error,
          format: props.format,
          placeholder: props.placeholder,
          size: props.size,
          popupContainer: props.popupContainer,
          use12Hours: props.use12Hours,
          step: props.step,
          disabledHours: props.disabledHours,
          disabledMinutes: props.disabledMinutes,
          disabledSeconds: props.disabledSeconds,
          hideDisabledOptions: props.hideDisabledOptions,
          disableConfirm: props.disableConfirm,
          position: props.position,
          popupVisible: props.popupVisible,
          defaultPopupVisible: props.defaultPopupVisible,
          triggerProps: props.triggerProps,
          unmountOnClose: props.unmountOnClose,
          'onUpdate:modelValue': (value: string | Array<string | undefined> | undefined) => emit('update:modelValue', value),
          'onUpdate:popupVisible': (visible: boolean) => emit('update:popupVisible', visible),
          onChange: (timeString: string | Array<string | undefined> | undefined, time?: Date | Array<Date | undefined>) =>
            emit('change', timeString, time),
          onSelect: (timeString: string | Array<string | undefined>, time?: Date | Array<Date | undefined>) => emit('select', timeString, time),
          onClear: () => emit('clear'),
          onPopupVisibleChange: (visible: boolean) => emit('popupVisibleChange', visible),
          'onPopup-visible-change': (visible: boolean) => emit('popupVisibleChange', visible)
        },
        slots
      );
  }
});
