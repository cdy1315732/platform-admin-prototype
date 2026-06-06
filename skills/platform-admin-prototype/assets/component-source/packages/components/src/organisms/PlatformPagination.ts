import { Pagination as ArcoPagination } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs, type PlatformSize } from '../shared';

export const PlatformPagination = defineComponent({
  name: 'PlatformPagination',
  inheritAttrs: false,
  props: {
    current: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    size: {
      type: String as PropType<PlatformSize>,
      default: 'medium'
    },
    showTotal: {
      type: Boolean,
      default: true
    },
    showJumper: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    change: (_page: number) => true,
    pageSizeChange: (_pageSize: number) => true
  },
  setup(props, { attrs, emit }) {
    return () =>
      h(ArcoPagination as never, {
        ...platformAttrs(attrs, 'pagination', '1:52918', 'platform-pagination'),
        current: props.current,
        pageSize: props.pageSize,
        total: props.total,
        size: props.size,
        showTotal: props.showTotal,
        showJumper: props.showJumper,
        disabled: props.disabled,
        onChange: (page: number) => emit('change', page),
        onPageSizeChange: (pageSize: number) => emit('pageSizeChange', pageSize)
      });
  }
});
