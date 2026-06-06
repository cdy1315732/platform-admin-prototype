import { IconSearch } from '@arco-design/web-vue/es/icon';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

export const PlatformColorToken = defineComponent({
  name: 'PlatformColorToken',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: '#165DFF'
    },
    description: {
      type: String,
      default: ''
    }
  },
  setup(props, { attrs }) {
    return () =>
      h('div', platformAttrs(attrs, 'Color', '1:3863', 'platform-color-token'), [
        h('span', { class: 'platform-color-token__swatch', style: { background: props.value } }),
        h('span', { class: 'platform-color-token__body' }, [
          h('strong', props.name),
          h('code', props.value),
          props.description ? h('small', props.description) : null
        ])
      ]);
  }
});

export const PlatformFontToken = defineComponent({
  name: 'PlatformFontToken',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: ''
    },
    family: {
      type: String,
      default: 'var(--ac-font-family-cn)'
    },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 14
    },
    weight: {
      type: [Number, String] as PropType<number | string>,
      default: 400
    },
    sample: {
      type: String,
      default: '组件规范字体样例'
    }
  },
  setup(props, { attrs }) {
    return () =>
      h('div', platformAttrs(attrs, 'Fonts', '1:3523', 'platform-font-token'), [
        h('span', { class: 'platform-font-token__meta' }, props.name),
        h(
          'strong',
          {
            class: 'platform-font-token__sample',
            style: {
              fontFamily: props.family,
              fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
              fontWeight: props.weight
            }
          },
          props.sample
        )
      ]);
  }
});

export const PlatformShadowToken = defineComponent({
  name: 'PlatformShadowToken',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: '0 4px 10px rgb(0 0 0 / 10%)'
    },
    description: {
      type: String,
      default: ''
    }
  },
  setup(props, { attrs }) {
    return () =>
      h('div', platformAttrs(attrs, 'Shadows', '1:3701', 'platform-shadow-token'), [
        h('span', { class: 'platform-shadow-token__preview', style: { boxShadow: props.value } }),
        h('span', { class: 'platform-shadow-token__body' }, [
          h('strong', props.name),
          h('code', props.value),
          props.description ? h('small', props.description) : null
        ])
      ]);
  }
});

export const PlatformIconToken = defineComponent({
  name: 'PlatformIconToken',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 18
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h('div', platformAttrs(attrs, 'Icons', '1:4404', 'platform-icon-token'), [
        h(
          'span',
          {
            class: 'platform-icon-token__icon',
            style: {
              fontSize: `${props.size}px`
            }
          },
          slots.default?.() ?? h(IconSearch as never)
        ),
        h('span', { class: 'platform-icon-token__body' }, [h('strong', props.name), props.label ? h('small', props.label) : null])
      ]);
  }
});
