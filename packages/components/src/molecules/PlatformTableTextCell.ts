import { defineComponent, h } from 'vue';
import { platformAttrs } from '../shared';

export const PlatformTableTextCell = defineComponent({
  name: 'PlatformTableTextCell',
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: ''
    },
    secondary: {
      type: String,
      default: ''
    },
    ellipsis: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'span',
        {
          ...platformAttrs(attrs, 'components/table-cell/text', '1:12370', [
            'platform-table-text-cell',
            props.ellipsis ? 'platform-table-text-cell--ellipsis' : ''
          ].join(' '))
        },
        [
          h('span', { class: 'platform-table-text-cell__primary' }, slots.default?.() ?? props.text),
          props.secondary
            ? h('span', { class: 'platform-table-text-cell__secondary' }, props.secondary)
            : null
        ]
      );
  }
});
