import { getComponentByName } from '@platform/registry';
import type { PrdFieldSpec, ResolvedPrdComponent } from './schema';

const fieldComponentMap = {
  text: 'input',
  longText: 'textarea',
  number: 'InputNumber',
  enum: 'select',
  date: 'datepicker',
  dateRange: 'datepicker',
  status: 'StatusTag',
  attachment: 'upload'
} as const;

export const resolveFieldComponent = (field: PrdFieldSpec): ResolvedPrdComponent => {
  const componentName = fieldComponentMap[field.type];
  const componentSpec = getComponentByName(componentName);

  if (!componentSpec) {
    throw new Error(`No component registered for field type: ${field.type}`);
  }

  return {
    fieldKey: field.key,
    componentName: componentSpec.name
  };
};

export const resolveFieldComponents = (fields: PrdFieldSpec[]): ResolvedPrdComponent[] =>
  fields.map(resolveFieldComponent);
