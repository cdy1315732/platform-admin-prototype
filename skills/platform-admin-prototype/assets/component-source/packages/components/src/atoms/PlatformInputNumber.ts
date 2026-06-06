import { InputNumber as ArcoInputNumber } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export type PlatformInputNumberMode = 'button' | 'embed';
export type PlatformInputNumberModelEvent = 'change' | 'input';

export const PlatformInputNumber = defineComponent({
  name: 'PlatformInputNumber',
  inheritAttrs: false,
  props: {
    modelValue: Number,
    defaultValue: Number,
    mode: {
      type: String as PropType<PlatformInputNumberMode>,
      default: 'embed'
    },
    precision: Number,
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    formatter: Function,
    parser: Function,
    placeholder: String,
    hideButton: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<PlatformSize | undefined>,
      default: undefined
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    modelEvent: {
      type: String as PropType<PlatformInputNumberModelEvent>,
      default: 'change'
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    inputAttrs: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    }
  },
  emits: {
    'update:modelValue': (_value: number | undefined) => true,
    change: (_value: number | undefined, _ev: Event) => true,
    input: (_value: number | undefined, _inputValue: string, _ev: Event) => true,
    clear: (_ev: Event) => true,
    focus: (_ev: FocusEvent) => true,
    blur: (_ev: FocusEvent) => true,
    keydown: (_ev: KeyboardEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoInputNumber as never,
        {
          ...platformAttrs(attrs, 'InputNumber', '1:24086', 'platform-input-number'),
          ...props,
          'onUpdate:modelValue': (value: number | undefined) => emit('update:modelValue', value),
          onChange: (value: number | undefined, ev: Event) => emit('change', value, ev),
          onInput: (value: number | undefined, inputValue: string, ev: Event) => emit('input', value, inputValue, ev),
          onClear: (ev: Event) => emit('clear', ev),
          onFocus: (ev: FocusEvent) => emit('focus', ev),
          onBlur: (ev: FocusEvent) => emit('blur', ev),
          onKeydown: (ev: KeyboardEvent) => emit('keydown', ev)
        },
        slots
      );
  }
});
