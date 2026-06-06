import type { PrdPageSpec } from './schema';

export interface MockPrototypeMetric {
  label: string;
  value: string;
  trend: string;
}

export interface MockPrototypePage {
  key: string;
  module: string;
  summary: string;
  prd: PrdPageSpec;
  metrics: MockPrototypeMetric[];
  previewRows: Record<string, string>[];
}

export const mockPrototypePages: MockPrototypePage[] = [
  {
    key: 'merchant-list',
    module: '运营后台',
    summary: '商户档案、状态筛选、批量操作和列表分页。',
    prd: {
      pageType: 'list',
      title: '商户管理',
      fields: [
        { key: 'merchantName', label: '商户名称', type: 'text' },
        { key: 'riskStatus', label: '风险状态', type: 'enum', options: ['正常', '待复核', '冻结'] },
        { key: 'createdAt', label: '入驻时间', type: 'dateRange' }
      ],
      actions: [
        { key: 'create', label: '新增商户', type: 'primary' },
        { key: 'export', label: '导出', type: 'secondary' }
      ]
    },
    metrics: [
      { label: '商户总数', value: '12,480', trend: '+8.2%' },
      { label: '待复核', value: '186', trend: '-12' },
      { label: '本月新增', value: '924', trend: '+14.6%' }
    ],
    previewRows: [
      { key: '1', name: '云启零售旗舰店', status: '正常', owner: '王敏', date: '2026-06-01' },
      { key: '2', name: '北辰供应链服务', status: '待复核', owner: '陈舟', date: '2026-05-28' },
      { key: '3', name: '万象生活馆', status: '冻结', owner: '李思', date: '2026-05-24' }
    ]
  },
  {
    key: 'order-detail',
    module: '交易中心',
    summary: '订单概览、收款信息、履约状态和操作记录。',
    prd: {
      pageType: 'detail',
      title: '订单详情',
      fields: [
        { key: 'orderNo', label: '订单编号', type: 'text' },
        { key: 'amount', label: '订单金额', type: 'number' },
        { key: 'payStatus', label: '支付状态', type: 'status' },
        { key: 'remark', label: '备注', type: 'longText' }
      ],
      actions: [
        { key: 'refund', label: '发起退款', type: 'secondary' },
        { key: 'close', label: '关闭订单', type: 'danger' }
      ]
    },
    metrics: [
      { label: '订单金额', value: '¥8,924.00', trend: '已支付' },
      { label: '商品数', value: '18', trend: '3 个包裹' },
      { label: '履约时长', value: '26h', trend: '正常' }
    ],
    previewRows: [
      { key: 'orderNo', name: '订单编号', value: 'SO202606050018' },
      { key: 'merchant', name: '所属商户', value: '云启零售旗舰店' },
      { key: 'channel', name: '支付渠道', value: '微信支付' },
      { key: 'operator', name: '跟进人', value: '王敏' }
    ]
  },
  {
    key: 'project-form-modal',
    module: '项目协作',
    summary: '新建项目时的弹窗表单，包含基础信息、优先级和负责人。',
    prd: {
      pageType: 'form-modal',
      title: '新建项目',
      fields: [
        { key: 'projectName', label: '项目名称', type: 'text', required: true },
        { key: 'priority', label: '优先级', type: 'enum', options: ['高', '中', '低'] },
        { key: 'budget', label: '预算', type: 'number' },
        { key: 'description', label: '项目说明', type: 'longText' }
      ],
      actions: [
        { key: 'cancel', label: '取消', type: 'secondary' },
        { key: 'submit', label: '提交', type: 'primary' }
      ]
    },
    metrics: [
      { label: '进行中', value: '42', trend: '+6' },
      { label: '高优先级', value: '9', trend: '需关注' },
      { label: '本周交付', value: '13', trend: '稳定' }
    ],
    previewRows: [
      { key: '1', name: '客户画像重构', status: '进行中', owner: '赵晴' },
      { key: '2', name: '结算链路优化', status: '排期中', owner: '周林' }
    ]
  },
  {
    key: 'ticket-detail-drawer',
    module: '客服工单',
    summary: '列表侧边打开工单详情抽屉，支持处理记录和状态流转。',
    prd: {
      pageType: 'detail-drawer',
      title: '工单详情抽屉',
      fields: [
        { key: 'ticketNo', label: '工单编号', type: 'text' },
        { key: 'ticketStatus', label: '工单状态', type: 'status' },
        { key: 'handler', label: '处理人', type: 'text' },
        { key: 'attachment', label: '附件', type: 'attachment' }
      ],
      actions: [
        { key: 'transfer', label: '转派', type: 'secondary' },
        { key: 'resolve', label: '标记已解决', type: 'primary' }
      ]
    },
    metrics: [
      { label: '待处理', value: '68', trend: '-9' },
      { label: '超时风险', value: '7', trend: '需处理' },
      { label: '满意度', value: '96%', trend: '+2.4%' }
    ],
    previewRows: [
      { key: '1', name: '发票无法下载', status: '处理中', owner: '林言', date: '2026-06-05' },
      { key: '2', name: '订单状态不同步', status: '待处理', owner: '何舟', date: '2026-06-05' }
    ]
  }
];
