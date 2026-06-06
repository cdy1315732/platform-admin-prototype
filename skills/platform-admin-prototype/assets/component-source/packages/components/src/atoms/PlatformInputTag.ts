import { InputTag as ArcoInputTag } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export type PlatformInputTagValue = string | number | Record<string, unknown>;
export type PlatformInputTagRetainInputValue = boolean | { create?: boolean; blur?: boolean };

export const PlatformInputTag = defineComponent({
  name: 'PlatformInputTag',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array as PropType<PlatformInputTagValue[] | undefined>,
      default: undefined
    },
    defaultValue: {
      type: Array as PropType<PlatformInputTagValue[]>,
      default: () => []
    },
    inputValue: String,
    defaultInputValue: {
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
    readonly: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<PlatformSize | undefined>,
      default: undefined
    },
    maxTagCount: {
      type: Number,
      default: 0
    },
    retainInputValue: {
      type: [Boolean, Object] as PropType<PlatformInputTagRetainInputValue>,
      default: false
    },
    formatTag: {
      type: Function as PropType<(data: PlatformInputTagValue) => string>,
      default: undefined
    },
    uniqueValue: {
      type: Boolean,
      default: false
    },
    fieldNames: {
      type: Object as PropType<Record<string, string>>,
      default: undefined
    },
    tagNowrap: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    },
    disabledInput: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_value: PlatformInputTagValue[]) => true,
    'update:inputValue': (_inputValue: string) => true,
    change: (_value: PlatformInputTagValue[], _ev: Event) => true,
    inputValueChange: (_inputValue: string, _ev: Event) => true,
    pressEnter: (_inputValue: string, _ev: KeyboardEvent) => true,
    remove: (_removed: string | number, _ev: Event) => true,
    clear: (_ev: MouseEvent) => true,
    focus: (_ev: FocusEvent) => true,
    blur: (_ev: FocusEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoInputTag as never,
        {
          ...platformAttrs(attrs, 'inputtag', '1:23570', 'platform-input-tag'),
          ...props,
          'onUpdate:modelValue': (value: PlatformInputTagValue[]) => emit('update:modelValue', value),
          'onUpdate:inputValue': (inputValue: string) => emit('update:inputValue', inputValue),
          onChange: (value: PlatformInputTagValue[], ev: Event) => emit('change', value, ev),
          onInputValueChange: (inputValue: string, ev: Event) => emit('inputValueChange', inputValue, ev),
          onPressEnter: (inputValue: string, ev: KeyboardEvent) => emit('pressEnter', inputValue, ev),
          onRemove: (removed: string | number, ev: Event) => emit('remove', removed, ev),
          onClear: (ev: MouseEvent) => emit('clear', ev),
          onFocus: (ev: FocusEvent) => emit('focus', ev),
          onBlur: (ev: FocusEvent) => emit('blur', ev)
        },
        slots
      );
  }
});
