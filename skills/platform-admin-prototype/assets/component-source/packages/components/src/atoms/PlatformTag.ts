import { Tag as ArcoTag } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

type PlatformTagSize = 'small' | 'medium' | 'large';

export const PlatformTag = defineComponent({
  name: 'PlatformTag',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: undefined
    },
    size: {
      type: String as PropType<PlatformTagSize>,
      default: 'medium'
    },
    bordered: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    checkable: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    close: (_ev: MouseEvent) => true,
    check: (_checked: boolean, _ev: MouseEvent) => true,
    'update:checked': (_checked: boolean) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoTag as never,
        {
          ...platformAttrs(attrs, 'Tag', '1:16391', 'platform-tag'),
          color: props.color,
          size: props.size,
          bordered: props.bordered,
          closable: props.closable,
          checkable: props.checkable,
          checked: props.checked,
          loading: props.loading,
          onClose: (ev: MouseEvent) => emit('close', ev),
          onCheck: (checked: boolean, ev: MouseEvent) => emit('check', checked, ev),
          'onUpdate:checked': (checked: boolean) => emit('update:checked', checked)
        },
        {
          ...slots,
          default: () => slots.default?.() ?? props.label
        }
      );
  }
});
