import { Tag as ArcoTag } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { PlatformButton } from '../atoms/PlatformButton';
import { platformAttrs, type PlatformSize } from '../shared';
import { PlatformDrawer } from './PlatformDrawer';
import { PlatformModal } from './PlatformModal';
import { PlatformPageHeader } from './PlatformPageHeader';
import { PlatformResult } from './PlatformFeedback';

type PlatformTemplateActionType = 'default' | 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
type PlatformTemplateStatus = 'normal' | 'success' | 'warning' | 'danger' | 'processing' | 'info' | 'error';
type PlatformResultTemplateStatus = 'success' | 'warning' | 'error' | 'info' | '403' | '404' | '500' | null;

export interface PlatformTemplateAction {
  key: string;
  label: string;
  type?: PlatformTemplateActionType;
  disabled?: boolean;
  loading?: boolean;
}

const statusColorMap: Record<PlatformTemplateStatus, string | undefined> = {
  normal: 'gray',
  success: 'green',
  warning: 'orange',
  danger: 'red',
  processing: 'arcoblue',
  info: 'blue',
  error: 'red'
};

const defaultStatusLabel: Record<PlatformTemplateStatus, string> = {
  normal: '普通',
  success: '成功',
  warning: '警告',
  danger: '异常',
  processing: '处理中',
  info: '信息',
  error: '错误'
};

const renderTemplateActions = (
  actions: PlatformTemplateAction[],
  emitAction: (key: string, action: PlatformTemplateAction, ev: MouseEvent) => void
) =>
  actions.length
    ? h(
        'div',
        { class: 'platform-template-actions' },
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

export const PlatformStatusTag = defineComponent({
  name: 'PlatformStatusTag',
  inheritAttrs: false,
  props: {
    status: {
      type: String as PropType<PlatformTemplateStatus>,
      default: 'normal'
    },
    label: {
      type: String,
      default: ''
    },
    size: {
      type: String as PropType<PlatformSize>,
      default: 'medium'
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    close: (_ev: MouseEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoTag as never,
        {
          ...platformAttrs(attrs, 'StatusTag', '1:16391', [
            'platform-status-tag',
            `platform-status-tag--${props.status}`
          ].join(' ')),
          color: statusColorMap[props.status],
          size: props.size,
          closable: props.closable,
          onClose: (ev: MouseEvent) => emit('close', ev)
        },
        () => slots.default?.() ?? (props.label || defaultStatusLabel[props.status])
      );
  }
});

export const PlatformListPageTemplate = defineComponent({
  name: 'PlatformListPageTemplate',
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
    actions: {
      type: Array as PropType<PlatformTemplateAction[]>,
      default: () => []
    }
  },
  emits: {
    action: (_key: string, _action: PlatformTemplateAction, _ev: MouseEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h('section', platformAttrs(attrs, 'ListPageTemplate', '1:12557', 'platform-list-page-template'), [
        h(
          PlatformPageHeader,
          {
            title: props.title,
            subtitle: props.subtitle
          },
          {
            extra: () =>
              slots.actions?.() ??
              renderTemplateActions(props.actions, (key, action, ev) => emit('action', key, action, ev))
          }
        ),
        slots.filters
          ? h('div', { class: 'platform-list-page-template__filters' }, slots.filters())
          : null,
        h('div', { class: 'platform-list-page-template__body' }, slots.default?.() ?? slots.table?.()),
        slots.pagination ? h('div', { class: 'platform-list-page-template__pagination' }, slots.pagination()) : null
      ]);
  }
});

export const PlatformDetailPageTemplate = defineComponent({
  name: 'PlatformDetailPageTemplate',
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
    actions: {
      type: Array as PropType<PlatformTemplateAction[]>,
      default: () => []
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    action: (_key: string, _action: PlatformTemplateAction, _ev: MouseEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h('section', platformAttrs(attrs, 'DetailPageTemplate', '1:6837', 'platform-detail-page-template'), [
        slots.breadcrumb ? h('div', { class: 'platform-detail-page-template__breadcrumb' }, slots.breadcrumb()) : null,
        h(
          PlatformPageHeader,
          {
            title: props.title,
            subtitle: props.subtitle,
            showBack: props.showBack
          },
          {
            extra: () =>
              slots.actions?.() ??
              renderTemplateActions(props.actions, (key, action, ev) => emit('action', key, action, ev))
          }
        ),
        slots.summary ? h('div', { class: 'platform-detail-page-template__summary' }, slots.summary()) : null,
        h('div', { class: 'platform-detail-page-template__sections' }, slots.default?.() ?? slots.sections?.())
      ]);
  }
});

export const PlatformFormModalTemplate = defineComponent({
  name: 'PlatformFormModalTemplate',
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String] as PropType<number | string>,
      default: 520
    },
    actions: {
      type: Array as PropType<PlatformTemplateAction[]>,
      default: () => [
        { key: 'cancel', label: '取消' },
        { key: 'submit', label: '确定', type: 'primary' }
      ]
    }
  },
  emits: {
    'update:visible': (_visible: boolean) => true,
    action: (_key: string, _action: PlatformTemplateAction, _ev: MouseEvent) => true,
    ok: (_ev?: Event) => true,
    cancel: (_ev?: Event) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h('div', platformAttrs(attrs, 'FormModalTemplate', '1:22531', 'platform-form-modal-template'), [
        h(
          PlatformModal,
          {
            visible: props.visible,
            title: props.title,
            width: props.width,
            renderToBody: false,
            onOk: (ev?: Event) => emit('ok', ev),
            onCancel: (ev?: Event) => emit('cancel', ev),
            'onUpdate:visible': (visible: boolean) => emit('update:visible', visible)
          },
          {
            default: () => slots.default?.(),
            footer: () =>
              slots.footer?.() ??
              renderTemplateActions(props.actions, (key, action, ev) => emit('action', key, action, ev))
          }
        )
      ]);
  }
});

export const PlatformDetailDrawerTemplate = defineComponent({
  name: 'PlatformDetailDrawerTemplate',
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String] as PropType<number | string>,
      default: 420
    },
    actions: {
      type: Array as PropType<PlatformTemplateAction[]>,
      default: () => [
        { key: 'close', label: '关闭' },
        { key: 'edit', label: '编辑', type: 'primary' }
      ]
    }
  },
  emits: {
    'update:visible': (_visible: boolean) => true,
    action: (_key: string, _action: PlatformTemplateAction, _ev: MouseEvent) => true,
    ok: (_ev?: Event) => true,
    cancel: (_ev?: Event) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h('div', platformAttrs(attrs, 'DetailDrawerTemplate', '1:50985', 'platform-detail-drawer-template'), [
        h(
          PlatformDrawer,
          {
            visible: props.visible,
            title: props.title,
            width: props.width,
            renderToBody: false,
            onOk: (ev?: Event) => emit('ok', ev),
            onCancel: (ev?: Event) => emit('cancel', ev),
            'onUpdate:visible': (visible: boolean) => emit('update:visible', visible)
          },
          {
            default: () => slots.default?.(),
            footer: () =>
              slots.footer?.() ??
              renderTemplateActions(props.actions, (key, action, ev) => emit('action', key, action, ev))
          }
        )
      ]);
  }
});

export const PlatformResultPageTemplate = defineComponent({
  name: 'PlatformResultPageTemplate',
  inheritAttrs: false,
  props: {
    status: {
      type: String as PropType<PlatformResultTemplateStatus>,
      default: 'info'
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    actions: {
      type: Array as PropType<PlatformTemplateAction[]>,
      default: () => []
    }
  },
  emits: {
    action: (_key: string, _action: PlatformTemplateAction, _ev: MouseEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h('section', platformAttrs(attrs, 'ResultPageTemplate', '1:51158', 'platform-result-page-template'), [
        h(
          PlatformResult,
          {
            status: props.status,
            title: props.title,
            subtitle: props.subtitle
          },
          {
            extra: () =>
              slots.actions?.() ??
              renderTemplateActions(props.actions, (key, action, ev) => emit('action', key, action, ev))
          }
        )
      ]);
  }
});
