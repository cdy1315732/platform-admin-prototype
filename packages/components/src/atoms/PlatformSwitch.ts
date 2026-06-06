import { Switch as ArcoSwitch } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export type PlatformSwitchValue = string | number | boolean;
export type PlatformSwitchType = 'circle' | 'round' | 'line';

export const PlatformSwitch = defineComponent({
  name: 'PlatformSwitch',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<PlatformSwitchValue | undefined>,
      default: undefined
    },
    defaultChecked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<PlatformSwitchType>,
      default: 'circle'
    },
    size: {
      type: String as PropType<PlatformSize | undefined>,
      default: undefined
    },
    checkedValue: {
      type: [String, Number, Boolean] as PropType<PlatformSwitchValue>,
      default: true
    },
    uncheckedValue: {
      type: [String, Number, Boolean] as PropType<PlatformSwitchValue>,
      default: false
    },
    checkedColor: String,
    uncheckedColor: String,
    beforeChange: {
      type: Function as PropType<(value: PlatformSwitchValue) => boolean | Promise<boolean>>,
      default: undefined
    },
    checkedText: String,
    uncheckedText: String
  },
  emits: {
    'update:modelValue': (_value: PlatformSwitchValue) => true,
    change: (_value: PlatformSwitchValue, _ev: Event) => true,
    focus: (_ev: FocusEvent) => true,
    blur: (_ev: FocusEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoSwitch as never,
        {
          ...platformAttrs(attrs, 'switch', '1:24392', 'platform-switch'),
          ...props,
          'onUpdate:modelValue': (value: PlatformSwitchValue) => emit('update:modelValue', value),
          onChange: (value: PlatformSwitchValue, ev: Event) => emit('change', value, ev),
          onFocus: (ev: FocusEvent) => emit('focus', ev),
          onBlur: (ev: FocusEvent) => emit('blur', ev)
        },
        slots
      );
  }
});
