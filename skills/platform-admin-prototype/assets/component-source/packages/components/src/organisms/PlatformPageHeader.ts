import { PageHeader as ArcoPageHeader } from '@arco-design/web-vue';
import { defineComponent, h } from 'vue';
import { platformAttrs } from '../shared';

export const PlatformPageHeader = defineComponent({
  name: 'PlatformPageHeader',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    back: (_ev: Event) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoPageHeader as never,
        {
          ...platformAttrs(attrs, 'PageHeader', 'platform-rule:page-header', 'platform-page-header'),
          title: props.title,
          subtitle: props.subtitle,
          showBack: props.showBack,
          onBack: (ev: Event) => emit('back', ev)
        },
        slots
      );
  }
});
