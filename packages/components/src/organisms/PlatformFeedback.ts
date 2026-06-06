import {
  Popover as ArcoPopover,
  Progress as ArcoProgress,
  Result as ArcoResult,
  Timeline as ArcoTimeline,
  Tooltip as ArcoTooltip,
  Upload as ArcoUpload
} from '@arco-design/web-vue';
import { defineComponent, h, type CSSProperties, type PropType } from 'vue';
import { platformAttrs, type PlatformSize, type PlatformStatus } from '../shared';

type PopupPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br' | 'left' | 'lt' | 'lb' | 'right' | 'rt' | 'rb';
type TriggerType = 'hover' | 'click' | 'focus' | 'contextMenu';
type ProgressType = 'line' | 'circle';
type ResultStatus = 'success' | 'warning' | 'error' | 'info' | '403' | '404' | '500' | null;
type TimelineDirection = 'horizontal' | 'vertical';
type TimelineMode = 'left' | 'right' | 'top' | 'bottom' | 'alternate';
type TimelineLabelPosition = 'same' | 'relative';
type TimelineDotType = 'solid' | 'hollow';
type TimelineLineType = 'solid' | 'dashed' | 'dotted';
type TimelineItemPosition = 'left' | 'right' | 'top' | 'bottom';
type UploadListType = 'text' | 'picture-list' | 'picture-card';
type PopupContainer = string | HTMLElement;

export interface PlatformTimelineItem {
  key: string;
  content: string;
  label?: string;
  dotColor?: string;
  dotType?: TimelineDotType;
  lineType?: TimelineLineType;
  lineColor?: string;
  position?: TimelineItemPosition;
}

export type PlatformUploadFileItem = Record<string, unknown>;

export const PlatformTooltip = defineComponent({
  name: 'PlatformTooltip',
  inheritAttrs: false,
  props: {
    popupVisible: {
      type: Boolean,
      default: undefined
    },
    defaultPopupVisible: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    position: {
      type: String as PropType<PopupPosition>,
      default: 'top'
    },
    mini: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: undefined
    },
    popupContainer: {
      type: [String, Object] as PropType<PopupContainer>,
      default: undefined
    },
    contentStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    }
  },
  emits: {
    'update:popupVisible': (_visible: boolean) => true,
    popupVisibleChange: (_visible: boolean) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        'span',
        platformAttrs(attrs, 'Tooltip', '1:17834', 'platform-tooltip'),
        h(
          ArcoTooltip as never,
          {
            popupVisible: props.popupVisible,
            defaultPopupVisible: props.defaultPopupVisible,
            disabled: props.disabled,
            content: props.content,
            position: props.position,
            mini: props.mini,
            backgroundColor: props.backgroundColor,
            popupContainer: props.popupContainer,
            contentStyle: props.contentStyle,
            'onUpdate:popupVisible': (visible: boolean) => emit('update:popupVisible', visible),
            onPopupVisibleChange: (visible: boolean) => emit('popupVisibleChange', visible)
          },
          slots
        )
      );
  }
});

export const PlatformPopover = defineComponent({
  name: 'PlatformPopover',
  inheritAttrs: false,
  props: {
    popupVisible: {
      type: Boolean,
      default: undefined
    },
    defaultPopupVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    trigger: {
      type: [String, Array] as PropType<TriggerType | TriggerType[]>,
      default: 'hover'
    },
    position: {
      type: String as PropType<PopupPosition>,
      default: 'top'
    },
    popupContainer: {
      type: [String, Object] as PropType<PopupContainer>,
      default: undefined
    },
    contentStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    }
  },
  emits: {
    'update:popupVisible': (_visible: boolean) => true,
    popupVisibleChange: (_visible: boolean) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        'span',
        platformAttrs(attrs, 'popover', '1:7449', 'platform-popover'),
        h(
          ArcoPopover as never,
          {
            popupVisible: props.popupVisible,
            defaultPopupVisible: props.defaultPopupVisible,
            title: props.title,
            content: props.content,
            trigger: props.trigger,
            position: props.position,
            popupContainer: props.popupContainer,
            contentStyle: props.contentStyle,
            'onUpdate:popupVisible': (visible: boolean) => emit('update:popupVisible', visible),
            onPopupVisibleChange: (visible: boolean) => emit('popupVisibleChange', visible)
          },
          slots
        )
      );
  }
});

export const PlatformProgress = defineComponent({
  name: 'PlatformProgress',
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<ProgressType>,
      default: 'line'
    },
    size: {
      type: String as PropType<PlatformSize | undefined>,
      default: undefined
    },
    percent: {
      type: Number,
      default: 0
    },
    steps: {
      type: Number,
      default: 0
    },
    animation: {
      type: Boolean,
      default: false
    },
    strokeWidth: {
      type: Number,
      default: undefined
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: undefined
    },
    color: {
      type: [String, Object] as PropType<string | Record<string, string>>,
      default: undefined
    },
    trackColor: {
      type: String,
      default: undefined
    },
    showText: {
      type: Boolean,
      default: true
    },
    status: {
      type: String as PropType<PlatformStatus | undefined>,
      default: undefined
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ArcoProgress as never,
        {
          ...platformAttrs(attrs, 'progress-line', '1:51069', 'platform-progress'),
          ...props
        },
        slots
      );
  }
});

export const PlatformResult = defineComponent({
  name: 'PlatformResult',
  inheritAttrs: false,
  props: {
    status: {
      type: String as PropType<ResultStatus>,
      default: 'info'
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ArcoResult as never,
        {
          ...platformAttrs(attrs, 'Result', '1:51158', 'platform-result'),
          status: props.status,
          title: props.title,
          subtitle: props.subtitle
        },
        slots
      );
  }
});

export const PlatformTimeline = defineComponent({
  name: 'PlatformTimeline',
  inheritAttrs: false,
  props: {
    items: {
      type: Array as PropType<PlatformTimelineItem[]>,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String as PropType<TimelineDirection>,
      default: 'vertical'
    },
    mode: {
      type: String as PropType<TimelineMode>,
      default: 'left'
    },
    pending: {
      type: [Boolean, String] as PropType<boolean | string>,
      default: false
    },
    labelPosition: {
      type: String as PropType<TimelineLabelPosition>,
      default: 'same'
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ArcoTimeline as never,
        {
          ...platformAttrs(attrs, 'timeline', '1:17367', 'platform-timeline'),
          reverse: props.reverse,
          direction: props.direction,
          mode: props.mode,
          pending: props.pending,
          labelPosition: props.labelPosition
        },
        () =>
          slots.default?.() ??
          props.items.map((item) =>
            h(
              (ArcoTimeline as unknown as { Item: unknown }).Item as never,
              {
                key: item.key,
                label: item.label,
                dotColor: item.dotColor,
                dotType: item.dotType,
                lineType: item.lineType,
                lineColor: item.lineColor,
                position: item.position
              },
              () => item.content
            )
          )
      );
  }
});

export const PlatformUpload = defineComponent({
  name: 'PlatformUpload',
  inheritAttrs: false,
  props: {
    fileList: {
      type: Array as PropType<PlatformUploadFileItem[] | undefined>,
      default: undefined
    },
    defaultFileList: {
      type: Array as PropType<PlatformUploadFileItem[]>,
      default: () => []
    },
    accept: {
      type: String,
      default: undefined
    },
    action: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    tip: {
      type: String,
      default: undefined
    },
    limit: {
      type: Number,
      default: 0
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String as PropType<UploadListType>,
      default: 'text'
    },
    showFileList: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    'update:fileList': (_fileList: PlatformUploadFileItem[]) => true,
    change: (_fileList: PlatformUploadFileItem[], _fileItem: PlatformUploadFileItem) => true,
    success: (_fileItem: PlatformUploadFileItem) => true,
    error: (_fileItem: PlatformUploadFileItem) => true,
    preview: (_fileItem: PlatformUploadFileItem) => true
  },
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ArcoUpload as never,
        {
          ...platformAttrs(attrs, 'upload', '1:50739', 'platform-upload'),
          fileList: props.fileList,
          defaultFileList: props.defaultFileList,
          accept: props.accept,
          action: props.action,
          disabled: props.disabled,
          multiple: props.multiple,
          draggable: props.draggable,
          tip: props.tip,
          limit: props.limit,
          autoUpload: props.autoUpload,
          listType: props.listType,
          showFileList: props.showFileList,
          'onUpdate:fileList': (fileList: PlatformUploadFileItem[]) => emit('update:fileList', fileList),
          onChange: (fileList: PlatformUploadFileItem[], fileItem: PlatformUploadFileItem) => emit('change', fileList, fileItem),
          onSuccess: (fileItem: PlatformUploadFileItem) => emit('success', fileItem),
          onError: (fileItem: PlatformUploadFileItem) => emit('error', fileItem),
          onPreview: (fileItem: PlatformUploadFileItem) => emit('preview', fileItem)
        },
        slots
      );
  }
});
