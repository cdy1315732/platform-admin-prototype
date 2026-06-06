export const iconGroups = [
  { name: 'edit', label: '编辑类图标', count: 41 },
  { name: 'general', label: '通用类图标', count: 80 },
  { name: 'direction', label: '方向指示类图标', count: 34 },
  { name: 'media', label: '影音类图标', count: 16 },
  { name: 'interaction', label: '交互按钮类图标', count: 38 },
  { name: 'suggestion', label: '提示建议类图标', count: 17 },
  { name: 'filled', label: '面性图标', count: 25 }
] as const;

export const iconNameSamples = [
  'edit/copy',
  'edit/delete',
  'edit/filter',
  'edit/undo',
  'edit/redo',
  'edit/link',
  'general/menu',
  'general/file-pdf',
  'general/image',
  'general/notification'
] as const;

export type IconName = (typeof iconNameSamples)[number] | (string & {});
