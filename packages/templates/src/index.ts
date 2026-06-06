export const templateRegistry = [
  {
    name: 'ListPageTemplate',
    pageType: 'list',
    sections: ['PageHeader', 'QueryForm', 'DataTable', 'Pagination']
  },
  {
    name: 'DetailPageTemplate',
    pageType: 'detail',
    sections: ['PageHeader', 'Descriptions', 'ActionBar']
  },
  {
    name: 'FormModalTemplate',
    pageType: 'form-modal',
    sections: ['ModalHeader', 'Form', 'FooterActions']
  },
  {
    name: 'DetailDrawerTemplate',
    pageType: 'detail-drawer',
    sections: ['DrawerHeader', 'Descriptions', 'FooterActions']
  },
  {
    name: 'ResultPageTemplate',
    pageType: 'result',
    sections: ['Result', 'ActionBar']
  }
] as const;

export type TemplateName = (typeof templateRegistry)[number]['name'];
