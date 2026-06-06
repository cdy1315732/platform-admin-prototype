import {
  Avatar as ArcoAvatar,
  Badge as ArcoBadge,
  Input as ArcoInput,
  Link as ArcoLink,
  Message as ArcoMessage,
  Option as ArcoOption,
  Tag as ArcoTag
} from '@arco-design/web-vue';
import { defineComponent, h, type CSSProperties, type PropType } from 'vue';
import { platformAttrs, type PlatformSize, type PlatformStatus } from '../shared';

type BadgeOffset = number[];
type BadgeStatus = PlatformStatus | 'processing';
type LinkStatus = PlatformStatus;
type InputType = 'text' | 'password';
type TagSize = 'small' | 'medium' | 'large';
type SelectionValue = string | number | boolean | Record<string, unknown>;
type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading' | 'normal';
type MessageConfig = Parameters<typeof ArcoMessage.info>[0];

export const PlatformLink = defineComponent({
  name: 'PlatformLink',
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
        ArcoLink as never,
        {
          ...platformAttrs(attrs, 'components/Link', '1:51230', 'platform-link'),
          href: props.href,
          status: props.status,
          hoverable: props.hoverable,
          icon: props.icon,
          loading: props.loading,
          disabled: props.disabled,
          onClick: (ev: MouseEvent) => emit('click', ev)
        },
        () => slots.default?.() ?? props.label
      );
  }
});

export const PlatformBadgeDot = defineComponent({
  name: 'PlatformBadgeDot',
  inheritAttrs: false,
  props: {
    dotStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    },
    offset: {
      type: Array as PropType<BadgeOffset>,
      default: () => []
    },
    color: {
      type: String,
      default: undefined
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ArcoBadge as never,
        {
          ...platformAttrs(attrs, 'badge/dot', '1:5420', 'platform-badge-dot'),
          dot: true,
          dotStyle: props.dotStyle,
          offset: props.offset,
          color: props.color
        },
        slots
      );
  }
});

export const PlatformBadgeCount = defineComponent({
  name: 'PlatformBadgeCount',
  inheritAttrs: false,
  props: {
    count: {
      type: Number,
      default: undefined
    },
    maxCount: {
      type: Number,
      default: 99
    },
    offset: {
      type: Array as PropType<BadgeOffset>,
      default: () => []
    },
    color: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ArcoBadge as never,
        {
          ...platformAttrs(attrs, 'badge/count', '1:5533', 'platform-badge-count'),
          count: props.count,
          maxCount: props.maxCount,
          offset: props.offset,
          color: props.color,
          text: props.text
        },
        slots
      );
  }
});

export const PlatformBadgeAvatar = defineComponent({
  name: 'PlatformBadgeAvatar',
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: undefined
    },
    dot: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: undefined
    },
    maxCount: {
      type: Number,
      default: 99
    },
    offset: {
      type: Array as PropType<BadgeOffset>,
      default: () => []
    },
    color: {
      type: String,
      default: undefined
    },
    status: {
      type: String as PropType<BadgeStatus | undefined>,
      default: undefined
    },
    avatarText: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: undefined
    },
    size: {
      type: Number,
      default: 32
    },
    shape: {
      type: String as PropType<'circle' | 'square'>,
      default: 'circle'
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ArcoBadge as never,
        {
          ...platformAttrs(attrs, 'badge-avatar', '1:5542', 'platform-badge-avatar'),
          text: props.text,
          dot: props.dot,
          count: props.count,
          maxCount: props.maxCount,
          offset: props.offset,
          color: props.color,
          status: props.status
        },
        () =>
          h(
            ArcoAvatar as never,
            {
              imageUrl: props.imageUrl,
              size: props.size,
              shape: props.shape
            },
            () => slots.default?.() ?? props.avatarText
          )
      );
  }
});

export const PlatformInputAddon = defineComponent({
  name: 'PlatformInputAddon',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: undefined
    },
    defaultValue: {
      type: String,
      default: ''
    },
    size: {
      type: String as PropType<PlatformSize | undefined>,
      default: undefined
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: undefined
    },
    prepend: {
      type: String,
      default: undefined
    },
    append: {
      type: String,
      default: undefined
    },
    type: {
      type: String as PropType<InputType>,
      default: 'text'
    }
  },
  emits: {
    'update:modelValue': (_value: string) => true,
    input: (_value: string, _ev: Event) => true,
    change: (_value: string, _ev: Event) => true,
    pressEnter: (_ev: KeyboardEvent) => true,
    clear: (_ev: MouseEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoInput as never,
        {
          ...platformAttrs(attrs, '.input-addon', '1:23366', 'platform-input-addon'),
          modelValue: props.modelValue,
          defaultValue: props.defaultValue,
          size: props.size,
          allowClear: props.allowClear,
          disabled: props.disabled,
          readonly: props.readonly,
          error: props.error,
          placeholder: props.placeholder,
          prepend: props.prepend,
          append: props.append,
          type: props.type,
          'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
          onInput: (value: string, ev: Event) => emit('input', value, ev),
          onChange: (value: string, ev: Event) => emit('change', value, ev),
          onPressEnter: (ev: KeyboardEvent) => emit('pressEnter', ev),
          onClear: (ev: MouseEvent) => emit('clear', ev)
        },
        slots
      );
  }
});

export const PlatformSelectionItem = defineComponent({
  name: 'PlatformSelectionItem',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Boolean, Object] as PropType<SelectionValue>,
      default: undefined
    },
    label: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tagProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    extra: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    index: {
      type: Number,
      default: undefined
    },
    internal: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ArcoOption as never,
        {
          ...platformAttrs(attrs, 'selection-item', '1:24243', 'platform-selection-item'),
          value: props.value,
          label: props.label,
          disabled: props.disabled,
          tagProps: props.tagProps,
          extra: props.extra,
          index: props.index,
          internal: props.internal
        },
        slots
      );
  }
});

export const PlatformTagDeletion = defineComponent({
  name: 'PlatformTagDeletion',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    size: {
      type: String as PropType<TagSize>,
      default: 'medium'
    },
    color: {
      type: String,
      default: undefined
    },
    bordered: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:visible': (_visible: boolean) => true,
    close: (_ev: MouseEvent) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoTag as never,
        {
          ...platformAttrs(attrs, 'tag-deletion', '1:17096', 'platform-tag-deletion'),
          size: props.size,
          color: props.color,
          bordered: props.bordered,
          visible: props.visible,
          loading: props.loading,
          closable: true,
          'onUpdate:visible': (visible: boolean) => emit('update:visible', visible),
          onClose: (ev: MouseEvent) => emit('close', ev)
        },
        () => slots.default?.() ?? props.label
      );
  }
});

export const platformMessage = ArcoMessage;

export const showPlatformMessage = (type: MessageType, config: MessageConfig) => ArcoMessage[type](config);

export const clearPlatformMessage = (position?: 'top' | 'bottom') => ArcoMessage.clear(position);
