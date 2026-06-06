import { Table as ArcoTable } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

export interface PlatformTableColumn {
  title: string;
  dataIndex: string;
  slotName?: string;
  titleSlotName?: string;
  sortable?: {
    sortDirections?: ('ascend' | 'descend')[];
    sorter?:
      | boolean
      | ((
          a: PlatformTableRecord,
          b: PlatformTableRecord,
          extra: { dataIndex: string; direction: 'ascend' | 'descend' }
        ) => number);
    sortOrder?: 'ascend' | 'descend' | '';
    defaultSortOrder?: 'ascend' | 'descend' | '';
  };
  width?: number;
}

export type PlatformTableRecord = Record<string, unknown>;

export const PlatformDataTable = defineComponent({
  name: 'PlatformDataTable',
  inheritAttrs: false,
  props: {
    columns: {
      type: Array as PropType<PlatformTableColumn[]>,
      default: () => []
    },
    data: {
      type: Array as PropType<PlatformTableRecord[]>,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'key'
    }
  },
  emits: {
    sorterChange: (_dataIndex: string, _direction: 'ascend' | 'descend' | '') => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoTable as never,
        {
          ...platformAttrs(attrs, 'table', '1:12557', 'platform-data-table'),
          columns: props.columns,
          data: props.data,
          loading: props.loading,
          bordered: props.bordered,
          rowKey: props.rowKey,
          pagination: false,
          onSorterChange: (dataIndex: string, direction: 'ascend' | 'descend' | '') =>
            emit('sorterChange', dataIndex, direction)
        },
        slots
      );
  }
});
