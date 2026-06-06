import type { PlatformSortOrder } from '@platform/components';

export type TicketStatus = 'unassigned' | 'processing' | 'pending' | 'closed' | 'timeout';
export type TicketPriority = 'urgent' | 'high' | 'medium' | 'low';

export interface TicketRow extends Record<string, unknown> {
  key: string;
  ticketNo: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  assignee: string;
  requester: string;
  department: string;
  source: string;
  createdAt: string;
  expectedAt: string;
  updatedAt: string;
  description: string;
  attachments: number;
}

export interface TicketFilters {
  keyword: string;
  status: TicketStatus | '';
  priority: TicketPriority | '';
  category: string;
  assignee: string;
}

export interface UserRow extends Record<string, unknown> {
  key: string;
  name: string;
  employeeNo: string;
  department: string;
  roles: string[];
  currentTickets: number;
  enabled: boolean;
  email: string;
}

export interface CategoryNode {
  key: string;
  name: string;
  count: number;
  enabled: boolean;
  children?: CategoryNode[];
}

export const ticketRows: TicketRow[] = [
  {
    key: 'R1008',
    ticketNo: 'SR-1008',
    title: '办公设备无法正常使用',
    status: 'processing',
    priority: 'urgent',
    category: '设备故障',
    assignee: '服务专员 A',
    requester: '示例用户 A',
    department: '运营支持部',
    source: '服务台提交',
    createdAt: '2026-06-05 09:20',
    expectedAt: '2026-06-05 18:00',
    updatedAt: '2026-06-05 10:16',
    description: '共享办公设备持续报错，重启后仍无法连接，需要进一步排查。',
    attachments: 2
  },
  {
    key: 'R1007',
    ticketNo: 'SR-1007',
    title: '远程网络连接异常',
    status: 'unassigned',
    priority: 'medium',
    category: '网络服务',
    assignee: '',
    requester: '示例用户 B',
    department: '产品支持部',
    source: '服务台提交',
    createdAt: '2026-06-05 08:45',
    expectedAt: '2026-06-06 12:00',
    updatedAt: '2026-06-05 08:45',
    description: '远程办公时网络客户端提示认证失败，账号状态正常。',
    attachments: 1
  },
  {
    key: 'R1006',
    ticketNo: 'SR-1006',
    title: '安装办公客户端',
    status: 'closed',
    priority: 'low',
    category: '软件服务',
    assignee: '服务专员 B',
    requester: '示例用户 C',
    department: '市场支持部',
    source: '服务台提交',
    createdAt: '2026-06-04 16:30',
    expectedAt: '2026-06-07 18:00',
    updatedAt: '2026-06-05 09:12',
    description: '新设备需要安装标准办公客户端并完成基础配置。',
    attachments: 0
  },
  {
    key: 'R1005',
    ticketNo: 'SR-1005',
    title: '临时访问权限申请',
    status: 'pending',
    priority: 'high',
    category: '访问权限',
    assignee: '服务专员 C',
    requester: '示例用户 D',
    department: '客户服务部',
    source: '消息转单',
    createdAt: '2026-06-04 14:10',
    expectedAt: '2026-06-05 14:00',
    updatedAt: '2026-06-05 11:18',
    description: '申请短期访问权限，到期后由系统自动回收。',
    attachments: 1
  },
  {
    key: 'R1004',
    ticketNo: 'SR-1004',
    title: '会议设备连接异常',
    status: 'timeout',
    priority: 'high',
    category: '设备故障',
    assignee: '服务专员 A',
    requester: '示例用户 E',
    department: '行政支持部',
    source: '服务台提交',
    createdAt: '2026-06-04 10:05',
    expectedAt: '2026-06-04 17:00',
    updatedAt: '2026-06-05 09:00',
    description: '会议设备无响应，需要在预定会议开始前恢复。',
    attachments: 3
  },
  {
    key: 'R1003',
    ticketNo: 'SR-1003',
    title: '消息存储容量异常',
    status: 'processing',
    priority: 'medium',
    category: '账号权限',
    assignee: '服务专员 B',
    requester: '示例用户 F',
    department: '合规支持部',
    source: '邮件转单',
    createdAt: '2026-06-03 18:36',
    expectedAt: '2026-06-06 18:00',
    updatedAt: '2026-06-05 09:22',
    description: '消息存储显示容量已满，但归档后未正确释放空间。',
    attachments: 0
  },
  {
    key: 'R1002',
    ticketNo: 'SR-1002',
    title: '新成员账号开通',
    status: 'unassigned',
    priority: 'low',
    category: '账号权限',
    assignee: '',
    requester: '自动化服务',
    department: '人员服务部',
    source: '系统同步',
    createdAt: '2026-06-03 10:12',
    expectedAt: '2026-06-08 12:00',
    updatedAt: '2026-06-03 10:12',
    description: '为新成员创建基础账号并分配默认权限。',
    attachments: 1
  },
  {
    key: 'R1001',
    ticketNo: 'SR-1001',
    title: '访客网络权限申请',
    status: 'closed',
    priority: 'medium',
    category: '网络服务',
    assignee: '服务专员 C',
    requester: '示例用户 G',
    department: '行政支持部',
    source: '服务台提交',
    createdAt: '2026-06-02 09:10',
    expectedAt: '2026-06-03 18:00',
    updatedAt: '2026-06-03 15:20',
    description: '临时访客需要开通指定时段的网络访问权限。',
    attachments: 0
  }
];

export const userRows: UserRow[] = [
  { key: 'U001', name: '服务专员 A', employeeNo: 'DEMO-001', department: '服务运营部', roles: ['处理人员'], currentTickets: 5, enabled: true, email: 'agent-a@example.test' },
  { key: 'U002', name: '服务专员 B', employeeNo: 'DEMO-002', department: '服务运营部', roles: ['处理人员'], currentTickets: 2, enabled: true, email: 'agent-b@example.test' },
  { key: 'U003', name: '服务专员 C', employeeNo: 'DEMO-003', department: '客户服务部', roles: ['处理人员'], currentTickets: 8, enabled: true, email: 'agent-c@example.test' },
  { key: 'U004', name: '管理员 A', employeeNo: 'DEMO-004', department: '平台管理部', roles: ['管理员'], currentTickets: 0, enabled: true, email: 'admin-a@example.test' },
  { key: 'U005', name: '示例用户 A', employeeNo: 'DEMO-005', department: '业务支持部', roles: ['普通员工'], currentTickets: 0, enabled: false, email: 'user-a@example.test' }
];

export const categoryTree: CategoryNode[] = [
  {
    key: 'hardware',
    name: '设备故障',
    count: 34,
    enabled: true,
    children: [
      { key: 'printer', name: '打印机', count: 12, enabled: true },
      { key: 'meeting-device', name: '会议设备', count: 8, enabled: true }
    ]
  },
  {
    key: 'network',
    name: '网络服务',
    count: 26,
    enabled: true,
    children: [
      { key: 'vpn', name: 'VPN', count: 9, enabled: true },
      { key: 'wifi', name: 'Wi-Fi', count: 11, enabled: true }
    ]
  },
  {
    key: 'software',
    name: '软件服务',
    count: 18,
    enabled: true
  },
  {
    key: 'account',
    name: '账号权限',
    count: 29,
    enabled: true
  },
  {
    key: 'access',
    name: '访问权限',
    count: 7,
    enabled: true
  }
];

export const statusLabels: Record<TicketStatus, string> = {
  unassigned: '待分配',
  processing: '处理中',
  pending: '待验证',
  closed: '已关闭',
  timeout: '已超时'
};

export const priorityLabels: Record<TicketPriority, string> = {
  urgent: '紧急',
  high: '高',
  medium: '中等',
  low: '低'
};

export const statusToTagStatus = (status: TicketStatus): 'success' | 'processing' | 'danger' | 'warning' | 'info' => {
  if (status === 'closed') return 'success';
  if (status === 'timeout') return 'danger';
  if (status === 'pending') return 'warning';
  if (status === 'unassigned') return 'info';
  return 'processing';
};

export const priorityToTagColor = (priority: TicketPriority): string => {
  if (priority === 'urgent') return 'red';
  if (priority === 'high') return 'orangered';
  if (priority === 'medium') return 'orange';
  return 'green';
};

export const applyTicketFilters = (rows: TicketRow[], filters: TicketFilters): TicketRow[] =>
  rows.filter((row) => {
    const keyword = filters.keyword.trim().toLowerCase();
    const matchesKeyword =
      !keyword ||
      [row.ticketNo, row.title, row.requester, row.assignee, row.category, row.department].some((value) =>
        value.toLowerCase().includes(keyword)
      );
    const matchesStatus = !filters.status || row.status === filters.status;
    const matchesPriority = !filters.priority || row.priority === filters.priority;
    const matchesCategory = !filters.category || row.category === filters.category;
    const matchesAssignee = !filters.assignee || row.assignee === filters.assignee;

    return matchesKeyword && matchesStatus && matchesPriority && matchesCategory && matchesAssignee;
  });

export const sortTicketRows = (rows: TicketRow[], order: PlatformSortOrder): TicketRow[] => {
  if (order === 'none') return [...rows];

  return [...rows].sort((a, b) => {
    const delta = new Date(a.createdAt.replace(' ', 'T')).getTime() - new Date(b.createdAt.replace(' ', 'T')).getTime();
    return order === 'ascend' ? delta : -delta;
  });
};

export const getTicketMetrics = (rows: TicketRow[]) => ({
  total: rows.length,
  unassigned: rows.filter((row) => row.status === 'unassigned').length,
  processing: rows.filter((row) => row.status === 'processing').length,
  closed: rows.filter((row) => row.status === 'closed').length,
  timeout: rows.filter((row) => row.status === 'timeout').length
});
