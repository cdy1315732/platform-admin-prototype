import { Modal as ArcoModal } from '@arco-design/web-vue';
import { defineComponent, h, type PropType } from 'vue';
import { platformAttrs } from '../shared';

type PopupContainer = string | HTMLElement;
type ClassValue = string | string[];
type StyleValue = string | Record<string, unknown> | Array<Record<string, unknown>>;
type BeforeCloseHandler = (done: (closed: boolean) => void) => boolean | void | Promise<boolean | void>;

export const PlatformModal = defineComponent({
  name: 'PlatformModal',
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
    width: {
      type: [Number, String] as PropType<number | string>,
      default: 520
    },
    top: {
      type: [Number, String] as PropType<number | string | undefined>,
      default: undefined
    },
    mask: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    titleAlign: {
      type: String as PropType<'start' | 'center'>,
      default: 'start'
    },
    alignCenter: {
      type: Boolean,
      default: true
    },
    unmountOnClose: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    hideCancel: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
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
    footer: {
      type: Boolean,
      default: true
    },
    renderToBody: {
      type: Boolean,
      default: true
    },
    popupContainer: {
      type: [String, Object] as PropType<PopupContainer>,
      default: 'body'
    },
    maskStyle: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    },
    modalClass: {
      type: [String, Array] as PropType<ClassValue>,
      default: undefined
    },
    modalStyle: {
      type: Object as PropType<Record<string, unknown>>,
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
    draggable: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    bodyClass: {
      type: [String, Array] as PropType<ClassValue>,
      default: undefined
    },
    bodyStyle: {
      type: [String, Object, Array] as PropType<StyleValue>,
      default: undefined
    },
    hideTitle: {
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
        ArcoModal as never,
        {
          ...platformAttrs(attrs, 'Modal', 'platform-rule:modal', 'platform-modal'),
          visible: props.visible,
          defaultVisible: props.defaultVisible,
          width: props.width,
          top: props.top,
          mask: props.mask,
          title: props.title,
          titleAlign: props.titleAlign,
          alignCenter: props.alignCenter,
          unmountOnClose: props.unmountOnClose,
          maskClosable: props.maskClosable,
          hideCancel: props.hideCancel,
          simple: props.simple,
          closable: props.closable,
          okText: props.okText,
          cancelText: props.cancelText,
          okLoading: props.okLoading,
          okButtonProps: props.okButtonProps,
          cancelButtonProps: props.cancelButtonProps,
          footer: props.footer,
          renderToBody: props.renderToBody,
          popupContainer: props.popupContainer,
          maskStyle: props.maskStyle,
          modalClass: props.modalClass,
          modalStyle: props.modalStyle,
          onBeforeOk: props.onBeforeOk,
          onBeforeCancel: props.onBeforeCancel,
          escToClose: props.escToClose,
          draggable: props.draggable,
          fullscreen: props.fullscreen,
          bodyClass: props.bodyClass,
          bodyStyle: props.bodyStyle,
          hideTitle: props.hideTitle,
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
