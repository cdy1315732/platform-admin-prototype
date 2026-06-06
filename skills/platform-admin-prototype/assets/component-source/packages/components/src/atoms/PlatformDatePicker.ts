import { DatePicker as ArcoDatePicker, RangePicker as ArcoRangePicker } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export type PlatformDateValue = string | number | Date;
export type PlatformDateModelValue = PlatformDateValue | PlatformDateValue[] | undefined;

type PopupContainer = string | HTMLElement;
type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const PlatformDatePicker = defineComponent({
  name: 'PlatformDatePicker',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Object, String, Number, Array] as PropType<PlatformDateModelValue>,
      default: undefined
    },
    defaultValue: {
      type: [Object, String, Number, Array] as PropType<PlatformDateModelValue>,
      default: undefined
    },
    format: {
      type: [String, Function] as PropType<string | ((current: Date) => string)>,
      default: undefined
    },
    dayStartOfWeek: {
      type: Number as PropType<WeekStart>,
      default: 0
    },
    showTime: {
      type: Boolean,
      default: false
    },
    timePickerProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledDate: {
      type: Function as PropType<(current?: Date) => boolean>,
      default: undefined
    },
    disabledTime: {
      type: Function as PropType<(current: Date) => Record<string, unknown>>,
      default: undefined
    },
    showNowBtn: {
      type: Boolean,
      default: true
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: [String, Array] as PropType<string | string[]>,
      default: undefined
    },
    popupContainer: {
      type: [String, Object] as PropType<PopupContainer>,
      default: undefined
    },
    size: {
      type: String as PropType<PlatformSize | undefined>,
      default: undefined
    },
    error: {
      type: Boolean,
      default: false
    },
    range: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_value: PlatformDateModelValue) => true,
    change: (_value: PlatformDateModelValue, _date?: Date | Date[]) => true,
    select: (_value: PlatformDateModelValue, _date?: Date | Date[]) => true,
    clear: () => true
  },
  setup(props, { attrs, emit, slots }) {
    return () => {
      const Component = props.range ? ArcoRangePicker : ArcoDatePicker;

      return h(
        Component as never,
        {
          ...platformAttrs(attrs, 'datepicker', '1:18803', 'platform-date-picker'),
          modelValue: props.modelValue,
          defaultValue: props.defaultValue,
          format: props.format,
          dayStartOfWeek: props.dayStartOfWeek,
          showTime: props.showTime,
          timePickerProps: props.timePickerProps,
          disabled: props.disabled,
          disabledDate: props.disabledDate,
          disabledTime: props.disabledTime,
          showNowBtn: props.showNowBtn,
          allowClear: props.allowClear,
          placeholder: props.placeholder,
          popupContainer: props.popupContainer,
          size: props.size,
          error: props.error,
          'onUpdate:modelValue': (value: PlatformDateModelValue) => emit('update:modelValue', value),
          onChange: (value: PlatformDateModelValue, date?: Date | Date[]) => emit('change', value, date),
          onSelect: (value: PlatformDateModelValue, date?: Date | Date[]) => emit('select', value, date),
          onClear: () => emit('clear')
        },
        slots
      );
    };
  }
});
