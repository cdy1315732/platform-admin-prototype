export const shadows = {
  dropdown1: '0 4px 10px rgba(0, 0, 0, 0.1)',
  dropdown2: '0 8px 20px rgba(0, 0, 0, 0.1)',
  backTop: '0 4px 10px rgba(0, 0, 0, 0.1)',
  left1: '-2px 0 5px rgba(0, 0, 0, 0.1)',
  right1: '2px 0 5px rgba(0, 0, 0, 0.1)',
  leftUp1: '-2px -2px 5px rgba(0, 0, 0, 0.1)',
  rightUp1: '2px -2px 5px rgba(0, 0, 0, 0.1)',
  down1: '0 2px 5px rgba(0, 0, 0, 0.1)',
  leftDown1: '-2px 2px 5px rgba(0, 0, 0, 0.1)'
} as const;

export const lineEffects = {
  tabsIndicatorBottom: 'inset 0 -2px 0 #165DFF',
  tabsLineBottom: 'inset 0 -1px 0 rgba(229, 230, 235, 0.1)',
  tabsLineTop: '0 -1px 0 #E5E6EB'
} as const;

export type ShadowToken = typeof shadows;
