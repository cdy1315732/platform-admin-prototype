import { mergeProps } from 'vue';

export type PlatformSize = 'mini' | 'small' | 'medium' | 'large';
export type PlatformStatus = 'normal' | 'success' | 'warning' | 'danger';

export const platformAttrs = (
  attrs: Record<string, unknown>,
  componentName: string,
  figmaNodeId: string,
  className: string
) =>
  mergeProps(attrs, {
    class: className,
    'data-platform-component': componentName,
    'data-figma-node-id': figmaNodeId
  });
