export type PrdPageType = 'list' | 'detail' | 'form-modal' | 'detail-drawer' | 'result';

export type PrdFieldType =
  | 'text'
  | 'longText'
  | 'number'
  | 'enum'
  | 'date'
  | 'dateRange'
  | 'status'
  | 'attachment';

export interface PrdFieldSpec {
  key: string;
  label: string;
  type: PrdFieldType;
  required?: boolean;
  options?: string[];
}

export interface PrdActionSpec {
  key: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger' | 'link';
}

export interface PrdPageSpec {
  pageType: PrdPageType;
  title: string;
  fields: PrdFieldSpec[];
  actions: PrdActionSpec[];
}

export interface ResolvedPrdComponent {
  fieldKey: string;
  componentName: string;
}

export interface ResolvedPrdPage {
  title: string;
  templateName: string;
  components: ResolvedPrdComponent[];
  actions: PrdActionSpec[];
}
