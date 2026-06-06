<script setup lang="ts">
import {
  IconApps,
  IconDownload,
  IconNotification,
  IconPlus,
  IconSearch
} from '@arco-design/web-vue/es/icon';
import { computed, reactive, ref } from 'vue';
import {
  PlatformActionLinkGroup,
  PlatformBreadcrumb,
  PlatformButton,
  PlatformCheckbox,
  PlatformDataTable,
  PlatformDatePicker,
  PlatformDetailDrawerTemplate,
  PlatformDetailPageTemplate,
  PlatformFormItem,
  PlatformInput,
  PlatformInputNumber,
  PlatformInputTag,
  PlatformMenu,
  PlatformModal,
  PlatformPagination,
  PlatformResult,
  PlatformSelect,
  PlatformStatusTag,
  PlatformSwitch,
  PlatformTableAvatarTextCell,
  PlatformTableCheckboxCell,
  PlatformTableSwitchCell,
  PlatformTableTagCell,
  PlatformTextarea,
  PlatformTimeline,
  PlatformUpload,
  type PlatformActionLink,
  type PlatformBreadcrumbItem,
  type PlatformDateModelValue,
  type PlatformInputTagValue,
  type PlatformMenuItem,
  type PlatformSortOrder,
  type PlatformTableColumn,
  type PlatformTemplateAction,
  type PlatformTimelineItem,
  type PlatformUploadFileItem
} from '@platform/components';
import {
  getNavigationTargetForAction,
  getTopNavigationState,
  prototypeNavigationPages,
  resolvePrototypePage,
  type PrototypePageKey
} from './prototype-navigation';
import {
  applyTicketFilters,
  categoryTree,
  getTicketMetrics,
  priorityLabels,
  priorityToTagColor,
  sortTicketRows,
  statusLabels,
  statusToTagStatus,
  ticketRows,
  userRows,
  type CategoryNode,
  type TicketFilters,
  type TicketPriority,
  type TicketRow,
  type TicketStatus,
  type UserRow
} from './prototype-state';

type SettingsTab = 'basic' | 'notice' | 'rules';

const rows = ref<TicketRow[]>(ticketRows.map((row) => ({ ...row })));
const users = ref<UserRow[]>(userRows.map((row) => ({ ...row, roles: [...row.roles] })));
const cloneCategories = (nodes: CategoryNode[]): CategoryNode[] =>
  nodes.map((node) => ({
    ...node,
    children: node.children ? cloneCategories(node.children) : undefined
  }));
const categories = ref<CategoryNode[]>(cloneCategories(categoryTree));
const filters = reactive<TicketFilters>({
  keyword: '',
  status: '',
  priority: '',
  category: '',
  assignee: ''
});
const userFilters = reactive({
  keyword: '',
  role: '',
  enabled: ''
});
const dateRange = ref<PlatformDateModelValue>(['2026-06-02', '2026-06-05']);
const sortOrder = ref<PlatformSortOrder>('none');
const currentPage = ref(1);
const pageSize = ref(5);
const selectedKeys = ref<string[]>([]);
const activePageKey = ref<PrototypePageKey>('dashboard');
const selectedTicketKey = ref('R1008');
const selectedUserKey = ref('U001');
const editModalVisible = ref(false);
const assignModalVisible = ref(false);
const roleModalVisible = ref(false);
const resultModalVisible = ref(false);
const resultOkTarget = ref<PrototypePageKey | ''>('');
const logDrawerVisible = ref(false);
const settingsTab = ref<SettingsTab>('basic');
const lastResultTitle = ref('工单已创建');
const lastResultSubtitle = ref('工单已进入待分配队列，可继续查看列表。');
const eventLogs = ref([
  { time: '10:16', text: 'SR-1008 分配给服务专员 A，进入处理中。' },
  { time: '10:08', text: 'SR-1004 已触发超时标记，等待管理员处理。' },
  { time: '09:42', text: '系统同步新成员账号开通请求。' }
]);

const formModel = reactive({
  title: '',
  category: '设备故障',
  priority: 'medium' as TicketPriority,
  requester: '示例用户 A',
  expectedAt: '2026-06-06',
  description: '',
  tags: ['系统提交'] as PlatformInputTagValue[]
});
const uploadFiles = ref<PlatformUploadFileItem[]>([]);
const editModel = reactive({
  title: '',
  category: '设备故障',
  priority: 'medium' as TicketPriority,
  description: ''
});
const assignModel = reactive({
  assignee: '服务专员 A',
  note: '按当前人员负载手动分配。',
  notify: true
});
const roleModel = reactive({
  requester: false,
  handler: true,
  admin: false
});
const settings = reactive({
  systemName: '示例服务台',
  ticketPrefix: 'SR',
  defaultPageSize: 10,
  maxAttachmentSize: 20,
  uploadFormats: ['jpg', 'png', 'pdf', 'doc', 'xlsx', 'zip'] as PlatformInputTagValue[],
  notifyCreate: true,
  notifyAssign: true,
  notifyStatus: true,
  notifyTimeout: true,
  notifyDaily: false,
  notifySystem: true,
  notifyEmail: true,
  notifyIm: false,
  autoAssign: true,
  assignStrategy: 'round_robin',
  timeoutEnabled: true,
  responseTimeout: 30,
  resolveTimeout: 24,
  timeoutAction: 'notify_admin',
  autoClose: false,
  pendingCloseDays: 7
});

const flattenCategories = (nodes: CategoryNode[]): string[] =>
  nodes.flatMap((node) => [node.name, ...(node.children ? flattenCategories(node.children) : [])]);
const categoryOptions = flattenCategories(categoryTree).map((category) => ({ label: category, value: category }));
const statusOptions = [
  { label: '全部状态', value: '' },
  ...Object.entries(statusLabels).map(([value, label]) => ({ label, value }))
];
const priorityOptions = [
  { label: '全部优先级', value: '' },
  ...Object.entries(priorityLabels).map(([value, label]) => ({ label, value }))
];
const assigneeOptions = [
  { label: '全部处理人', value: '' },
  ...users.value
    .filter((user) => user.roles.includes('处理人员') || user.roles.includes('管理员'))
    .map((user) => ({ label: user.name, value: user.name }))
];
const createAssigneeOptions = assigneeOptions.filter((option) => option.value);
const userRoleFilterOptions = [
  { label: '全部角色', value: '' },
  { label: '普通员工', value: '普通员工' },
  { label: '处理人员', value: '处理人员' },
  { label: '管理员', value: '管理员' }
];
const userStatusFilterOptions = [
  { label: '全部状态', value: '' },
  { label: '启用', value: 'enabled' },
  { label: '禁用', value: 'disabled' }
];
const menuItems: PlatformMenuItem[] = [
  {
    key: 'operation',
    label: '工单工作台',
    children: prototypeNavigationPages.map((page) => ({
      key: page.key,
      label: page.title
    }))
  }
];
const secondaryPageParentMap: Partial<Record<PrototypePageKey, PrototypePageKey>> = {
  'ticket-create': 'ticket-list',
  'ticket-detail': 'ticket-list'
};
const rowActions: PlatformActionLink[] = [
  { key: 'detail', label: '详情' },
  { key: 'edit', label: '编辑' },
  { key: 'assign', label: '分配' },
  { key: 'log', label: '日志' },
  { key: 'close', label: '关闭', danger: true }
];
const detailActions: PlatformTemplateAction[] = [
  { key: 'back', label: '返回列表' },
  { key: 'edit', label: '编辑', type: 'secondary' },
  { key: 'assign', label: '分配处理人', type: 'primary' },
  { key: 'log', label: '操作日志' },
  { key: 'close', label: '关闭工单', type: 'danger' }
];
const workflowSteps = ['待分配', '处理中', '待验证', '已关闭'];
const tableColumns = computed<PlatformTableColumn[]>(() => [
  { title: '', dataIndex: 'selection', slotName: 'selection', width: 40 },
  { title: '工单编号/标题', dataIndex: 'title', slotName: 'ticket', width: 210 },
  { title: '状态', dataIndex: 'status', slotName: 'status', width: 82 },
  { title: '优先级', dataIndex: 'priority', slotName: 'priority', width: 76 },
  { title: '分类', dataIndex: 'category', width: 86 },
  { title: '处理人', dataIndex: 'assignee', slotName: 'assignee', width: 72 },
  { title: '提单人', dataIndex: 'requester', width: 72 },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    slotName: 'createdAt',
    width: 82,
    sortable: {
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortOrder.value === 'none' ? '' : sortOrder.value
    }
  },
  { title: '期望完成', dataIndex: 'expectedAt', slotName: 'expectedAt', width: 82 },
  { title: '操作', dataIndex: 'action', slotName: 'action', width: 232 }
]);
const userColumns: PlatformTableColumn[] = [
  { title: '姓名', dataIndex: 'name', slotName: 'name', width: 160 },
  { title: '工号', dataIndex: 'employeeNo', width: 100 },
  { title: '部门', dataIndex: 'department', width: 120 },
  { title: '角色', dataIndex: 'roles', slotName: 'roles', width: 180 },
  { title: '当前工单', dataIndex: 'currentTickets', width: 100 },
  { title: '状态', dataIndex: 'enabled', slotName: 'enabled', width: 90 },
  { title: '操作', dataIndex: 'action', slotName: 'action', width: 140 }
];

const activePage = computed(() => resolvePrototypePage(activePageKey.value));
const topNavigation = computed(() => getTopNavigationState(activePageKey.value));
const activeMenuKey = computed(() => secondaryPageParentMap[activePage.value.key] ?? activePage.value.key);
const topBreadcrumbItems = computed<PlatformBreadcrumbItem[]>(() => {
  const root = { label: '工作台', path: 'dashboard' };
  if (activePageKey.value === 'dashboard') return [root];

  const parentKey = secondaryPageParentMap[activePageKey.value];
  if (parentKey) {
    const parentPage = resolvePrototypePage(parentKey);
    return [
      root,
      { label: parentPage.title, path: parentPage.key },
      { label: topNavigation.value.current, path: activePageKey.value }
    ];
  }

  return [root, { label: topNavigation.value.current, path: activePageKey.value }];
});
const selectedTicket = computed(() => rows.value.find((row) => row.key === selectedTicketKey.value) ?? rows.value[0]);
const selectedUser = computed(() => users.value.find((user) => user.key === selectedUserKey.value) ?? users.value[0]);
const metrics = computed(() => getTicketMetrics(rows.value));
const pendingCount = computed(
  () => metrics.value.unassigned + metrics.value.processing + rows.value.filter((row) => row.status === 'pending').length
);
const resolutionRate = computed(() => Math.round((metrics.value.closed / Math.max(metrics.value.total, 1)) * 100));
const dateValueToTime = (value: unknown): number | undefined => {
  if (!value) return undefined;
  if (value instanceof Date) return value.getTime();

  const date = new Date(String(value).replace(' ', 'T'));
  const time = date.getTime();
  return Number.isNaN(time) ? undefined : time;
};
const rowsInDateRange = (sourceRows: TicketRow[]) => {
  const range = Array.isArray(dateRange.value) ? dateRange.value : [];
  const start = dateValueToTime(range[0]);
  const end = dateValueToTime(range[1]);

  if (start === undefined || end === undefined) return sourceRows;

  return sourceRows.filter((row) => {
    const rowTime = dateValueToTime(row.createdAt);
    return rowTime !== undefined && rowTime >= start && rowTime <= end + 24 * 60 * 60 * 1000 - 1;
  });
};
const filteredRows = computed(() => {
  const byBasicFilters = applyTicketFilters(rows.value, filters);
  return sortTicketRows(rowsInDateRange(byBasicFilters), sortOrder.value);
});
const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredRows.value.slice(start, start + pageSize.value);
});
const urgentRows = computed(() => rows.value.filter((row) => row.priority === 'urgent' || row.status === 'timeout').slice(0, 4));
const selectedSummary = computed(() =>
  selectedKeys.value.length ? `已选择 ${selectedKeys.value.length} 项` : '尚未选择工单'
);
const categoryDistribution = computed(() =>
  flattenCategories(categoryTree)
    .slice(0, 5)
    .map((category) => ({
      category,
      count: rows.value.filter((row) => row.category === category).length
    }))
);
const detailTimeline = computed<PlatformTimelineItem[]>(() => [
  {
    key: 'created',
    label: selectedTicket.value.createdAt,
    content: `${selectedTicket.value.requester} 提交工单，来源为${selectedTicket.value.source}。`,
    dotColor: 'blue'
  },
  {
    key: 'assign',
    label: selectedTicket.value.assignee ? '已分配' : '待分配',
    content: selectedTicket.value.assignee
      ? `工单分配给 ${selectedTicket.value.assignee}。`
      : '等待管理员或系统自动分配处理人。',
    dotColor: selectedTicket.value.assignee ? 'green' : 'gray'
  },
  {
    key: 'status',
    label: selectedTicket.value.updatedAt,
    content: `当前状态：${statusLabels[selectedTicket.value.status]}，优先级：${priorityLabels[selectedTicket.value.priority]}。`,
    dotColor: selectedTicket.value.status === 'timeout' ? 'red' : 'orange'
  }
]);
const workflowActiveIndex = computed(() => {
  if (selectedTicket.value.status === 'closed') return 3;
  if (selectedTicket.value.status === 'pending') return 2;
  if (selectedTicket.value.status === 'processing' || selectedTicket.value.status === 'timeout') return 1;
  return 0;
});

const pushLog = (text: string) => {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  eventLogs.value = [{ time, text }, ...eventLogs.value].slice(0, 6);
};
const navigateTo = (key: string) => {
  activePageKey.value = resolvePrototypePage(key).key;
  logDrawerVisible.value = false;
};
const handleBreadcrumbClick = (item: PlatformBreadcrumbItem) => {
  if (!item.path || item.path === activePageKey.value) return;
  navigateTo(item.path);
};
const resetPagination = () => {
  currentPage.value = 1;
};
const queryRows = () => {
  resetPagination();
  navigateTo('ticket-list');
  pushLog(`执行工单查询，命中 ${filteredRows.value.length} 条数据。`);
};
const resetFilters = () => {
  filters.keyword = '';
  filters.status = '';
  filters.priority = '';
  filters.category = '';
  filters.assignee = '';
  dateRange.value = ['2026-06-02', '2026-06-05'];
  selectedKeys.value = [];
  resetPagination();
  pushLog('筛选条件已重置。');
};
const updateSortOrder = (order: PlatformSortOrder) => {
  sortOrder.value = order;
  resetPagination();
  pushLog(order === 'none' ? '取消创建时间排序。' : `创建时间切换为${order === 'ascend' ? '升序' : '降序'}。`);
};
const handleTableSorterChange = (dataIndex: string, direction: 'ascend' | 'descend' | '') => {
  if (dataIndex !== 'createdAt') return;

  updateSortOrder(direction || 'none');
};
const toggleSelection = (key: string, selected: unknown) => {
  const checked = Boolean(selected);
  selectedKeys.value = checked
    ? Array.from(new Set([...selectedKeys.value, key]))
    : selectedKeys.value.filter((selectedKey) => selectedKey !== key);
};
const selectTicket = (row: TicketRow) => {
  selectedTicketKey.value = row.key;
};
const openTicketDetail = (row: TicketRow) => {
  selectTicket(row);
  navigateTo('ticket-detail');
  pushLog(`进入 ${row.ticketNo} 详情页。`);
};
const resetCreateForm = () => {
  formModel.title = '';
  formModel.category = '设备故障';
  formModel.priority = 'medium';
  formModel.requester = '示例用户 A';
  formModel.expectedAt = '2026-06-06';
  formModel.description = '';
  formModel.tags = ['系统提交'];
  uploadFiles.value = [];
};
const startCreate = () => {
  resetCreateForm();
  navigateTo(getNavigationTargetForAction('create') ?? 'ticket-create');
};
const submitCreate = () => {
  const nextNumber = rows.value.length + 1001;
  const ticketNo = `SR-${String(nextNumber).padStart(4, '0')}`;
  const created: TicketRow = {
    key: `R${String(nextNumber).padStart(4, '0')}`,
    ticketNo,
    title: formModel.title.trim() || '未命名工单',
    status: 'unassigned',
    priority: formModel.priority,
    category: formModel.category,
    assignee: '',
    requester: formModel.requester,
    department: '综合服务部',
    source: String(formModel.tags[0] ?? '系统提交'),
    createdAt: '2026-06-05 16:30',
    expectedAt: `${formModel.expectedAt} 18:00`,
    updatedAt: '2026-06-05 16:30',
    description: formModel.description,
    attachments: uploadFiles.value.length
  };

  rows.value = [created, ...rows.value];
  selectTicket(created);
  lastResultTitle.value = '工单已创建';
  lastResultSubtitle.value = `${created.ticketNo} 已进入待分配队列，提单人可在列表页查看进度。`;
  pushLog(`${created.ticketNo} 已创建。`);
  showResultModal(lastResultTitle.value, lastResultSubtitle.value, 'ticket-list');
};
const showResultModal = (title: string, subtitle: string, okTarget: PrototypePageKey | '' = '') => {
  lastResultTitle.value = title;
  lastResultSubtitle.value = subtitle;
  resultOkTarget.value = okTarget;
  resultModalVisible.value = true;
};
const openEditModal = (row = selectedTicket.value) => {
  selectTicket(row);
  editModel.title = row.title;
  editModel.category = row.category;
  editModel.priority = row.priority;
  editModel.description = row.description;
  editModalVisible.value = true;
};
const submitEdit = () => {
  const row = rows.value.find((item) => item.key === selectedTicketKey.value);
  if (!row) return;

  row.title = editModel.title.trim() || row.title;
  row.category = editModel.category;
  row.priority = editModel.priority;
  row.description = editModel.description;
  row.updatedAt = '2026-06-05 16:40';
  editModalVisible.value = false;
  showResultModal('工单信息已更新', `${row.ticketNo} 的分类、优先级和描述已保存。`);
  pushLog(`${row.ticketNo} 信息已更新。`);
};
const openAssignModal = (row = selectedTicket.value) => {
  selectTicket(row);
  assignModel.assignee = row.assignee || '服务专员 A';
  assignModel.note = '按当前人员负载手动分配。';
  assignModel.notify = true;
  assignModalVisible.value = true;
};
const submitAssign = () => {
  const row = rows.value.find((item) => item.key === selectedTicketKey.value);
  if (!row) return;

  row.assignee = assignModel.assignee;
  row.status = 'processing';
  row.updatedAt = '2026-06-05 16:42';
  assignModalVisible.value = false;
  showResultModal('工单已分配', `${row.ticketNo} 已分配给 ${row.assignee}${assignModel.notify ? '，系统已发送通知。' : '。'}`);
  pushLog(`${row.ticketNo} 分配给 ${row.assignee}。`);
};
const openLogDrawer = (row = selectedTicket.value) => {
  selectTicket(row);
  logDrawerVisible.value = true;
};
const closeTicket = (row = selectedTicket.value) => {
  row.status = 'closed';
  row.updatedAt = '2026-06-05 16:45';
  showResultModal('工单已关闭', `${row.ticketNo} 已完成处理，操作日志已记录。`);
  pushLog(`${row.ticketNo} 已关闭。`);
};
const handleRowAction = (row: TicketRow, action: PlatformActionLink) => {
  const target = getNavigationTargetForAction(action.key);
  if (target === 'ticket-detail') openTicketDetail(row);
  if (action.key === 'edit') openEditModal(row);
  if (action.key === 'assign') openAssignModal(row);
  if (action.key === 'log') openLogDrawer(row);
  if (action.key === 'close') closeTicket(row);
};
const handleDetailAction = (key: string) => {
  if (key === 'back') navigateTo('ticket-list');
  if (key === 'edit') openEditModal();
  if (key === 'assign') openAssignModal();
  if (key === 'log') openLogDrawer();
  if (key === 'close') closeTicket();
};
const confirmResultModal = () => {
  resultModalVisible.value = false;
  if (resultOkTarget.value) navigateTo(resultOkTarget.value);
  resultOkTarget.value = '';
};
const dismissResultModal = () => {
  resultModalVisible.value = false;
  resultOkTarget.value = '';
};
const batchAssign = () => {
  if (!selectedKeys.value.length) return;
  selectedTicketKey.value = selectedKeys.value[0];
  openAssignModal();
};
const batchClose = () => {
  if (!selectedKeys.value.length) return;
  rows.value.forEach((row) => {
    if (selectedKeys.value.includes(row.key)) row.status = 'closed';
  });
  const closedCount = selectedKeys.value.length;
  selectedKeys.value = [];
  showResultModal('批量操作已完成', `已关闭 ${closedCount} 条工单。`);
};
const openRoleModal = (user: UserRow) => {
  selectedUserKey.value = user.key;
  roleModel.requester = user.roles.includes('普通员工');
  roleModel.handler = user.roles.includes('处理人员');
  roleModel.admin = user.roles.includes('管理员');
  roleModalVisible.value = true;
};
const submitRoles = () => {
  const user = selectedUser.value;
  user.roles = [
    roleModel.requester ? '普通员工' : '',
    roleModel.handler ? '处理人员' : '',
    roleModel.admin ? '管理员' : ''
  ].filter(Boolean);
  roleModalVisible.value = false;
  showResultModal('角色已更新', `${user.name} 的角色权限已保存。`);
};
const setUserEnabled = (user: UserRow, enabled: unknown) => {
  user.enabled = Boolean(enabled);
  pushLog(`${user.name} 已${user.enabled ? '启用' : '禁用'}。`);
};
const removeCategoryByKey = (nodes: CategoryNode[], key: string): CategoryNode[] =>
  nodes
    .filter((node) => node.key !== key)
    .map((node) => ({
      ...node,
      children: node.children ? removeCategoryByKey(node.children, key) : undefined
    }));
const setCategoryEnabled = (node: CategoryNode, enabled: unknown) => {
  node.enabled = Boolean(enabled);
  pushLog(`${node.name} 分类已${node.enabled ? '启用' : '停用'}。`);
};
const handleCategoryAction = (action: 'create' | 'add' | 'edit' | 'delete', node?: CategoryNode) => {
  if (action === 'create') {
    const next = categories.value.length + 1;
    categories.value = [
      ...categories.value,
      { key: `custom-${next}`, name: `新分类 ${next}`, count: 0, enabled: true }
    ];
    showResultModal('一级分类已添加', `新分类 ${next} 已加入分类树，可继续编辑名称和状态。`);
    pushLog(`新增一级分类：新分类 ${next}。`);
    return;
  }

  if (!node) return;

  if (action === 'add') {
    const next = (node.children?.length ?? 0) + 1;
    node.children = [
      ...(node.children ?? []),
      { key: `${node.key}-custom-${next}`, name: `新子分类 ${next}`, count: 0, enabled: true }
    ];
    showResultModal('子分类已添加', `${node.name} 下已新增「新子分类 ${next}」。`);
    pushLog(`${node.name} 新增子分类。`);
    return;
  }

  if (action === 'edit') {
    node.name = node.name.includes('已编辑') ? node.name : `${node.name}（已编辑）`;
    showResultModal('分类已编辑', `${node.name} 的展示名称已更新。`);
    pushLog(`${node.name} 已编辑。`);
    return;
  }

  categories.value = removeCategoryByKey(categories.value, node.key);
  showResultModal('分类已删除', `${node.name} 已从分类树中移除。`);
  pushLog(`${node.name} 已删除。`);
};
const saveSettings = () => {
  showResultModal('设置已保存', `已保存「${settingsTab.value === 'basic' ? '基础设置' : settingsTab.value === 'notice' ? '通知设置' : '工单规则'}」。`);
};
const statusLabel = (status: TicketStatus) => statusLabels[status];
const priorityLabel = (priority: TicketPriority) => priorityLabels[priority];
const shortDate = (value: string) => value.slice(5, 10);
</script>

<template>
  <div class="admin-frame" data-page="ticket-admin-system">
    <header class="global-topbar">
      <div class="topbar-brand">
        <span class="topbar-logo"><IconApps /></span>
        <strong>{{ topNavigation.brand }}</strong>
      </div>
      <PlatformBreadcrumb
        class="topbar-breadcrumb"
        :items="topBreadcrumbItems"
        @item-click="handleBreadcrumbClick"
      />
      <div class="topbar-actions">
        <button class="topbar-icon-button" type="button" aria-label="搜索">
          <IconSearch />
        </button>
        <a-badge :count="topNavigation.notificationCount" class="topbar-notification">
          <button class="topbar-icon-button" type="button" aria-label="通知">
            <IconNotification />
          </button>
        </a-badge>
        <a-avatar :size="28" class="topbar-avatar">演</a-avatar>
        <span class="topbar-user">{{ topNavigation.userName }}</span>
      </div>
    </header>

    <a-layout class="platform-shell">
    <a-layout-sider :width="248" class="platform-sider">
      <PlatformMenu
        :items="menuItems"
        :selected-keys="[activeMenuKey]"
        :default-open-keys="['operation']"
        auto-open-selected
        @menu-item-click="navigateTo"
      />
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="platform-header">
        <div>
          <h1>{{ activePage.title }}</h1>
          <p>{{ activePage.description }}</p>
        </div>
      </a-layout-header>

      <a-layout-content class="platform-content">
        <section v-if="activePage.kind === 'dashboard'" class="page-view dashboard-view" data-view="dashboard">
          <section class="metrics" aria-label="工单指标">
            <article>
              <span>工单总量</span>
              <strong>{{ metrics.total }}</strong>
              <small>当前样例数据</small>
            </article>
            <article>
              <span>待处理</span>
              <strong>{{ pendingCount }}</strong>
              <small>待分配/处理中/待验证</small>
            </article>
            <article>
              <span>已解决</span>
              <strong>{{ metrics.closed }}</strong>
              <small>解决率 {{ resolutionRate }}%</small>
            </article>
            <article>
              <span>已超时</span>
              <strong>{{ metrics.timeout }}</strong>
              <small>需管理员介入</small>
            </article>
          </section>

          <div class="dashboard-grid">
            <div class="dashboard-column dashboard-column-main">
              <section class="work-card work-card-large">
                <div class="card-heading">
                  <div>
                    <h2>紧急与超时工单</h2>
                    <p>优先展示紧急、超时或高优先级工单。</p>
                  </div>
                  <PlatformButton type="text" @click="navigateTo('ticket-list')">查看全部</PlatformButton>
                </div>
                <div class="review-list">
                  <button
                    v-for="row in urgentRows"
                    :key="row.key"
                    type="button"
                    class="review-item ticket-review-item"
                    @click="openTicketDetail(row)"
                  >
                    <span class="review-name">{{ row.ticketNo }} · {{ row.title }}</span>
                    <span class="status-dot-label" :data-status="row.status">{{ statusLabel(row.status) }}</span>
                    <PlatformTableTagCell :label="priorityLabel(row.priority)" :color="priorityToTagColor(row.priority)" bordered />
                    <span>{{ row.assignee || '待分配' }}</span>
                  </button>
                </div>
              </section>

              <section class="work-card">
                <div class="card-heading compact">
                  <h2>最近操作</h2>
                </div>
                <ol class="event-list">
                  <li v-for="item in eventLogs" :key="`${item.time}-${item.text}`">
                    <time>{{ item.time }}</time>
                    <span>{{ item.text }}</span>
                  </li>
                </ol>
              </section>
            </div>

            <div class="dashboard-column dashboard-column-side">
              <section class="work-card">
                <div class="card-heading compact">
                  <h2>快捷入口</h2>
                </div>
                <div class="quick-actions">
                  <PlatformButton type="primary" long @click="navigateTo('ticket-list')">进入工单列表</PlatformButton>
                  <PlatformButton long @click="startCreate">创建工单</PlatformButton>
                  <PlatformButton long @click="navigateTo('system-settings')">系统设置</PlatformButton>
                </div>
              </section>

              <section class="work-card">
                <div class="card-heading compact">
                  <h2>分类分布</h2>
                </div>
                <div class="distribution-list">
                  <div v-for="item in categoryDistribution" :key="item.category" class="distribution-row">
                    <span>{{ item.category }}</span>
                    <div><i :style="{ width: `${Math.max(item.count * 36, 20)}px` }" /></div>
                    <strong>{{ item.count }}</strong>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section v-else-if="activePage.kind === 'list'" class="page-view list-view" data-view="ticket-list">
          <section class="filter-card" aria-label="筛选区">
            <a-form :model="filters" layout="inline" class="query-row">
              <PlatformFormItem label="状态" field="status">
                <PlatformSelect v-model="filters.status" :options="statusOptions" />
              </PlatformFormItem>
              <PlatformFormItem label="优先级" field="priority">
                <PlatformSelect v-model="filters.priority" :options="priorityOptions" />
              </PlatformFormItem>
              <PlatformFormItem label="分类" field="category">
                <PlatformSelect v-model="filters.category" :options="[{ label: '全部分类', value: '' }, ...categoryOptions]" />
              </PlatformFormItem>
              <PlatformFormItem label="处理人" field="assignee">
                <PlatformSelect v-model="filters.assignee" :options="assigneeOptions" />
              </PlatformFormItem>
              <PlatformFormItem label="创建时间" field="dateRange" class="range-form-item">
                <PlatformDatePicker v-model="dateRange" range :placeholder="['起始日期', '结束日期']" />
              </PlatformFormItem>
              <PlatformFormItem label="关键词" field="keyword">
                <PlatformInput v-model="filters.keyword" placeholder="工单编号/标题/提单人" @press-enter="queryRows" />
              </PlatformFormItem>
              <PlatformFormItem label=" " class="query-actions-item">
                <div class="query-actions">
                  <PlatformButton type="primary" @click="queryRows"><IconSearch /> 搜索</PlatformButton>
                  <PlatformButton @click="resetFilters">重置</PlatformButton>
                </div>
              </PlatformFormItem>
            </a-form>
          </section>

          <section class="table-card">
            <div class="card-heading table-heading">
              <div>
                <h2>工单数据</h2>
              </div>
              <div class="platform-template-actions">
                <PlatformButton type="secondary" @click="pushLog(`导出当前 ${filteredRows.length} 条工单。`)">
                  <IconDownload /> 导出数据
                </PlatformButton>
                <PlatformButton type="primary" @click="startCreate">
                  <IconPlus /> 创建工单
                </PlatformButton>
              </div>
            </div>

            <PlatformDataTable
              row-key="key"
              :columns="tableColumns"
              :data="pagedRows"
              :bordered="false"
              class="ticket-table"
              @sorter-change="handleTableSorterChange"
            >
              <template #selection="{ record }">
                <PlatformTableCheckboxCell
                  :model-value="selectedKeys.includes(record.key)"
                  @update:model-value="toggleSelection(record.key, $event)"
                />
              </template>
              <template #ticket="{ record }">
                <PlatformTableAvatarTextCell
                  :text="record.title"
                  :secondary="record.ticketNo"
                  :avatar-text="record.ticketNo.slice(-2)"
                  @click="openTicketDetail(record)"
                />
              </template>
              <template #status="{ record }">
                <PlatformStatusTag :status="statusToTagStatus(record.status)" :label="statusLabel(record.status)" />
              </template>
              <template #priority="{ record }">
                <PlatformTableTagCell :label="priorityLabel(record.priority)" :color="priorityToTagColor(record.priority)" bordered />
              </template>
              <template #assignee="{ record }">
                <span :class="{ 'empty-text': !record.assignee }">{{ record.assignee || '--' }}</span>
              </template>
              <template #createdAt="{ record }">
                <span class="date-cell">{{ shortDate(record.createdAt) }}</span>
              </template>
              <template #expectedAt="{ record }">
                <span class="date-cell">{{ shortDate(record.expectedAt) }}</span>
              </template>
              <template #action="{ record }">
                <PlatformActionLinkGroup :actions="rowActions" @action="handleRowAction(record, $event)" />
              </template>
            </PlatformDataTable>

            <div class="pagination-row">
              <div class="selection-footer">
                <span>{{ selectedSummary }}</span>
                <div v-if="selectedKeys.length" class="bulk-actions">
                  <PlatformButton :disabled="!selectedKeys.length" @click="batchAssign">批量分配</PlatformButton>
                  <PlatformButton :disabled="!selectedKeys.length" @click="batchClose">批量关闭</PlatformButton>
                  <PlatformButton :disabled="!selectedKeys.length" status="danger" @click="selectedKeys = []">批量删除</PlatformButton>
                </div>
              </div>
              <PlatformPagination
                :total="filteredRows.length"
                :current="currentPage"
                :page-size="pageSize"
                @change="currentPage = $event"
                @page-size-change="pageSize = $event"
              />
            </div>
          </section>
        </section>
        <section v-else-if="activePage.kind === 'form'" class="page-view" data-view="ticket-create">
          <section class="form-page-card">
            <div class="form-card-header">
              <h2>创建工单</h2>
              <p>提单人 3 分钟内完成提交，系统自动生成 TK 编号。</p>
            </div>
            <a-form :model="formModel" layout="vertical" class="page-form">
              <PlatformFormItem label="标题" field="title">
                <PlatformInput v-model="formModel.title" placeholder="请输入工单标题，100字符以内" />
              </PlatformFormItem>
              <div class="page-form-grid">
                <PlatformFormItem label="分类" field="category">
                  <PlatformSelect v-model="formModel.category" :options="categoryOptions" />
                </PlatformFormItem>
                <PlatformFormItem label="优先级" field="priority">
                  <PlatformSelect v-model="formModel.priority" :options="priorityOptions.filter((item) => item.value)" />
                </PlatformFormItem>
                <PlatformFormItem label="提单人" field="requester">
                  <PlatformInput v-model="formModel.requester" placeholder="请输入提单人" />
                </PlatformFormItem>
                <PlatformFormItem label="期望完成时间" field="expectedAt">
                  <PlatformDatePicker v-model="formModel.expectedAt" placeholder="选择日期" />
                </PlatformFormItem>
              </div>
              <PlatformFormItem label="来源标签" field="tags">
                <PlatformInputTag v-model="formModel.tags" placeholder="输入来源后回车" />
              </PlatformFormItem>
              <PlatformFormItem label="问题描述" field="description">
                <PlatformTextarea
                  v-model="formModel.description"
                  placeholder="请描述问题现象、影响范围、已尝试的处理方式"
                  :max-length="{ length: 500 }"
                  show-word-limit
                  :auto-size="{ minRows: 6, maxRows: 10 }"
                />
              </PlatformFormItem>
              <PlatformFormItem label="附件" field="attachments">
                <PlatformUpload
                  v-model:file-list="uploadFiles"
                  class="ticket-upload"
                  action="/"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xlsx,.zip,.log"
                  :limit="5"
                  :tip="`支持截图、日志、报错文件，单个文件不超过 ${settings.maxAttachmentSize}MB。`"
                />
              </PlatformFormItem>
              <div class="form-actions">
                <PlatformButton @click="navigateTo('ticket-list')">取消</PlatformButton>
                <PlatformButton type="primary" @click="submitCreate">提交工单</PlatformButton>
              </div>
            </a-form>
          </section>
        </section>

        <section v-else-if="activePage.kind === 'detail'" class="page-view" data-view="ticket-detail">
          <PlatformDetailPageTemplate
            class="detail-page-card"
            :title="`${selectedTicket.ticketNo} · ${selectedTicket.title}`"
            :subtitle="`${selectedTicket.requester} / ${selectedTicket.department} / ${selectedTicket.source}`"
            :actions="detailActions"
            :show-back="false"
            @action="handleDetailAction"
          >
            <template #summary>
              <section class="detail-summary">
                <article>
                  <span>状态</span>
                  <strong class="status-dot-label detail-status-dot" :data-status="selectedTicket.status">
                    {{ statusLabel(selectedTicket.status) }}
                  </strong>
                </article>
                <article>
                  <span>优先级</span>
                  <PlatformTableTagCell
                    :label="priorityLabel(selectedTicket.priority)"
                    :color="priorityToTagColor(selectedTicket.priority)"
                    bordered
                  />
                </article>
                <article>
                  <span>分类</span>
                  <strong>{{ selectedTicket.category }}</strong>
                </article>
                <article>
                  <span>处理人</span>
                  <strong>{{ selectedTicket.assignee || '待分配' }}</strong>
                </article>
              </section>
            </template>

            <section class="workflow-steps" aria-label="工单流转流程">
              <div
                v-for="(step, index) in workflowSteps"
                :key="step"
                class="workflow-step"
                :class="{ active: index === workflowActiveIndex, done: index < workflowActiveIndex }"
              >
                <i>{{ index + 1 }}</i>
                <span>{{ step }}</span>
              </div>
            </section>

            <div class="detail-sections">
              <section class="work-card">
                <div class="card-heading compact">
                  <h2>工单信息</h2>
                </div>
                <dl class="info-grid">
                  <div>
                    <dt>工单编号</dt>
                    <dd>{{ selectedTicket.ticketNo }}</dd>
                  </div>
                  <div>
                    <dt>创建时间</dt>
                    <dd>{{ selectedTicket.createdAt }}</dd>
                  </div>
                  <div>
                    <dt>期望完成</dt>
                    <dd>{{ selectedTicket.expectedAt }}</dd>
                  </div>
                  <div>
                    <dt>附件数量</dt>
                    <dd>{{ selectedTicket.attachments }} 个</dd>
                  </div>
                </dl>
                <div class="description-box">{{ selectedTicket.description }}</div>
              </section>

              <section class="work-card">
                <div class="card-heading compact">
                  <h2>处理时间线</h2>
                </div>
                <PlatformTimeline :items="detailTimeline" pending="等待下一步流转" />
              </section>
            </div>
          </PlatformDetailPageTemplate>
        </section>

        <section v-else-if="activePage.kind === 'category'" class="page-view" data-view="category-management">
          <section class="work-card category-card">
            <div class="card-heading category-heading">
              <div>
                <h2>工单分类管理</h2>
                <p>最多三级分类树，支持新增一级分类、添加子分类、编辑、删除和排序视图。</p>
              </div>
              <PlatformButton type="primary" @click="handleCategoryAction('create')">
                <IconPlus /> 新增一级分类
              </PlatformButton>
            </div>
            <div v-for="node in categories" :key="node.key" class="category-node">
              <div class="category-node-row">
                <div>
                  <strong>{{ node.name }}</strong>
                  <span>{{ node.count }} 条关联工单</span>
                </div>
                <div class="category-actions">
                  <PlatformSwitch v-model="node.enabled" class="category-switch" size="small" @change="setCategoryEnabled(node, $event)" />
                  <PlatformButton type="text" @click="handleCategoryAction('add', node)">添加子分类</PlatformButton>
                  <PlatformButton type="text" @click="handleCategoryAction('edit', node)">编辑</PlatformButton>
                  <PlatformButton type="text" status="danger" @click="handleCategoryAction('delete', node)">删除</PlatformButton>
                </div>
              </div>
              <div v-if="node.children" class="category-children">
                <div v-for="child in node.children" :key="child.key" class="category-node-row child">
                  <div>
                    <strong>{{ child.name }}</strong>
                    <span>{{ child.count }} 条关联工单</span>
                  </div>
                  <div class="category-actions">
                    <PlatformSwitch v-model="child.enabled" class="category-switch" size="small" @change="setCategoryEnabled(child, $event)" />
                    <PlatformButton type="text" @click="handleCategoryAction('edit', child)">编辑</PlatformButton>
                    <PlatformButton type="text" status="danger" @click="handleCategoryAction('delete', child)">删除</PlatformButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section v-else-if="activePage.kind === 'users'" class="page-view" data-view="user-management">
          <section class="filter-card compact-filter">
            <PlatformInput v-model="userFilters.keyword" placeholder="搜索姓名或工号" />
            <PlatformSelect v-model="userFilters.role" :options="userRoleFilterOptions" />
            <PlatformSelect v-model="userFilters.enabled" :options="userStatusFilterOptions" />
            <PlatformButton type="primary"><IconSearch /> 搜索</PlatformButton>
          </section>
          <section class="table-card">
            <div class="card-heading table-heading">
              <div>
                <h2>人员列表</h2>
              </div>
              <PlatformButton type="primary"><IconPlus /> 添加人员</PlatformButton>
            </div>
            <PlatformDataTable row-key="key" :columns="userColumns" :data="users" :bordered="false" class="user-table">
              <template #name="{ record }">
                <PlatformTableAvatarTextCell :text="record.name" :secondary="record.email" :avatar-text="record.name.slice(0, 1)" />
              </template>
              <template #roles="{ record }">
                <div class="role-tags">
                  <PlatformTableTagCell v-for="role in record.roles" :key="role" :label="role" color="arcoblue" bordered />
                </div>
              </template>
              <template #enabled="{ record }">
                <PlatformTableSwitchCell :model-value="record.enabled" @update:model-value="setUserEnabled(record, $event)" />
              </template>
              <template #action="{ record }">
                <PlatformActionLinkGroup
                  :actions="[
                    { key: 'edit', label: '编辑' },
                    { key: 'role', label: '角色' }
                  ]"
                  @action="($event.key === 'role' ? openRoleModal(record) : pushLog(`${record.name} 基本信息编辑弹窗已打开。`))"
                />
              </template>
            </PlatformDataTable>
          </section>
        </section>

        <section v-else-if="activePage.kind === 'settings'" class="page-view" data-view="system-settings">
          <section class="settings-layout">
            <nav class="settings-tabs">
              <button :class="{ active: settingsTab === 'basic' }" @click="settingsTab = 'basic'">基础设置</button>
              <button :class="{ active: settingsTab === 'notice' }" @click="settingsTab = 'notice'">通知设置</button>
              <button :class="{ active: settingsTab === 'rules' }" @click="settingsTab = 'rules'">工单规则</button>
            </nav>
            <section class="form-page-card settings-card">
              <div class="form-card-header settings-card-header">
                <h2>系统设置</h2>
              </div>
              <a-form v-if="settingsTab === 'basic'" :model="settings" layout="vertical" class="page-form">
                <PlatformFormItem label="系统名称">
                  <PlatformInput v-model="settings.systemName" />
                </PlatformFormItem>
                <div class="page-form-grid">
                  <PlatformFormItem label="工单编号前缀">
                    <PlatformInput v-model="settings.ticketPrefix" />
                  </PlatformFormItem>
                  <PlatformFormItem label="每页显示条数">
                    <PlatformSelect
                      v-model="settings.defaultPageSize"
                      :options="[
                        { label: '10', value: 10 },
                        { label: '20', value: 20 },
                        { label: '50', value: 50 },
                        { label: '100', value: 100 }
                      ]"
                    />
                  </PlatformFormItem>
                  <PlatformFormItem label="附件大小限制">
                    <PlatformInputNumber v-model="settings.maxAttachmentSize" :min="1" :max="100" />
                  </PlatformFormItem>
                  <PlatformFormItem label="允许上传格式">
                    <PlatformInputTag v-model="settings.uploadFormats" />
                  </PlatformFormItem>
                </div>
              </a-form>

              <div v-else-if="settingsTab === 'notice'" class="setting-list">
                <label><span>新工单创建通知</span><PlatformSwitch v-model="settings.notifyCreate" /></label>
                <label><span>工单分配通知</span><PlatformSwitch v-model="settings.notifyAssign" /></label>
                <label><span>工单状态变更通知</span><PlatformSwitch v-model="settings.notifyStatus" /></label>
                <label><span>工单超时提醒</span><PlatformSwitch v-model="settings.notifyTimeout" /></label>
                <label><span>每日未处理汇总</span><PlatformSwitch v-model="settings.notifyDaily" /></label>
                <div class="checkbox-row">
                  <span>通知方式</span>
                  <PlatformCheckbox v-model="settings.notifySystem">系统消息</PlatformCheckbox>
                  <PlatformCheckbox v-model="settings.notifyEmail">邮件</PlatformCheckbox>
                  <PlatformCheckbox v-model="settings.notifyIm">IM推送</PlatformCheckbox>
                </div>
              </div>

              <div v-else class="setting-list">
                <label><span>自动分配规则</span><PlatformSwitch v-model="settings.autoAssign" /></label>
                <PlatformFormItem label="分配策略">
                  <PlatformSelect
                    v-model="settings.assignStrategy"
                    :disabled="!settings.autoAssign"
                    :options="[
                      { label: '轮询', value: 'round_robin' },
                      { label: '工作量最少', value: 'least_workload' },
                      { label: '按分类', value: 'category' }
                    ]"
                  />
                </PlatformFormItem>
                <label><span>超时规则</span><PlatformSwitch v-model="settings.timeoutEnabled" /></label>
                <div class="page-form-grid">
                  <PlatformFormItem label="响应超时（分钟）">
                    <PlatformInputNumber v-model="settings.responseTimeout" :disabled="!settings.timeoutEnabled" :min="1" :max="1440" />
                  </PlatformFormItem>
                  <PlatformFormItem label="解决超时（小时）">
                    <PlatformInputNumber v-model="settings.resolveTimeout" :disabled="!settings.timeoutEnabled" :min="1" :max="720" />
                  </PlatformFormItem>
                  <PlatformFormItem label="超时动作">
                    <PlatformSelect
                      v-model="settings.timeoutAction"
                      :disabled="!settings.timeoutEnabled"
                      :options="[
                        { label: '通知管理员', value: 'notify_admin' },
                        { label: '自动升级', value: 'upgrade' },
                        { label: '标记超时', value: 'mark' }
                      ]"
                    />
                  </PlatformFormItem>
                  <PlatformFormItem label="待验证超时天数">
                    <PlatformInputNumber v-model="settings.pendingCloseDays" :disabled="!settings.autoClose" :min="1" :max="30" />
                  </PlatformFormItem>
                </div>
                <label><span>工单自动关闭</span><PlatformSwitch v-model="settings.autoClose" /></label>
              </div>

              <div class="form-actions">
                <PlatformButton>恢复默认</PlatformButton>
                <PlatformButton type="primary" @click="saveSettings">保存</PlatformButton>
              </div>
            </section>
          </section>
        </section>

        <PlatformModal
          v-model:visible="editModalVisible"
          title="编辑工单"
          :width="620"
          ok-text="保存"
          cancel-text="取消"
          @ok="submitEdit"
          @cancel="editModalVisible = false"
        >
          <a-form :model="editModel" layout="vertical" class="modal-form">
            <PlatformFormItem label="标题">
              <PlatformInput v-model="editModel.title" />
            </PlatformFormItem>
            <div class="modal-form-grid">
              <PlatformFormItem label="分类">
                <PlatformSelect v-model="editModel.category" :options="categoryOptions" />
              </PlatformFormItem>
              <PlatformFormItem label="优先级">
                <PlatformSelect v-model="editModel.priority" :options="priorityOptions.filter((item) => item.value)" />
              </PlatformFormItem>
            </div>
            <PlatformFormItem label="描述">
              <PlatformTextarea v-model="editModel.description" :auto-size="{ minRows: 4, maxRows: 8 }" />
            </PlatformFormItem>
          </a-form>
        </PlatformModal>

        <PlatformModal
          v-model:visible="assignModalVisible"
          title="工单分配"
          :width="520"
          ok-text="确认分配"
          cancel-text="取消"
          @ok="submitAssign"
          @cancel="assignModalVisible = false"
        >
          <a-form :model="assignModel" layout="vertical" class="modal-form">
            <PlatformFormItem label="选择处理人">
              <PlatformSelect v-model="assignModel.assignee" allow-search :options="createAssigneeOptions" />
            </PlatformFormItem>
            <PlatformFormItem label="分配说明">
              <PlatformTextarea v-model="assignModel.note" :auto-size="{ minRows: 3, maxRows: 5 }" />
            </PlatformFormItem>
            <PlatformCheckbox v-model="assignModel.notify">分配后通知处理人</PlatformCheckbox>
          </a-form>
        </PlatformModal>

        <PlatformModal
          v-model:visible="roleModalVisible"
          :title="selectedUser ? `角色分配 - ${selectedUser.name}` : '角色分配'"
          :width="460"
          ok-text="确认"
          cancel-text="取消"
          @ok="submitRoles"
          @cancel="roleModalVisible = false"
        >
          <div class="role-modal-body">
            <p>当前角色：{{ selectedUser.roles.join('、') }}</p>
            <PlatformCheckbox v-model="roleModel.requester">普通员工（提单人）</PlatformCheckbox>
            <PlatformCheckbox v-model="roleModel.handler">处理人员（IT工程师/客服）</PlatformCheckbox>
            <PlatformCheckbox v-model="roleModel.admin">管理员</PlatformCheckbox>
            <small>注：角色可多选，权限取并集。</small>
          </div>
        </PlatformModal>

        <PlatformModal
          v-model:visible="resultModalVisible"
          title="提交结果"
          :width="480"
          :ok-text="resultOkTarget ? '回到列表' : '知道了'"
          cancel-text="关闭"
          @ok="confirmResultModal"
          @cancel="dismissResultModal"
        >
          <PlatformResult class="result-modal-body" status="success" :title="lastResultTitle" :subtitle="lastResultSubtitle" />
        </PlatformModal>

        <PlatformDetailDrawerTemplate
          v-model:visible="logDrawerVisible"
          :title="selectedTicket ? `${selectedTicket.ticketNo} 操作日志` : '操作日志'"
          :width="520"
          :actions="[
            { key: 'close', label: '关闭' },
            { key: 'detail', label: '查看详情', type: 'primary' }
          ]"
          @action="(key) => (key === 'detail' && selectedTicket ? openTicketDetail(selectedTicket) : (logDrawerVisible = false))"
          @cancel="logDrawerVisible = false"
        >
          <div class="drawer-content">
            <section class="drawer-summary">
              <div>
                <span>{{ selectedTicket.ticketNo }}</span>
                <h2>{{ selectedTicket.title }}</h2>
              </div>
              <PlatformStatusTag :status="statusToTagStatus(selectedTicket.status)" :label="statusLabel(selectedTicket.status)" />
            </section>
            <section class="drawer-section">
              <h3>操作历史</h3>
              <PlatformTimeline :items="detailTimeline" pending="等待下一步流转" />
            </section>
          </div>
        </PlatformDetailDrawerTemplate>
      </a-layout-content>
    </a-layout>
  </a-layout>
  </div>
</template>
