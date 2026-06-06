import { defineComponent, h, type PropType } from 'vue';
import { PlatformButton } from '../atoms/PlatformButton';
import { platformAttrs, type PlatformStatus } from '../shared';

type PlatformCompositionActionType = 'default' | 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
type PlatformDetailSummaryItemKind = 'text' | 'status' | 'tag';
type PlatformDetailSummaryStatus = PlatformStatus | 'processing' | 'info' | 'warning' | 'error';

export interface PlatformCompositionAction {
  key: string;
  label: string;
  type?: PlatformCompositionActionType;
  disabled?: boolean;
  loading?: boolean;
}

export interface PlatformDetailSummaryItem {
  key: string;
  label: string;
  value: string | number;
  kind?: PlatformDetailSummaryItemKind;
  status?: PlatformDetailSummaryStatus;
  color?: string;
  slotName?: string;
}

const renderActionButtons = (
  className: string,
  actions: PlatformCompositionAction[],
  emitAction: (key: string, action: PlatformCompositionAction, ev: MouseEvent) => void
) =>
  actions.length
    ? h(
        'div',
        { class: className },
        actions.map((action) =>
          h(
            PlatformButton,
            {
              key: action.key,
              type: action.type === 'danger' ? 'primary' : action.type ?? 'default',
              status: action.type === 'danger' ? 'danger' : 'normal',
              disabled: action.disabled,
              loading: action.loading,
              onClick: (ev: MouseEvent) => emitAction(action.key, action, ev)
            },
            () => action.label
          )
        )
      )
    : null;

export const PlatformFilterPanel = defineComponent({
  name: 'PlatformFilterPanel',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    searchLabel: {
      type: String,
      default: '搜索'
    },
    resetLabel: {
      type: String,
      default: '重置'
    },
    showReset: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    search: (_ev: MouseEvent) => true,
    reset: (_ev: MouseEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h('section', platformAttrs(attrs, 'FilterPanel', 'platform-rule:filter-panel', 'platform-filter-panel'), [
        props.title || props.description
          ? h('div', { class: 'platform-filter-panel__header' }, [
              props.title ? h('h2', { class: 'platform-filter-panel__title' }, props.title) : null,
              props.description ? h('p', { class: 'platform-filter-panel__description' }, props.description) : null
            ])
          : null,
        h('div', { class: 'platform-filter-panel__body' }, slots.default?.()),
        h(
          'div',
          { class: 'platform-filter-panel__actions' },
          slots.actions?.() ?? [
            h(
              PlatformButton,
              {
                type: 'primary',
                onClick: (ev: MouseEvent) => emit('search', ev)
              },
              () => props.searchLabel
            ),
            props.showReset
              ? h(
                  PlatformButton,
                  {
                    onClick: (ev: MouseEvent) => emit('reset', ev)
                  },
                  () => props.resetLabel
                )
              : null
          ]
        )
      ]);
  }
});

export const PlatformTableCard = defineComponent({
  name: 'PlatformTableCard',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    actions: {
      type: Array as PropType<PlatformCompositionAction[]>,
      default: () => []
    },
    selectedCount: {
      type: Number,
      default: 0
    },
    bulkActions: {
      type: Array as PropType<PlatformCompositionAction[]>,
      default: () => []
    }
  },
  emits: {
    action: (_key: string, _action: PlatformCompositionAction, _ev: MouseEvent) => true,
    bulkAction: (_key: string, _action: PlatformCompositionAction, _ev: MouseEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h('section', platformAttrs(attrs, 'TableCard', 'platform-rule:table-card', 'platform-table-card'), [
        h('div', { class: 'platform-table-card__header' }, [
          h('div', { class: 'platform-table-card__title-block' }, [
            props.title ? h('h2', { class: 'platform-table-card__title' }, props.title) : null,
            props.description ? h('p', { class: 'platform-table-card__description' }, props.description) : null
          ]),
          slots.actions?.() ??
            renderActionButtons('platform-table-card__actions', props.actions, (key, action, ev) =>
              emit('action', key, action, ev)
            )
        ]),
        props.selectedCount > 0
          ? h('div', { class: 'platform-table-card__bulk' }, [
              h('span', { class: 'platform-table-card__selected' }, `已选择 ${props.selectedCount} 项`),
              slots.bulkActions?.() ??
                renderActionButtons('platform-table-card__bulk-actions', props.bulkActions, (key, action, ev) =>
                  emit('bulkAction', key, action, ev)
                )
            ])
          : null,
        h('div', { class: 'platform-table-card__body' }, slots.default?.() ?? slots.table?.()),
        slots.pagination ? h('div', { class: 'platform-table-card__pagination' }, slots.pagination()) : null
      ]);
  }
});

export const PlatformFormCard = defineComponent({
  name: 'PlatformFormCard',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    actions: {
      type: Array as PropType<PlatformCompositionAction[]>,
      default: () => []
    }
  },
  emits: {
    action: (_key: string, _action: PlatformCompositionAction, _ev: MouseEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h('section', platformAttrs(attrs, 'FormCard', 'platform-rule:form-card', 'platform-form-card'), [
        props.title || props.description
          ? h('div', { class: 'platform-form-card__header' }, [
              props.title ? h('h2', { class: 'platform-form-card__title' }, props.title) : null,
              props.description ? h('p', { class: 'platform-form-card__description' }, props.description) : null
            ])
          : null,
        h('div', { class: 'platform-form-card__body' }, slots.default?.()),
        h(
          'div',
          { class: 'platform-form-card__footer' },
          slots.actions?.() ??
            renderActionButtons('platform-form-card__actions', props.actions, (key, action, ev) =>
              emit('action', key, action, ev)
            ) ??
            []
        )
      ]);
  }
});

export const PlatformDetailSummary = defineComponent({
  name: 'PlatformDetailSummary',
  inheritAttrs: false,
  props: {
    items: {
      type: Array as PropType<PlatformDetailSummaryItem[]>,
      default: () => []
    },
    columns: {
      type: Number,
      default: 4
    }
  },
  setup(props, { attrs, slots }) {
    const renderValue = (item: PlatformDetailSummaryItem) => {
      const slotName = item.slotName ?? `item-${item.key}`;
      const custom = slots[slotName]?.({ item });
      if (custom) return custom;

      if (item.kind === 'status') {
        return h(
          'strong',
          {
            class: `platform-detail-summary__status platform-detail-summary__status--${item.status ?? 'normal'}`,
            'data-status': item.status ?? 'normal'
          },
          item.value
        );
      }

      if (item.kind === 'tag') {
        return h(
          'strong',
          {
            class: 'platform-detail-summary__tag',
            'data-color': item.color ?? 'gray'
          },
          item.value
        );
      }

      return h('strong', { class: 'platform-detail-summary__value' }, item.value);
    };

    return () =>
      h(
        'section',
        {
          ...platformAttrs(attrs, 'DetailSummary', 'platform-rule:detail-summary', 'platform-detail-summary'),
          style: { '--platform-detail-summary-columns': String(props.columns) }
        },
        props.items.map((item) =>
          h('article', { key: item.key, class: 'platform-detail-summary__item' }, [
            h('span', { class: 'platform-detail-summary__label' }, item.label),
            renderValue(item)
          ])
        )
      );
  }
});
