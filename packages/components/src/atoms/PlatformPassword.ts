import { InputPassword as ArcoInputPassword } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export const PlatformPassword = defineComponent({
  name: 'PlatformPassword',
  inheritAttrs: false,
  props: {
    modelValue: String,
    defaultValue: {
      type: String,
      default: ''
    },
    visibility: {
      type: Boolean,
      default: undefined
    },
    defaultVisibility: {
      type: Boolean,
      default: true
    },
    invisibleButton: {
      type: Boolean,
      default: true
    },
    size: {
      type: String as PropType<PlatformSize | undefined>,
      default: undefined
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
    },
    error: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    maxLength: {
      type: [Number, Object] as PropType<number | { length: number; errorOnly?: boolean }>,
      default: 0
    },
    showWordLimit: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_value: string) => true,
    'update:visibility': (_visible: boolean) => true,
    input: (_value: string, _ev: Event) => true,
    change: (_value: string, _ev: Event) => true,
    visibilityChange: (_visible: boolean) => true,
    clear: (_ev: MouseEvent) => true,
    focus: (_ev: FocusEvent) => true,
    blur: (_ev: FocusEvent) => true,
    pressEnter: (_ev: KeyboardEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoInputPassword as never,
        {
          ...platformAttrs(attrs, 'password', '1:23385', 'platform-password'),
          ...props,
          'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
          'onUpdate:visibility': (visible: boolean) => emit('update:visibility', visible),
          onInput: (value: string, ev: Event) => emit('input', value, ev),
          onChange: (value: string, ev: Event) => emit('change', value, ev),
          onVisibilityChange: (visible: boolean) => emit('visibilityChange', visible),
          'onVisibility-change': (visible: boolean) => emit('visibilityChange', visible),
          onClear: (ev: MouseEvent) => emit('clear', ev),
          onFocus: (ev: FocusEvent) => emit('focus', ev),
          onBlur: (ev: FocusEvent) => emit('blur', ev),
          onPressEnter: (ev: KeyboardEvent) => emit('pressEnter', ev)
        },
        slots
      );
  }
});
