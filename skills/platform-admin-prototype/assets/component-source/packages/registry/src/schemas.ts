export type ComponentLevel = 'foundation' | 'atom' | 'molecule' | 'organism' | 'template';

export interface ComponentPropSpec {
  name: string;
  type: string;
  description: string;
}

export interface ComponentSlotSpec {
  name: string;
  description: string;
}

export interface ComponentEventSpec {
  name: string;
  description: string;
}

export interface ComponentExampleSpec {
  name: string;
  description: string;
}

export interface ComponentSpec {
  id: string;
  name: string;
  level: ComponentLevel;
  figmaNodeId?: string;
  arcoVueComponent?: string;
  description: string;
  props: ComponentPropSpec[];
  slots?: ComponentSlotSpec[];
  events?: ComponentEventSpec[];
  tokens?: string[];
  templates?: string[];
  examples: ComponentExampleSpec[];
  status: 'planned' | 'implemented' | 'needs-review';
  source?: 'figma' | 'arco-default' | 'platform-rule';
}

export interface TokenRegistryItem {
  name: string;
  category: 'color' | 'typography' | 'shadow' | 'icon';
  value: string;
  cssVar?: string;
  needsReview?: boolean;
}
