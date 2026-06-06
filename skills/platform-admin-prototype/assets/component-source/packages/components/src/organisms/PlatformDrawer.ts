import { Drawer as ArcoDrawer } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

export type PlatformDrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

type PopupContainer = string | HTMLElement;
type ClassValue = string | string[];
type StyleValue = string | Record<string, unknown> | Array<Record<string, unknown>>;
type BeforeCloseHandler = (done: (closed: boolean) => void) => boolean | void | Promise<boolean | void>;

export const PlatformDrawer = defineComponent({
  name: 'PlatformDrawer',
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: undefined
    },
    defaultVisible: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String as PropType<PlatformDrawerPlacement>,
      default: 'right'
    },
    title: {
      type: String,
      default: ''
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    okLoading: {
      type: Boolean,
      default: false
    },
    okButtonProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    cancelButtonProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    unmountOnClose: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String] as PropType<number | string>,
      default: 420
    },
    height: {
      type: [Number, String] as PropType<number | string>,
      default: 360
    },
    popupContainer: {
      type: [String, Object] as PropType<PopupContainer>,
      default: 'body'
    },
    drawerStyle: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    bodyClass: {
      type: [String, Array] as PropType<ClassValue>,
      default: undefined
    },
    bodyStyle: {
      type: [String, Object, Array] as PropType<StyleValue>,
      default: undefined
    },
    onBeforeOk: {
      type: Function as PropType<BeforeCloseHandler>,
      default: undefined
    },
    onBeforeCancel: {
      type: Function as PropType<BeforeCloseHandler>,
      default: undefined
    },
    escToClose: {
      type: Boolean,
      default: true
    },
    renderToBody: {
      type: Boolean,
      default: true
    },
    header: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    hideCancel: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:visible': (_value: boolean) => true,
    ok: (_ev?: Event) => true,
    cancel: (_ev?: Event) => true,
    open: () => true,
    close: () => true,
    beforeOpen: () => true,
    beforeClose: () => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoDrawer as never,
        {
          ...platformAttrs(attrs, 'Drawer', '1:50985', 'platform-drawer'),
          visible: props.visible,
          defaultVisible: props.defaultVisible,
          placement: props.placement,
          title: props.title,
          mask: props.mask,
          maskClosable: props.maskClosable,
          closable: props.closable,
          okText: props.okText,
          cancelText: props.cancelText,
          okLoading: props.okLoading,
          okButtonProps: props.okButtonProps,
          cancelButtonProps: props.cancelButtonProps,
          unmountOnClose: props.unmountOnClose,
          width: props.width,
          height: props.height,
          popupContainer: props.popupContainer,
          drawerStyle: props.drawerStyle,
          bodyClass: props.bodyClass,
          bodyStyle: props.bodyStyle,
          onBeforeOk: props.onBeforeOk,
          onBeforeCancel: props.onBeforeCancel,
          escToClose: props.escToClose,
          renderToBody: props.renderToBody,
          header: props.header,
          footer: props.footer,
          hideCancel: props.hideCancel,
          'onUpdate:visible': (value: boolean) => emit('update:visible', value),
          onOk: (ev?: Event) => emit('ok', ev),
          onCancel: (ev?: Event) => emit('cancel', ev),
          onOpen: () => emit('open'),
          onClose: () => emit('close'),
          onBeforeOpen: () => emit('beforeOpen'),
          onBeforeClose: () => emit('beforeClose')
        },
        slots
      );
  }
});
