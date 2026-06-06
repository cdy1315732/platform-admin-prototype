import { Link as ArcoLink } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

export interface PlatformActionLink {
  key: string;
  label: string;
  disabled?: boolean;
  danger?: boolean;
}

export const PlatformActionLinkGroup = defineComponent({
  name: 'PlatformActionLinkGroup',
  inheritAttrs: false,
  props: {
    actions: {
      type: Array as PropType<PlatformActionLink[]>,
      default: () => []
    }
  },
  emits: {
    action: (_action: PlatformActionLink, _ev: MouseEvent) => true
  },
  setup(props, { attrs, emit }) {
    const emitAction = (action: PlatformActionLink, ev: MouseEvent | KeyboardEvent) => {
      if (action.disabled) return;
      emit('action', action, ev as MouseEvent);
    };
    const handleActionKeydown = (action: PlatformActionLink, ev: KeyboardEvent) => {
      if (ev.key !== 'Enter' && ev.key !== ' ') return;

      ev.preventDefault();
      emitAction(action, ev);
    };

    return () =>
      h(
        'div',
        platformAttrs(attrs, 'components/table-cell/action', '1:12511', 'platform-action-link-group'),
        props.actions.map((action) =>
          h(
            ArcoLink as never,
            {
              key: action.key,
              role: 'button',
              tabindex: action.disabled ? -1 : 0,
              disabled: action.disabled,
              status: action.danger ? 'danger' : 'normal',
              onClick: (ev: MouseEvent) => emitAction(action, ev),
              onKeydown: (ev: KeyboardEvent) => handleActionKeydown(action, ev)
            },
            () => action.label
          )
        )
      );
  }
});
