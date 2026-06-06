import { Avatar as ArcoAvatar, Button as ArcoButton, Link as ArcoLink } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { PlatformBadge } from '../atoms/PlatformBadge';
import { PlatformCheckbox, type PlatformCheckboxModelValue } from '../atoms/PlatformCheckbox';
import { PlatformSwitch, type PlatformSwitchValue } from '../atoms/PlatformSwitch';
import { PlatformTag } from '../atoms/PlatformTag';
import { platformAttrs, type PlatformStatus } from '../shared';

type IconPosition = 'left' | 'right';
type AvatarShape = 'circle' | 'square';
type LinkStatus = PlatformStatus;

export const PlatformTableHeaderCell = defineComponent({
  name: 'PlatformTableHeaderCell',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    sortable: {
      type: Boolean,
      default: false
    },
    sortOrder: {
      type: String as PropType<'ascend' | 'descend' | undefined>,
      default: undefined
    },
    filterable: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    sort: (_order?: 'ascend' | 'descend') => true,
    filter: () => true,
    search: () => true
  },
  setup(props, { attrs, emit, slots }) {
    const actionButton = (key: string, label: string, title: string, onClick: () => void) =>
      h(
        ArcoButton as never,
        {
          key,
          type: 'text',
          size: 'mini',
          title,
          'aria-label': title,
          class: 'platform-table-header-cell__action',
          onClick
        },
        () => label
      );

    return () =>
      h(
        'div',
        platformAttrs(attrs, 'components/table-cell/header', '1:12101', [
          'platform-table-header-cell',
          props.active ? 'platform-table-header-cell--active' : ''
        ].join(' ')),
        [
          h('span', { class: 'platform-table-header-cell__label' }, slots.default?.() ?? props.label),
          h('span', { class: 'platform-table-header-cell__actions' }, [
            props.sortable
              ? actionButton(
                  'sort',
                  props.sortOrder === 'ascend' ? 'A' : props.sortOrder === 'descend' ? 'D' : 'S',
                  '排序',
                  () => emit('sort', props.sortOrder)
                )
              : null,
            props.filterable ? actionButton('filter', 'F', '筛选', () => emit('filter')) : null,
            props.searchable ? actionButton('search', 'Q', '搜索', () => emit('search')) : null
          ])
        ]
      );
  }
});

export const PlatformTableIconTextCell = defineComponent({
  name: 'PlatformTableIconTextCell',
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
    iconPosition: {
      type: String as PropType<IconPosition>,
      default: 'left'
    },
    ellipsis: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { attrs, slots }) {
    const icon = () => slots.icon?.() ?? h('span', { class: 'platform-table-icon-text-cell__fallback-icon' });
    const text = () =>
      h('span', { class: 'platform-table-icon-text-cell__text' }, [
        h('span', { class: 'platform-table-icon-text-cell__primary' }, slots.default?.() ?? props.text),
        props.secondary ? h('span', { class: 'platform-table-icon-text-cell__secondary' }, props.secondary) : null
      ]);

    return () =>
      h(
        'span',
        platformAttrs(attrs, 'components/table-cell/text+icon', '1:12379', [
          'platform-table-icon-text-cell',
          props.ellipsis ? 'platform-table-icon-text-cell--ellipsis' : ''
        ].join(' ')),
        props.iconPosition === 'left' ? [icon(), text()] : [text(), icon()]
      );
  }
});

export const PlatformTableAvatarTextCell = defineComponent({
  name: 'PlatformTableAvatarTextCell',
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
    avatarText: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: undefined
    },
    shape: {
      type: String as PropType<AvatarShape>,
      default: 'circle'
    },
    size: {
      type: Number,
      default: 32
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'span',
        platformAttrs(attrs, 'components/table-cell/avatar+text', '1:12404', 'platform-table-avatar-text-cell'),
        [
          h(
            ArcoAvatar as never,
            {
              imageUrl: props.imageUrl,
              shape: props.shape,
              size: props.size
            },
            () => slots.avatar?.() ?? props.avatarText
          ),
          h('span', { class: 'platform-table-avatar-text-cell__text' }, [
            h('span', { class: 'platform-table-avatar-text-cell__primary' }, slots.default?.() ?? props.text),
            props.secondary ? h('span', { class: 'platform-table-avatar-text-cell__secondary' }, props.secondary) : null
          ])
        ]
      );
  }
});

export const PlatformTableTagCell = defineComponent({
  name: 'PlatformTableTagCell',
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
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'span',
        platformAttrs(attrs, 'components/table-cell/tag', '1:12417', 'platform-table-tag-cell'),
        h(PlatformTag, props, slots)
      );
  }
});

export const PlatformTableStatusCell = defineComponent({
  name: 'PlatformTableStatusCell',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    status: {
      type: String as PropType<PlatformStatus | 'processing'>,
      default: 'normal'
    },
    count: {
      type: Number,
      default: undefined
    },
    dot: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'span',
        platformAttrs(attrs, 'components/table-cell/status', '1:12426', 'platform-table-status-cell'),
        h(PlatformBadge, props, slots)
      );
  }
});

export const PlatformTableCheckboxCell = defineComponent({
  name: 'PlatformTableCheckboxCell',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array] as PropType<PlatformCheckboxModelValue>,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_value: PlatformCheckboxModelValue) => true,
    change: (_value: PlatformCheckboxModelValue, _ev: Event) => true
  },
  setup(props, { attrs, emit }) {
    return () =>
      h(
        'span',
        platformAttrs(attrs, 'components/table-cell/checkbox', '1:12444', 'platform-table-checkbox-cell'),
        h(PlatformCheckbox, {
          modelValue: props.modelValue,
          disabled: props.disabled,
          indeterminate: props.indeterminate,
          'onUpdate:modelValue': (value: PlatformCheckboxModelValue) => emit('update:modelValue', value),
          onChange: (value: PlatformCheckboxModelValue, ev: Event) => emit('change', value, ev)
        })
      );
  }
});

export const PlatformTableExpandCell = defineComponent({
  name: 'PlatformTableExpandCell',
  inheritAttrs: false,
  props: {
    expanded: {
      type: Boolean,
      default: false
    },
    expandable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:expanded': (_expanded: boolean) => true,
    change: (_expanded: boolean) => true
  },
  setup(props, { attrs, emit }) {
    const toggle = () => {
      if (!props.expandable || props.disabled) return;
      const next = !props.expanded;
      emit('update:expanded', next);
      emit('change', next);
    };

    return () =>
      h(
        'span',
        platformAttrs(attrs, 'components/table-cell/expand icon', '1:12477', 'platform-table-expand-cell'),
        h(
          ArcoButton as never,
          {
            type: 'text',
            size: 'mini',
            disabled: props.disabled || !props.expandable,
            class: 'platform-table-expand-cell__button',
            onClick: toggle
          },
          () => (props.expanded ? 'v' : '>')
        )
      );
  }
});

export const PlatformTableSwitchCell = defineComponent({
  name: 'PlatformTableSwitchCell',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<PlatformSwitchValue>,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    checkedValue: {
      type: [String, Number, Boolean] as PropType<PlatformSwitchValue>,
      default: true
    },
    uncheckedValue: {
      type: [String, Number, Boolean] as PropType<PlatformSwitchValue>,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_value: PlatformSwitchValue) => true,
    change: (_value: PlatformSwitchValue, _ev: Event) => true
  },
  setup(props, { attrs, emit }) {
    return () =>
      h(
        'span',
        platformAttrs(attrs, 'components/table-cell/switch', '1:12502', 'platform-table-switch-cell'),
        h(PlatformSwitch, {
          modelValue: props.modelValue,
          disabled: props.disabled,
          loading: props.loading,
          checkedValue: props.checkedValue,
          uncheckedValue: props.uncheckedValue,
          'onUpdate:modelValue': (value: PlatformSwitchValue) => emit('update:modelValue', value),
          onChange: (value: PlatformSwitchValue, ev: Event) => emit('change', value, ev)
        })
      );
  }
});

export const PlatformTableLinkCell = defineComponent({
  name: 'PlatformTableLinkCell',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: undefined
    },
    status: {
      type: String as PropType<LinkStatus>,
      default: 'normal'
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    icon: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    click: (_ev: MouseEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        'span',
        platformAttrs(attrs, 'components/table-cell/link', '1:12548', 'platform-table-link-cell'),
        h(
          ArcoLink as never,
          {
            href: props.href,
            status: props.status,
            hoverable: props.hoverable,
            icon: props.icon,
            loading: props.loading,
            disabled: props.disabled,
            onClick: (ev: MouseEvent) => emit('click', ev)
          },
          () => slots.default?.() ?? props.label
        )
      );
  }
});
