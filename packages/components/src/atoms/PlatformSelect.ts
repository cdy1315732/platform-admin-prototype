import { Select as ArcoSelect } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export type PlatformSelectValue = string | number | boolean | Record<string, unknown>;

export interface PlatformSelectOption {
  label: string;
  value: PlatformSelectValue;
  disabled?: boolean;
}

type PlatformSelectModelValue = PlatformSelectValue | PlatformSelectValue[] | undefined;

export const PlatformSelect = defineComponent({
  name: 'PlatformSelect',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean, Object, Array] as PropType<PlatformSelectModelValue>,
      default: undefined
    },
    options: {
      type: Array as PropType<PlatformSelectOption[]>,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    size: {
      type: String as PropType<PlatformSize>,
      default: 'medium'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    allowSearch: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_value: PlatformSelectModelValue) => true,
    change: (_value: PlatformSelectModelValue) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoSelect as never,
        {
          ...platformAttrs(attrs, 'select', '1:24197', 'platform-select'),
          modelValue: props.modelValue,
          options: props.options,
          placeholder: props.placeholder,
          size: props.size,
          multiple: props.multiple,
          allowClear: props.allowClear,
          allowSearch: props.allowSearch,
          disabled: props.disabled,
          error: props.error,
          'onUpdate:modelValue': (value: PlatformSelectModelValue) => emit('update:modelValue', value),
          onChange: (value: PlatformSelectModelValue) => emit('change', value)
        },
        slots
      );
  }
});
