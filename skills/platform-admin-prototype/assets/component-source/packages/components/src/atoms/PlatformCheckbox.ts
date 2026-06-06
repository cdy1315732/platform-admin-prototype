import { Checkbox as ArcoCheckbox } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

export type PlatformCheckboxValue = string | number | boolean;
export type PlatformCheckboxModelValue = boolean | PlatformCheckboxValue[] | undefined;

export const PlatformCheckbox = defineComponent({
  name: 'PlatformCheckbox',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Boolean, Array] as PropType<PlatformCheckboxModelValue>,
      default: undefined
    },
    defaultChecked: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean] as PropType<PlatformCheckboxValue>,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    uninjectGroupContext: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_value: PlatformCheckboxModelValue) => true,
    change: (_value: PlatformCheckboxModelValue, _ev: Event) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoCheckbox as never,
        {
          ...platformAttrs(attrs, 'checkbox', '1:18604', 'platform-checkbox'),
          ...props,
          'onUpdate:modelValue': (value: PlatformCheckboxModelValue) => emit('update:modelValue', value),
          onChange: (value: PlatformCheckboxModelValue, ev: Event) => emit('change', value, ev)
        },
        slots
      );
  }
});
