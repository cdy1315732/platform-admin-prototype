import { Radio as ArcoRadio } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

export type PlatformRadioValue = string | number | boolean;
export type PlatformRadioType = 'radio' | 'button';

export const PlatformRadio = defineComponent({
  name: 'PlatformRadio',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<PlatformRadioValue | undefined>,
      default: undefined
    },
    defaultChecked: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean] as PropType<PlatformRadioValue>,
      default: true
    },
    type: {
      type: String as PropType<PlatformRadioType>,
      default: 'radio'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    uninjectGroupContext: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_value: PlatformRadioValue) => true,
    change: (_value: PlatformRadioValue, _ev: Event) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoRadio as never,
        {
          ...platformAttrs(attrs, 'components/radio', '1:24139', 'platform-radio'),
          ...props,
          'onUpdate:modelValue': (value: PlatformRadioValue) => emit('update:modelValue', value),
          onChange: (value: PlatformRadioValue, ev: Event) => emit('change', value, ev)
        },
        slots
      );
  }
});
