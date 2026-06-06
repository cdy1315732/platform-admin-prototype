import { Step as ArcoStep, Steps as ArcoSteps } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

export type PlatformStepsDirection = 'horizontal' | 'vertical';
export type PlatformStepsType = 'default' | 'arrow' | 'dot' | 'navigation';
export type PlatformStepStatus = 'wait' | 'process' | 'finish' | 'error';
export type PlatformStepLabelPlacement = 'horizontal' | 'vertical';

export interface PlatformStepItem {
  title: string;
  description?: string;
  status?: PlatformStepStatus;
}

export const PlatformSteps = defineComponent({
  name: 'PlatformSteps',
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<PlatformStepsType>,
      default: 'default'
    },
    direction: {
      type: String as PropType<PlatformStepsDirection>,
      default: 'horizontal'
    },
    labelPlacement: {
      type: String as PropType<PlatformStepLabelPlacement>,
      default: 'horizontal'
    },
    current: {
      type: Number,
      default: undefined
    },
    defaultCurrent: {
      type: Number,
      default: 1
    },
    status: {
      type: String as PropType<PlatformStepStatus>,
      default: 'process'
    },
    lineLess: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    changeable: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array as PropType<PlatformStepItem[]>,
      default: () => []
    }
  },
  emits: {
    'update:current': (_step: number) => true,
    change: (_step: number, _ev: Event) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoSteps as never,
        {
          ...platformAttrs(attrs, 'components/steps-item', '1:53161', 'platform-steps'),
          type: props.type,
          direction: props.direction,
          labelPlacement: props.labelPlacement,
          current: props.current,
          defaultCurrent: props.defaultCurrent,
          status: props.status,
          lineLess: props.lineLess,
          small: props.small,
          changeable: props.changeable,
          'onUpdate:current': (step: number) => emit('update:current', step),
          onChange: (step: number, ev: Event) => emit('change', step, ev)
        },
        {
          default: () =>
            slots.default?.() ??
            props.items.map((item) =>
              h(ArcoStep as never, {
                key: item.title,
                title: item.title,
                description: item.description,
                status: item.status
              })
            )
        }
      );
  }
});
