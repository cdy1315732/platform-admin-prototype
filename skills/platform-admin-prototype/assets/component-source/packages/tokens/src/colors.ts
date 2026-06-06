export const colors = {
  brand: {
    1: '#E8F3FF',
    2: '#BEDAFF',
    3: '#94BFFF',
    4: '#6AA1FF',
    5: '#4080FF',
    6: '#165DFF',
    7: '#0E42D2'
  },
  text: {
    1: '#1D2129',
    2: '#4E5969',
    3: '#86909C',
    4: '#C9CDD4',
    5: '#FFFFFF'
  },
  border: {
    1: '#F2F3F5',
    2: '#E5E6EB',
    3: '#C9CDD4',
    4: '#86909C'
  },
  fill: {
    1: '#F7F8FA',
    2: '#F2F3F5',
    3: '#E5E6EB',
    4: '#C9CDD4',
    5: '#4E5969'
  },
  bg: {
    1: '#FFFFFF'
  },
  success: {
    1: '#E8FFEA',
    2: '#AFF0B5',
    3: '#7BE188',
    5: '#23C343',
    6: '#00B42A',
    7: '#009A29'
  },
  successAlt: {
    1: '#E8FFFB'
  },
  warning: {
    1: '#FFF7E8',
    2: '#FFE4BA',
    3: '#FFCF8B',
    5: '#FF9A2E',
    6: '#FF7D00',
    7: '#D25F00'
  },
  danger: {
    1: '#FFECE8',
    2: '#FDCDC5',
    3: '#FBACA3',
    5: '#F76560',
    6: '#F53F3F',
    7: '#CB2634'
  },
  blue: {
    1: '#E8F7FF',
    2: '#C3E7FE',
    3: '#9FD4FD',
    5: '#57A9FB',
    6: '#3491FA',
    7: '#206CCF'
  }
} as const;

export type ColorToken = typeof colors;
