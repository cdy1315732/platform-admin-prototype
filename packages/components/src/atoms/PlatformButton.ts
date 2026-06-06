import { Button as ArcoButton } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize, type PlatformStatus } from '../shared';

type PlatformButtonType = 'default' | 'primary' | 'secondary' | 'outline' | 'dashed' | 'text';

export const PlatformButton = defineComponent({
  name: 'PlatformButton',
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<PlatformButtonType>,
      default: 'default'
    },
    status: {
      type: String as PropType<PlatformStatus>,
      default: 'normal'
    },
    size: {
      type: String as PropType<PlatformSize>,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    long: {
      type: Boolean,
      default: false
    },
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  emits: {
    click: (_ev: MouseEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoButton as never,
        {
          ...platformAttrs(attrs, 'Button', '1:4398', 'platform-button'),
          type: props.type === 'default' ? undefined : props.type,
          status: props.status === 'normal' ? undefined : props.status,
          size: props.size,
          disabled: props.disabled,
          loading: props.loading,
          long: props.long,
          htmlType: props.htmlType,
          onClick: (ev: MouseEvent) => emit('click', ev)
        },
        slots
      );
  }
});
