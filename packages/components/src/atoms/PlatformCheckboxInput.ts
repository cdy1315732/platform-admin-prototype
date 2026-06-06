import { Checkbox as ArcoCheckbox } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

export type PlatformCheckboxInputValue = string | number | boolean;
export type PlatformCheckboxInputModelValue = boolean | PlatformCheckboxInputValue[];

export const PlatformCheckboxInput = defineComponent({
  name: 'PlatformCheckboxInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Boolean, Array] as PropType<PlatformCheckboxInputModelValue>,
      default: undefined
    },
    defaultChecked: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean] as PropType<PlatformCheckboxInputValue>,
      default: true
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_value: PlatformCheckboxInputModelValue) => true,
    change: (_value: PlatformCheckboxInputModelValue, _ev: Event) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoCheckbox as never,
        {
          ...platformAttrs(attrs, '.checkbox-input', '1:18576', 'platform-checkbox-input'),
          modelValue: props.modelValue,
          defaultChecked: props.defaultChecked,
          value: props.value,
          indeterminate: props.indeterminate,
          disabled: props.disabled,
          'onUpdate:modelValue': (value: PlatformCheckboxInputModelValue) => emit('update:modelValue', value),
          onChange: (value: PlatformCheckboxInputModelValue, ev: Event) => emit('change', value, ev)
        },
        slots
      );
  }
});
