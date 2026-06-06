import { Badge as ArcoBadge } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformStatus } from '../shared';

type PlatformBadgeStatus = PlatformStatus | 'processing';

export const PlatformBadge = defineComponent({
  name: 'PlatformBadge',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    status: {
      type: String as PropType<PlatformBadgeStatus>,
      default: 'normal'
    },
    count: {
      type: Number,
      default: undefined
    },
    dot: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: undefined
    },
    maxCount: {
      type: Number,
      default: 99
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ArcoBadge as never,
        {
          ...platformAttrs(attrs, 'badge/status', '1:5517', 'platform-badge'),
          text: props.label || undefined,
          status: props.status,
          count: props.count,
          dot: props.dot,
          color: props.color,
          maxCount: props.maxCount
        },
        slots
      );
  }
});
