import { TreeSelect as ArcoTreeSelect } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export interface PlatformTreeNodeData {
  key?: string | number;
  title?: string;
  children?: PlatformTreeNodeData[];
  disabled?: boolean;
  [key: string]: unknown;
}

export interface PlatformTreeLabelValue {
  value: string | number;
  label?: string;
}

export type PlatformTreeSelectValue = string | number | Array<string | number> | PlatformTreeLabelValue | PlatformTreeLabelValue[] | undefined;

type PopupContainer = string | HTMLElement;

export const PlatformTreeSelect = defineComponent({
  name: 'PlatformTreeSelect',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object, Array] as PropType<PlatformTreeSelectValue>,
      default: undefined
    },
    defaultValue: {
      type: [String, Number, Object, Array] as PropType<PlatformTreeSelectValue>,
      default: undefined
    },
    data: {
      type: Array as PropType<PlatformTreeNodeData[]>,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
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
      type: [Boolean, Object] as PropType<boolean | { retainInputValue?: boolean }>,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    maxTagCount: Number,
    multiple: {
      type: Boolean,
      default: false
    },
    fieldNames: {
      type: Object as PropType<Record<string, string>>,
      default: undefined
    },
    labelInValue: {
      type: Boolean,
      default: false
    },
    treeCheckable: {
      type: Boolean,
      default: false
    },
    treeCheckStrictly: {
      type: Boolean,
      default: false
    },
    treeCheckedStrategy: {
      type: String as PropType<'all' | 'child' | 'parent'>,
      default: 'all'
    },
    treeProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    triggerProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    popupVisible: {
      type: Boolean,
      default: undefined
    },
    defaultPopupVisible: {
      type: Boolean,
      default: false
    },
    popupContainer: {
      type: [String, Object] as PropType<PopupContainer>,
      default: undefined
    },
    inputValue: String,
    defaultInputValue: {
      type: String,
      default: ''
    }
  },
  emits: {
    'update:modelValue': (_value: PlatformTreeSelectValue) => true,
    'update:inputValue': (_inputValue: string) => true,
    'update:popupVisible': (_visible: boolean) => true,
    change: (_value: PlatformTreeSelectValue) => true,
    clear: () => true,
    search: (_searchKey: string) => true,
    inputValueChange: (_inputValue: string) => true,
    popupVisibleChange: (_visible: boolean) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoTreeSelect as never,
        {
          ...platformAttrs(attrs, 'treeselect', '1:50194', 'platform-tree-select'),
          ...props,
          'onUpdate:modelValue': (value: PlatformTreeSelectValue) => emit('update:modelValue', value),
          'onUpdate:inputValue': (inputValue: string) => emit('update:inputValue', inputValue),
          'onUpdate:popupVisible': (visible: boolean) => emit('update:popupVisible', visible),
          onChange: (value: PlatformTreeSelectValue) => emit('change', value),
          onClear: () => emit('clear'),
          onSearch: (searchKey: string) => emit('search', searchKey),
          onInputValueChange: (inputValue: string) => emit('inputValueChange', inputValue),
          onPopupVisibleChange: (visible: boolean) => emit('popupVisibleChange', visible),
          'onPopup-visible-change': (visible: boolean) => emit('popupVisibleChange', visible)
        },
        slots
      );
  }
});
