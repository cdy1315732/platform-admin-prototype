import {
  IconCheck,
  IconClose,
  IconMenuFold,
  IconMenuUnfold
} from '@arco-design/web-vue/es/icon';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

export type PlatformStepIconStatus = 'wait' | 'process' | 'finish' | 'error';

export const PlatformStepsItemIcon = defineComponent({
  name: 'PlatformStepsItemIcon',
  inheritAttrs: false,
  props: {
    status: {
      type: String as PropType<PlatformStepIconStatus>,
      default: 'wait'
    },
    index: {
      type: Number,
      default: 1
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'span',
        platformAttrs(attrs, 'components/steps-item-icon', '1:53148', [
          'platform-steps-item-icon',
          `platform-steps-item-icon--${props.status}`,
          props.small ? 'platform-steps-item-icon--small' : ''
        ].join(' ')),
        slots.default?.() ??
          (props.status === 'finish'
            ? h(IconCheck as never)
            : props.status === 'error'
              ? h(IconClose as never)
              : props.index)
      );
  }
});

export const PlatformCollapsedMenuItem = defineComponent({
  name: 'PlatformCollapsedMenuItem',
  inheritAttrs: false,
  props: {
    collapsed: {
      type: Boolean,
      default: true
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
      default: '收起'
    }
  },
  emits: {
    click: (_ev: MouseEvent) => true,
    toggle: (_collapsed: boolean) => true
  },
  setup(props, { attrs, emit }) {
    return () =>
      h(
        'button',
        {
          ...platformAttrs(attrs, 'vertical-menu-item/Put away', '1:52605', [
            'platform-collapsed-menu-item',
            props.collapsed ? 'platform-collapsed-menu-item--collapsed' : '',
            props.active ? 'platform-collapsed-menu-item--active' : '',
            props.disabled ? 'platform-collapsed-menu-item--disabled' : ''
          ].join(' ')),
          type: 'button',
          disabled: props.disabled,
          title: props.label,
          'aria-label': props.label,
          onClick: (ev: MouseEvent) => {
            emit('click', ev);
            emit('toggle', !props.collapsed);
          }
        },
        [
          h('span', { class: 'platform-collapsed-menu-item__icon' }, props.collapsed ? h(IconMenuUnfold as never) : h(IconMenuFold as never)),
          props.collapsed ? null : h('span', { class: 'platform-collapsed-menu-item__label' }, props.label)
        ]
      );
  }
});
