export type PrototypePageKind =
  | 'dashboard'
  | 'list'
  | 'form'
  | 'detail'
  | 'category'
  | 'users'
  | 'settings';

export type PrototypePageKey =
  | 'dashboard'
  | 'ticket-list'
  | 'ticket-create'
  | 'ticket-detail'
  | 'category-management'
  | 'user-management'
  | 'system-settings';

export interface PrototypePage {
  key: PrototypePageKey;
  title: string;
  description: string;
  kind: PrototypePageKind;
}

export interface TopNavigationState {
  brand: string;
  system: string;
  section: string;
  current: string;
  notificationCount: number;
  userName: string;
}

export const prototypePages: PrototypePage[] = [
  {
    key: 'dashboard',
    title: '统计仪表盘',
    description: '展示总量、待处理、已解决、超时、分类分布和人员负载。',
    kind: 'dashboard'
  },
  {
    key: 'ticket-list',
    title: '工单列表',
    description: '承载多条件筛选、分页、批量操作、分配、关闭和日志入口。',
    kind: 'list'
  },
  {
    key: 'ticket-create',
    title: '创建工单',
    description: '按 PRD 字段填写标题、分类、优先级、描述、附件和期望完成时间。',
    kind: 'form'
  },
  {
    key: 'ticket-detail',
    title: '工单详情',
    description: '展示工单完整信息、状态流转、处理记录和关联操作。',
    kind: 'detail'
  },
  {
    key: 'category-management',
    title: '分类管理',
    description: '维护最多三级的树形工单分类，支持新增、编辑、删除和排序视图。',
    kind: 'category'
  },
  {
    key: 'user-management',
    title: '人员管理',
    description: '管理人员列表、角色分配、启用禁用状态和当前工单负载。',
    kind: 'users'
  },
  {
    key: 'system-settings',
    title: '系统设置',
    description: '配置基础设置、通知设置和工单规则。',
    kind: 'settings'
  }
];

export const prototypePageKeys = prototypePages.map((page) => page.key);

const secondaryPageKeys: PrototypePageKey[] = ['ticket-create', 'ticket-detail'];
export const prototypeNavigationPages = prototypePages.filter((page) => !secondaryPageKeys.includes(page.key));

export const resolvePrototypePage = (key: string): PrototypePage =>
  prototypePages.find((page) => page.key === key) ?? prototypePages[0];

export const getNavigationTargetForAction = (actionKey: string): PrototypePageKey | undefined => {
  if (actionKey === 'detail') return 'ticket-detail';
  if (actionKey === 'create') return 'ticket-create';
  return undefined;
};

export const getTopNavigationState = (key: string): TopNavigationState => ({
  brand: '后台原型组件平台',
  system: '示例服务台',
  section: '工作台',
  current: resolvePrototypePage(key).title,
  notificationCount: 11,
  userName: '演示管理员'
});
