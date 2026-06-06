import type { PrdPageSpec, ResolvedPrdPage } from './schema';
import { resolveFieldComponents } from './resolve-components';

const templateMap = {
  list: 'ListPageTemplate',
  detail: 'DetailPageTemplate',
  'form-modal': 'FormModalTemplate',
  'detail-drawer': 'DetailDrawerTemplate',
  result: 'ResultPageTemplate'
} as const;

export const composePage = (page: PrdPageSpec): ResolvedPrdPage => ({
  title: page.title,
  templateName: templateMap[page.pageType],
  components: resolveFieldComponents(page.fields),
  actions: page.actions
});
