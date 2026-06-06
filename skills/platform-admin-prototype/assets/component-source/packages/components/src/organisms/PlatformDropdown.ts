import { Doption as ArcoDropdownOption, Dropdown as ArcoDropdown } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';
import { PlatformButton } from '../atoms/PlatformButton';

export type PlatformDropdownTrigger = 'hover' | 'click' | 'focus' | 'contextMenu' | Array<'hover' | 'click' | 'focus' | 'contextMenu'>;
export type PlatformDropdownPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';

export interface PlatformDropdownItem {
  key: string;
  label: string;
  disabled?: boolean;
}

type PopupContainer = string | HTMLElement;
type PopupMaxHeight = boolean | number;

export const PlatformDropdown = defineComponent({
  name: 'PlatformDropdown',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '更多'
    },
    items: {
      type: Array as PropType<PlatformDropdownItem[]>,
      default: () => []
    },
    popupVisible: {
      type: Boolean,
      default: undefined
    },
    defaultPopupVisible: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: [String, Array] as PropType<PlatformDropdownTrigger>,
      default: 'click'
    },
    position: {
      type: String as PropType<PlatformDropdownPosition>,
      default: 'bottom'
    },
    popupContainer: {
      type: [String, Object] as PropType<PopupContainer>,
      default: undefined
    },
    popupMaxHeight: {
      type: [Boolean, Number] as PropType<PopupMaxHeight>,
      default: true
    },
    hideOnSelect: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    'update:popupVisible': (_visible: boolean) => true,
    popupVisibleChange: (_visible: boolean) => true,
    select: (_key: string, _ev?: Event) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        'span',
        {
          ...platformAttrs(attrs, 'Dropdown', 'platform-rule:dropdown', 'platform-dropdown')
        },
        h(
          ArcoDropdown as never,
          {
            popupVisible: props.popupVisible,
            defaultPopupVisible: props.defaultPopupVisible,
            trigger: props.trigger,
            position: props.position,
            popupContainer: props.popupContainer,
            popupMaxHeight: props.popupMaxHeight,
            hideOnSelect: props.hideOnSelect,
            'onUpdate:popupVisible': (visible: boolean) => emit('update:popupVisible', visible),
            onPopupVisibleChange: (visible: boolean) => emit('popupVisibleChange', visible),
            onSelect: (key: string, ev?: Event) => emit('select', key, ev)
          },
          {
            default: () => slots.default?.() ?? h(PlatformButton, { type: 'secondary' }, () => props.label),
            content: () =>
              slots.content?.() ??
              props.items.map((item) =>
                h(
                  ArcoDropdownOption as never,
                  {
                    key: item.key,
                    value: item.key,
                    disabled: item.disabled
                  },
                  { default: () => item.label }
                )
              )
          }
        )
      );
  }
});
