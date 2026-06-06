import { Input as ArcoInput } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

type PlatformInputStatus = 'default' | 'error';

export const createInputModelBindings = (modelValue: string | undefined): { modelValue?: string } => {
  if (modelValue === undefined) {
    return {};
  }

  return { modelValue };
};

export const PlatformInput = defineComponent({
  name: 'PlatformInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: ''
    },
    size: {
      type: String as PropType<PlatformSize>,
      default: 'medium'
    },
    status: {
      type: String as PropType<PlatformInputStatus>,
      default: 'default'
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_value: string) => true,
    input: (_value: string, _ev: Event) => true,
    change: (_value: string, _ev: Event) => true,
    clear: (_ev: MouseEvent) => true,
    focus: (_ev: FocusEvent) => true,
    blur: (_ev: FocusEvent) => true,
    pressEnter: (_ev: KeyboardEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoInput as never,
        {
          ...platformAttrs(attrs, 'input', '1:23077', 'platform-input'),
          ...createInputModelBindings(props.modelValue),
          placeholder: props.placeholder,
          size: props.size,
          error: props.status === 'error',
          allowClear: props.allowClear,
          disabled: props.disabled,
          readonly: props.readonly,
          'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
          onInput: (value: string, ev: Event) => emit('input', value, ev),
          onChange: (value: string, ev: Event) => emit('change', value, ev),
          onClear: (ev: MouseEvent) => emit('clear', ev),
          onFocus: (ev: FocusEvent) => emit('focus', ev),
          onBlur: (ev: FocusEvent) => emit('blur', ev),
          onPressEnter: (ev: KeyboardEvent) => emit('pressEnter', ev)
        },
        slots
      );
  }
});
