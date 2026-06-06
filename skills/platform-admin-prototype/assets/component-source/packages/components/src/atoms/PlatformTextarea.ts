import { Textarea as ArcoTextarea } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

type MaxLengthConfig = number | { length: number; errorOnly?: boolean };
type AutoSizeConfig = boolean | { minRows?: number; maxRows?: number };

export const PlatformTextarea = defineComponent({
  name: 'PlatformTextarea',
  inheritAttrs: false,
  props: {
    modelValue: String,
    defaultValue: {
      type: String,
      default: ''
    },
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: [Number, Object] as PropType<MaxLengthConfig>,
      default: 0
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    autoSize: {
      type: [Boolean, Object] as PropType<AutoSizeConfig>,
      default: false
    },
    wordLength: {
      type: Function as PropType<(value: string) => number>,
      default: undefined
    },
    wordSlice: {
      type: Function as PropType<(value: string, maxLength: number) => string>,
      default: undefined
    },
    textareaAttrs: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    }
  },
  emits: {
    'update:modelValue': (_value: string) => true,
    input: (_value: string, _ev: Event) => true,
    change: (_value: string, _ev: Event) => true,
    clear: (_ev: MouseEvent) => true,
    focus: (_ev: FocusEvent) => true,
    blur: (_ev: FocusEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoTextarea as never,
        {
          ...platformAttrs(attrs, 'textarea', '1:23450', 'platform-textarea'),
          ...props,
          'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
          onInput: (value: string, ev: Event) => emit('input', value, ev),
          onChange: (value: string, ev: Event) => emit('change', value, ev),
          onClear: (ev: MouseEvent) => emit('clear', ev),
          onFocus: (ev: FocusEvent) => emit('focus', ev),
          onBlur: (ev: FocusEvent) => emit('blur', ev)
        },
        slots
      );
  }
});
