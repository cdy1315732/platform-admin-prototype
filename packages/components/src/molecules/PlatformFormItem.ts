import { FormItem as ArcoFormItem } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

type PlatformFormItemLayout = 'horizontal' | 'vertical';

export const PlatformFormItem = defineComponent({
  name: 'PlatformFormItem',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    },
    field: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    help: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    layout: {
      type: String as PropType<PlatformFormItemLayout>,
      default: 'horizontal'
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ArcoFormItem as never,
        {
          ...platformAttrs(attrs, 'form-item', '1:22531', [
            'platform-form-item',
            `platform-form-item--${props.layout}`
          ].join(' ')),
          label: props.label,
          field: props.field,
          required: props.required,
          help: props.help || undefined,
          extra: props.error || undefined,
          validateStatus: props.error ? 'error' : undefined
        },
        slots
      );
  }
});
