import {
  IconCaretDown,
  IconCaretUp,
  IconFilter,
  IconSearch,
  IconSort
} from '@arco-design/web-vue/es/icon';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

export type PlatformSortOrder = 'ascend' | 'descend' | 'none';

const nextSortOrder = (order: PlatformSortOrder): PlatformSortOrder => {
  if (order === 'none') return 'ascend';
  if (order === 'ascend') return 'descend';
  return 'none';
};

export const PlatformTableSorter = defineComponent({
  name: 'PlatformTableSorter',
  inheritAttrs: false,
  props: {
    order: {
      type: String as PropType<PlatformSortOrder>,
      default: 'none'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '排序'
    }
  },
  emits: {
    sort: (_order: PlatformSortOrder) => true
  },
  setup(props, { attrs, emit }) {
    return () =>
      h(
        'button',
        {
          ...platformAttrs(attrs, '.sorter', '1:12067', [
            'platform-table-sorter',
            props.active || props.order !== 'none' ? 'platform-table-sorter--active' : '',
            props.disabled ? 'platform-table-sorter--disabled' : ''
          ].join(' ')),
          type: 'button',
          disabled: props.disabled,
          title: props.label,
          'aria-label': props.label,
          onClick: () => emit('sort', nextSortOrder(props.order))
        },
        [
          props.order === 'ascend'
            ? h(IconCaretUp as never, { class: 'platform-table-sorter__icon platform-table-sorter__icon--active' })
            : h(IconCaretUp as never, { class: 'platform-table-sorter__icon' }),
          props.order === 'descend'
            ? h(IconCaretDown as never, { class: 'platform-table-sorter__icon platform-table-sorter__icon--active' })
            : h(IconCaretDown as never, { class: 'platform-table-sorter__icon' })
        ]
      );
  }
});

export const PlatformTableFilter = defineComponent({
  name: 'PlatformTableFilter',
  inheritAttrs: false,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '筛选'
    }
  },
  emits: {
    filter: () => true
  },
  setup(props, { attrs, emit }) {
    return () =>
      h(
        'button',
        {
          ...platformAttrs(attrs, '.filter', '1:12083', [
            'platform-table-filter',
            props.active ? 'platform-table-filter--active' : '',
            props.disabled ? 'platform-table-filter--disabled' : ''
          ].join(' ')),
          type: 'button',
          disabled: props.disabled,
          title: props.label,
          'aria-label': props.label,
          onClick: () => emit('filter')
        },
        h(IconFilter as never)
      );
  }
});

export const PlatformTableSearch = defineComponent({
  name: 'PlatformTableSearch',
  inheritAttrs: false,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '搜索'
    },
    query: {
      type: String,
      default: ''
    }
  },
  emits: {
    search: (_query: string) => true
  },
  setup(props, { attrs, emit }) {
    return () =>
      h(
        'button',
        {
          ...platformAttrs(attrs, '.search', '1:12092', [
            'platform-table-search',
            props.active || props.query ? 'platform-table-search--active' : '',
            props.disabled ? 'platform-table-search--disabled' : ''
          ].join(' ')),
          type: 'button',
          disabled: props.disabled,
          title: props.label,
          'aria-label': props.label,
          onClick: () => emit('search', props.query)
        },
        h(IconSearch as never)
      );
  }
});

export const PlatformTableSortCell = defineComponent({
  name: 'PlatformTableSortCell',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    order: {
      type: String as PropType<PlatformSortOrder>,
      default: 'none'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    sort: (_order: PlatformSortOrder) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h('span', platformAttrs(attrs, 'components/table-cell/sort', '1:12435', 'platform-table-sort-cell'), [
        h('span', { class: 'platform-table-sort-cell__label' }, slots.default?.() ?? props.label),
        h(PlatformTableSorter, {
          order: props.order,
          active: props.active,
          disabled: props.disabled,
          onSort: (order: PlatformSortOrder) => emit('sort', order)
        }),
        props.order === 'none' ? h(IconSort as never, { class: 'platform-table-sort-cell__fallback' }) : null
      ]);
  }
});
