import { Cascader as ArcoCascader } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export interface PlatformCascaderOption {
  label?: string;
  value?: string | number;
  disabled?: boolean;
  children?: PlatformCascaderOption[];
  [key: string]: unknown;
}

export type PlatformCascaderValue =
  | string
  | number
  | Record<string, unknown>
  | Array<string | number | Record<string, unknown> | Array<string | number | Record<string, unknown>>>
  | undefined;

type PopupContainer = string | HTMLElement;

export const PlatformCascader = defineComponent({
  name: 'PlatformCascader',
  inheritAttrs: false,
  props: {
    pathMode: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number, Object, Array] as PropType<PlatformCascaderValue>,
      default: undefined
    },
    defaultValue: {
      type: [String, Number, Object, Array] as PropType<PlatformCascaderValue>,
      default: undefined
    },
    options: {
      type: Array as PropType<PlatformCascaderOption[]>,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<PlatformSize | undefined>,
      default: undefined
    },
    allowSearch: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    inputValue: String,
    defaultInputValue: {
      type: String,
      default: ''
    },
    popupVisible: {
      type: Boolean,
      default: undefined
    },
    defaultPopupVisible: {
      type: Boolean,
      default: false
    },
    expandTrigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'click'
    },
    placeholder: String,
    popupContainer: {
      type: [String, Object] as PropType<PopupContainer>,
      default: undefined
    },
    maxTagCount: {
      type: Number,
      default: 0
    },
    triggerProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    fieldNames: {
      type: Object as PropType<Record<string, string>>,
      default: undefined
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  emits: {
    'update:modelValue': (_value: PlatformCascaderValue) => true,
    'update:popupVisible': (_visible: boolean) => true,
    change: (_value: PlatformCascaderValue) => true,
    clear: () => true,
    focus: (_ev: FocusEvent) => true,
    blur: (_ev: FocusEvent) => true,
    search: (_value: string) => true,
    inputValueChange: (_value: string) => true,
    popupVisibleChange: (_visible: boolean) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoCascader as never,
        {
          ...platformAttrs(attrs, 'cascader', '1:18040', 'platform-cascader'),
          ...props,
          'onUpdate:modelValue': (value: PlatformCascaderValue) => emit('update:modelValue', value),
          'onUpdate:popupVisible': (visible: boolean) => emit('update:popupVisible', visible),
          onChange: (value: PlatformCascaderValue) => emit('change', value),
          onClear: () => emit('clear'),
          onFocus: (ev: FocusEvent) => emit('focus', ev),
          onBlur: (ev: FocusEvent) => emit('blur', ev),
          onSearch: (value: string) => emit('search', value),
          onInputValueChange: (value: string) => emit('inputValueChange', value),
          onPopupVisibleChange: (visible: boolean) => emit('popupVisibleChange', visible)
        },
        slots
      );
  }
});
