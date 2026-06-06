<script setup lang="ts">
import '@arco-design/web-vue/dist/arco.css';
import '@platform/tokens/theme.css';
import '@platform/components/styles.css';
import { ref } from 'vue';
import {
  PlatformActionLinkGroup,
  PlatformBadge,
  PlatformBadgeAvatar,
  PlatformBadgeCount,
  PlatformBadgeDot,
  PlatformButton,
  PlatformBreadcrumb,
  PlatformCascader,
  PlatformCheckbox,
  PlatformCheckboxInput,
  PlatformCollapsedMenuItem,
  PlatformColorToken,
  PlatformDataTable,
  PlatformDateHeaderIcon,
  PlatformDatePicker,
  PlatformDatePickerDropdown,
  PlatformDetailDrawerTemplate,
  PlatformDetailPageTemplate,
  PlatformDrawer,
  PlatformDropdown,
  PlatformFontToken,
  PlatformFormModalTemplate,
  PlatformFormItem,
  PlatformIconToken,
  PlatformInput,
  PlatformInputAddon,
  PlatformInputNumber,
  PlatformInputTag,
  PlatformLink,
  PlatformListPageTemplate,
  PlatformMenu,
  PlatformModal,
  PlatformPageHeader,
  PlatformPagination,
  PlatformPassword,
  PlatformPickerCell,
  PlatformPopover,
  PlatformProgress,
  PlatformRadio,
  PlatformResult,
  PlatformResultPageTemplate,
  PlatformSelect,
  PlatformSelectionItem,
  PlatformShadowToken,
  PlatformSteps,
  PlatformStepsItemIcon,
  PlatformStatusTag,
  PlatformSwitch,
  PlatformTableAvatarTextCell,
  PlatformTableCheckboxCell,
  PlatformTableExpandCell,
  PlatformTableHeaderCell,
  PlatformTableIconTextCell,
  PlatformTableLinkCell,
  PlatformTableFilter,
  PlatformTableSearch,
  PlatformTableSortCell,
  PlatformTableSorter,
  PlatformTableStatusCell,
  PlatformTableSwitchCell,
  PlatformTableTagCell,
  PlatformTableTextCell,
  PlatformTag,
  PlatformTagDeletion,
  PlatformTabs,
  PlatformTextarea,
  PlatformTimePicker,
  PlatformTimeline,
  PlatformTooltip,
  PlatformTreeSelect,
  PlatformUpload,
  datePanelComponents,
  feedbackComponents,
  firstBatchComponents,
  foundationComponents,
  formControlComponents,
  listFoundationComponents,
  officialAdjunctComponents,
  platformTemplateComponents,
  showPlatformMessage,
  structureNavigationComponents,
  tableCellComponents,
  tableNavigationMicroComponents
} from '@platform/components';

const modalVisible = ref(false);
const drawerVisible = ref(false);
const templateModalVisible = ref(false);
const templateDrawerVisible = ref(false);
const projectName = ref('');
const dateRange = ref(['2026-06-01', '2026-06-30']);
const shortcutDateRange = ref(['2026-06-01', '2026-06-07']);
const timeRange = ref(['09:00:00', '18:00:00']);
const budget = ref(3200);
const note = ref('用于运营活动的审批说明。');
const accepted = ref(true);
const billingType = ref('monthly');
const enabled = ref(true);
const tags = ref(['高优先级', '待审核']);
const region = ref('shanghai');
const ownerTeam = ref('ops');
const password = ref('demo-password');
const rowChecked = ref(true);
const rowEnabled = ref(true);
const rowExpanded = ref(false);
const tableSortOrder = ref<'ascend' | 'descend' | 'none'>('ascend');
const uploadFiles = ref([]);
const addonKeyword = ref('arco');
const slotSelectValue = ref('ops');

const options = [
  { label: '启用', value: 'enabled' },
  { label: '停用', value: 'disabled' }
];
const cascaderOptions = [
  {
    label: '华东',
    value: 'east',
    children: [
      { label: '上海', value: 'shanghai' },
      { label: '杭州', value: 'hangzhou' }
    ]
  },
  {
    label: '华南',
    value: 'south',
    children: [
      { label: '深圳', value: 'shenzhen' },
      { label: '广州', value: 'guangzhou' }
    ]
  }
];
const treeData = [
  {
    title: '运营中心',
    key: 'ops',
    children: [
      { title: '活动运营', key: 'campaign' },
      { title: '用户运营', key: 'user-ops' }
    ]
  },
  {
    title: '产品中心',
    key: 'product',
    children: [
      { title: '交易产品', key: 'trade-product' },
      { title: '增长产品', key: 'growth-product' }
    ]
  }
];
const menuItems = [
  { key: 'overview', label: '概览' },
  {
    key: 'business',
    label: '业务管理',
    children: [
      { key: 'merchant', label: '商户管理' },
      { key: 'order', label: '订单管理' }
    ]
  },
  { key: 'settings', label: '系统设置' }
];
const breadcrumbItems = [
  { label: '首页', path: '/' },
  { label: '组件规范', path: '/components' },
  { label: '结构组件' }
];
const tabItems = [
  { key: 'basic', title: '基础信息' },
  { key: 'records', title: '操作记录' },
  { key: 'config', title: '配置项' }
];
const stepItems = [
  { title: '提交申请', description: '填写表单', status: 'finish' as const },
  { title: '平台审核', description: '处理中', status: 'process' as const },
  { title: '完成归档', description: '等待确认', status: 'wait' as const }
];
const dropdownItems = [
  { key: 'copy', label: '复制链接' },
  { key: 'archive', label: '归档记录' }
];
const templateActions = [
  { key: 'export', label: '导出' },
  { key: 'create', label: '新建', type: 'primary' as const }
];
const resultActions = [
  { key: 'back', label: '返回列表' },
  { key: 'detail', label: '查看详情', type: 'primary' as const }
];
const dateShortcuts = [
  { label: '最近 7 天', value: () => ['2026-06-01', '2026-06-07'] },
  { label: '本月', value: () => ['2026-06-01', '2026-06-30'] }
];

const tableColumns = [
  { title: '名称', dataIndex: 'name', slotName: 'name' },
  { title: '状态', dataIndex: 'status', slotName: 'status' },
  { title: '操作', dataIndex: 'action', slotName: 'action' }
];
const tableData = [
  { key: '1', name: '组件规范平台', status: '启用' },
  { key: '2', name: '原型预览', status: '启用' }
];
const rowActions = [
  { key: 'detail', label: '详情' },
  { key: 'edit', label: '编辑' }
];
const timelineItems = [
  { key: '1', label: '09:00', content: '提交审批申请', dotColor: '#165DFF' },
  { key: '2', label: '10:30', content: '主管完成初审', dotColor: '#00B42A' },
  { key: '3', label: '待处理', content: '等待财务复核', dotColor: '#FF7D00' }
];

const triggerMessage = () => {
  showPlatformMessage('success', {
    content: '已按 Arco 官网 Message 全局方法触发',
    closable: true
  });
};
</script>

<template>
  <section class="showcase">
    <header>
      <h2>第一批已实现组件</h2>
      <p>这些组件已经从 Arco Vue 封装为平台组件，并绑定 Figma nodeId 与平台 class。</p>
    </header>

    <h2>基础规范组件</h2>
    <div class="implemented-grid">
      <article v-for="item in foundationComponents" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.level }}</span>
        <code>{{ item.figmaNodeId }}</code>
      </article>
    </div>

    <div class="implemented-grid">
      <article v-for="item in firstBatchComponents" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.level }}</span>
        <code>{{ item.figmaNodeId }}</code>
      </article>
    </div>

    <h2>列表基础组件</h2>
    <div class="implemented-grid">
      <article v-for="item in listFoundationComponents" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.level }}</span>
        <code>{{ item.figmaNodeId }}</code>
      </article>
    </div>

    <h2>结构与导航组件</h2>
    <div class="implemented-grid">
      <article v-for="item in structureNavigationComponents" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.level }}</span>
        <code>{{ item.figmaNodeId }}</code>
      </article>
    </div>

    <h2>表单控件组件</h2>
    <div class="implemented-grid">
      <article v-for="item in formControlComponents" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.level }}</span>
        <code>{{ item.figmaNodeId }}</code>
      </article>
    </div>

    <h2>表格单元格组件</h2>
    <div class="implemented-grid">
      <article v-for="item in tableCellComponents" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.level }}</span>
        <code>{{ item.figmaNodeId }}</code>
      </article>
    </div>

    <h2>反馈组件</h2>
    <div class="implemented-grid">
      <article v-for="item in feedbackComponents" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.level }}</span>
        <code>{{ item.figmaNodeId }}</code>
      </article>
    </div>

    <h2>官网辅助组件</h2>
    <div class="implemented-grid">
      <article v-for="item in officialAdjunctComponents" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.level }}</span>
        <code>{{ item.figmaNodeId }}</code>
      </article>
    </div>

    <h2>日期面板内部件</h2>
    <div class="implemented-grid">
      <article v-for="item in datePanelComponents" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.level }}</span>
        <code>{{ item.figmaNodeId }}</code>
      </article>
    </div>

    <h2>页面模板组件</h2>
    <div class="implemented-grid">
      <article v-for="item in platformTemplateComponents" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.level }}</span>
        <code>{{ item.figmaNodeId }}</code>
      </article>
    </div>

    <h2>表格与导航微组件</h2>
    <div class="implemented-grid">
      <article v-for="item in tableNavigationMicroComponents" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span>{{ item.level }}</span>
        <code>{{ item.figmaNodeId }}</code>
      </article>
    </div>

    <div class="showcase-panel foundation-panel">
      <div class="panel-title">
        <h3>基础规范样例</h3>
        <p>这些不是业务控件，而是后续生成原型时用于统一颜色、字体、阴影和图标引用的基础展示组件。</p>
      </div>

      <div class="foundation-demo-grid">
        <PlatformColorToken name="color.brand.6" value="#165DFF" description="主品牌色" />
        <PlatformFontToken name="font.cn.14.regular" :size="14" weight="400" sample="组件规范字体样例" />
        <PlatformShadowToken name="shadow.dropdown1" value="0 4px 10px rgb(0 0 0 / 10%)" description="浮层阴影" />
        <PlatformIconToken name="icon.search" label="Arco Icon">
          <span>⌕</span>
        </PlatformIconToken>
      </div>
    </div>

    <div class="showcase-panel micro-panel">
      <div class="panel-title">
        <h3>表格与导航微组件样例</h3>
        <p>用于补齐 Table 表头交互、Checkbox 内部态、Steps 图标和 Menu 收起项。</p>
      </div>

      <div class="micro-demo-grid">
        <div class="micro-demo-card">
          <span>Checkbox input</span>
          <div class="row">
            <PlatformCheckboxInput v-model="rowChecked">选中</PlatformCheckboxInput>
            <PlatformCheckboxInput :model-value="false" indeterminate>半选</PlatformCheckboxInput>
            <PlatformCheckboxInput :model-value="false" disabled>禁用</PlatformCheckboxInput>
          </div>
        </div>

        <div class="micro-demo-card">
          <span>Table controls</span>
          <div class="row">
            <PlatformTableSorter :order="tableSortOrder" active @sort="tableSortOrder = $event" />
            <PlatformTableFilter active />
            <PlatformTableSearch query="活动" active />
            <PlatformTableSortCell label="更新时间" :order="tableSortOrder" active @sort="tableSortOrder = $event" />
          </div>
        </div>

        <div class="micro-demo-card">
          <span>Steps item icon</span>
          <div class="row">
            <PlatformStepsItemIcon status="finish" :index="1" />
            <PlatformStepsItemIcon status="process" :index="2" />
            <PlatformStepsItemIcon status="wait" :index="3" />
            <PlatformStepsItemIcon status="error" :index="4" />
          </div>
        </div>

        <div class="micro-demo-card">
          <span>Collapsed menu item</span>
          <div class="row">
            <PlatformCollapsedMenuItem :collapsed="false" label="收起菜单" active />
            <PlatformCollapsedMenuItem collapsed label="展开菜单" />
          </div>
        </div>
      </div>
    </div>

    <div class="showcase-panel">
      <div class="row">
        <PlatformButton type="primary">主按钮</PlatformButton>
        <PlatformButton>默认按钮</PlatformButton>
        <PlatformButton type="outline">描边按钮</PlatformButton>
      </div>

      <div class="row">
        <PlatformTag label="启用" color="green" />
        <PlatformTag label="可关闭" color="arcoblue" closable />
        <PlatformBadge label="处理中" status="processing" />
      </div>

      <a-form :model="{}" layout="vertical" class="form-demo">
        <PlatformFormItem label="用户名称" field="name" required>
          <PlatformInput placeholder="请输入用户名称" />
        </PlatformFormItem>
        <PlatformFormItem label="用户状态" field="status">
          <PlatformSelect placeholder="请选择状态" :options="options" />
        </PlatformFormItem>
      </a-form>

      <div class="table-demo">
        <PlatformDataTable :columns="tableColumns" :data="tableData">
          <template #name="{ record }">
            <PlatformTableTextCell :text="record.name" secondary="平台组件" />
          </template>
          <template #status="{ record }">
            <PlatformBadge :label="record.status" status="success" />
          </template>
          <template #action>
            <PlatformActionLinkGroup :actions="rowActions" />
          </template>
        </PlatformDataTable>
        <PlatformPagination :total="2" :current="1" :page-size="10" />
      </div>
    </div>

    <div class="showcase-panel structure-panel">
      <PlatformPageHeader title="订单详情" subtitle="交易中心 / 履约记录" show-back>
        <template #breadcrumb>
          <PlatformBreadcrumb :items="breadcrumbItems" />
        </template>
        <template #extra>
          <div class="row">
            <PlatformDropdown label="更多操作" :items="dropdownItems" />
            <PlatformButton type="primary" @click="drawerVisible = true">打开抽屉</PlatformButton>
          </div>
        </template>
      </PlatformPageHeader>

      <div class="navigation-demo-grid">
        <PlatformMenu :items="menuItems" :selected-keys="['merchant']" :open-keys="['business']" />

        <div class="navigation-demo-main">
          <PlatformTabs :items="tabItems" active-key="basic" hide-content>
            <template #extra>
              <PlatformButton type="text" size="small">新建</PlatformButton>
            </template>
          </PlatformTabs>
          <PlatformSteps :items="stepItems" :current="2" />
          <div class="row">
            <PlatformButton type="primary" @click="modalVisible = true">打开弹窗</PlatformButton>
            <PlatformButton @click="drawerVisible = true">打开详情抽屉</PlatformButton>
          </div>
        </div>
      </div>
    </div>

    <div class="showcase-panel form-control-panel">
      <div class="panel-title">
        <h3>审批表单控件样例</h3>
        <p>直接复用 Arco Vue 官方控件行为，平台层只补 Figma 标识、样式规范和常用原型默认宽度。</p>
      </div>

      <a-form :model="{}" layout="vertical" class="form-control-demo">
        <PlatformFormItem label="项目名称" field="projectName" required>
          <PlatformInput v-model="projectName" placeholder="请输入项目名称" />
        </PlatformFormItem>
        <PlatformFormItem label="日期区间" field="dateRange" required>
          <PlatformDatePicker
            v-model="dateRange"
            range
            :placeholder="['开始日期', '结束日期']"
            class="wide-control"
          />
        </PlatformFormItem>
        <PlatformFormItem label="时间区间" field="timeRange">
          <PlatformTimePicker
            v-model="timeRange"
            type="time-range"
            :placeholder="['开始时间', '结束时间']"
            class="wide-control"
          />
        </PlatformFormItem>
        <PlatformFormItem label="预算金额" field="budget">
          <PlatformInputNumber v-model="budget" placeholder="请输入预算" mode="button" class="medium-control" />
        </PlatformFormItem>
        <PlatformFormItem label="项目说明" field="note">
          <PlatformTextarea v-model="note" placeholder="请输入说明" show-word-limit :max-length="80" />
        </PlatformFormItem>
        <PlatformFormItem label="使用范围" field="region">
          <PlatformCascader v-model="region" :options="cascaderOptions" placeholder="请选择区域" class="wide-control" />
        </PlatformFormItem>
        <PlatformFormItem label="负责团队" field="ownerTeam">
          <PlatformTreeSelect v-model="ownerTeam" :data="treeData" placeholder="请选择团队" class="wide-control" />
        </PlatformFormItem>
        <PlatformFormItem label="标签" field="tags">
          <PlatformInputTag v-model="tags" placeholder="输入后回车添加" class="wide-control" />
        </PlatformFormItem>
        <PlatformFormItem label="访问密码" field="password">
          <PlatformPassword v-model="password" placeholder="请输入访问密码" class="wide-control" />
        </PlatformFormItem>
        <div class="form-inline-row">
          <PlatformCheckbox v-model="accepted">已确认信息准确</PlatformCheckbox>
          <PlatformRadio v-model="billingType" value="monthly">按月结算</PlatformRadio>
          <PlatformSwitch v-model="enabled" checked-text="启用" unchecked-text="停用" />
        </div>
      </a-form>
    </div>

    <div class="showcase-panel table-cell-panel">
      <div class="panel-title">
        <h3>列表页单元格样例</h3>
        <p>用于 PRD 生成列表页时按列类型快速拼装，保留 Table 内部紧凑阅读密度。</p>
      </div>

      <div class="table-cell-demo-grid">
        <div class="table-cell-demo-item">
          <span>表头</span>
          <PlatformTableHeaderCell label="订单编号" sortable filterable searchable active />
        </div>
        <div class="table-cell-demo-item">
          <span>文本图标</span>
          <PlatformTableIconTextCell text="ORD-20260605-001" secondary="跨境支付" />
        </div>
        <div class="table-cell-demo-item">
          <span>头像文本</span>
          <PlatformTableAvatarTextCell text="示例用户 A" secondary="业务角色" avatar-text="A" />
        </div>
        <div class="table-cell-demo-item">
          <span>标签</span>
          <PlatformTableTagCell label="高优先级" color="arcoblue" />
        </div>
        <div class="table-cell-demo-item">
          <span>状态</span>
          <PlatformTableStatusCell label="处理中" status="processing" />
        </div>
        <div class="table-cell-demo-item">
          <span>选择</span>
          <PlatformTableCheckboxCell v-model="rowChecked" />
        </div>
        <div class="table-cell-demo-item">
          <span>展开</span>
          <PlatformTableExpandCell v-model:expanded="rowExpanded" />
        </div>
        <div class="table-cell-demo-item">
          <span>开关</span>
          <PlatformTableSwitchCell v-model="rowEnabled" />
        </div>
        <div class="table-cell-demo-item">
          <span>链接</span>
          <PlatformTableLinkCell label="查看详情" />
        </div>
      </div>
    </div>

    <div class="showcase-panel feedback-panel">
      <div class="panel-title">
        <h3>反馈组件样例</h3>
        <p>用于详情页状态说明、表单校验提示、上传附件、流程进度和结果页。</p>
      </div>

      <div class="feedback-demo-grid">
        <div class="feedback-demo-card">
          <PlatformTooltip content="用于解释字段含义" position="top">
            <PlatformButton>Tooltip</PlatformButton>
          </PlatformTooltip>
          <PlatformPopover title="审批说明" content="展示更完整的上下文信息" trigger="click">
            <PlatformButton>Popover</PlatformButton>
          </PlatformPopover>
        </div>

        <div class="feedback-demo-card">
          <PlatformProgress :percent="0.68" status="success" />
          <PlatformProgress type="circle" :percent="0.42" size="small" />
        </div>

        <div class="feedback-demo-card">
          <PlatformTimeline :items="timelineItems" pending="等待复核" />
        </div>

        <div class="feedback-demo-card">
          <PlatformUpload v-model:file-list="uploadFiles" :auto-upload="false" tip="支持 PDF、PNG，单个文件不超过 10MB">
            <PlatformButton type="outline">上传附件</PlatformButton>
          </PlatformUpload>
        </div>

        <div class="feedback-demo-card result-demo-card">
          <PlatformResult status="success" title="提交成功" subtitle="审批单已进入下一处理节点。" />
        </div>
      </div>
    </div>

    <div class="showcase-panel adjunct-panel">
      <div class="panel-title">
        <h3>官网辅助组件样例</h3>
        <p>用于补齐官网 Link、Badge、Input 前后置标签、Select Option、Tag 删除态和 Message 全局提示。</p>
      </div>

      <div class="adjunct-demo-grid">
        <div class="adjunct-demo-card">
          <PlatformLink label="查看官网文档" href="https://arco.design/vue/component/link" icon />
          <PlatformLink label="加载链接" loading />
          <PlatformLink label="禁用链接" disabled />
        </div>

        <div class="adjunct-demo-card">
          <PlatformBadgeDot color="#165DFF">
            <PlatformButton>通知</PlatformButton>
          </PlatformBadgeDot>
          <PlatformBadgeCount :count="128" :max-count="99">
            <PlatformButton>消息</PlatformButton>
          </PlatformBadgeCount>
          <PlatformBadgeAvatar avatar-text="王" :count="3" />
        </div>

        <div class="adjunct-demo-card adjunct-demo-card--wide">
          <PlatformInputAddon
            v-model="addonKeyword"
            prepend="https://"
            append=".com"
            allow-clear
            placeholder="请输入域名"
          />
        </div>

        <div class="adjunct-demo-card adjunct-demo-card--wide">
          <PlatformSelect v-model="slotSelectValue" placeholder="请选择团队" allow-search>
            <PlatformSelectionItem value="ops" label="运营中心" />
            <PlatformSelectionItem value="product" label="产品中心" />
            <PlatformSelectionItem value="disabled" label="禁用项" disabled />
          </PlatformSelect>
        </div>

        <div class="adjunct-demo-card">
          <PlatformTagDeletion label="可删除标签" color="arcoblue" />
          <PlatformButton type="primary" @click="triggerMessage">触发 Message</PlatformButton>
        </div>
      </div>
    </div>

    <div class="showcase-panel date-panel">
      <div class="panel-title">
        <h3>DatePicker 面板内部件</h3>
        <p>浮层仍走 Arco Vue 公开 DatePicker API，平台只沉淀可复用的头部图标、月份/年份单元格和原型默认宽度。</p>
      </div>

      <div class="date-panel-demo-grid">
        <div class="date-panel-demo-card date-panel-demo-card--wide">
          <PlatformDatePickerDropdown
            v-model="shortcutDateRange"
            range
            :shortcuts="dateShortcuts"
            shortcuts-position="left"
            extra-footer="按官网 extra 插槽承载附加说明"
            :placeholder="['开始日期', '结束日期']"
          />
        </div>

        <div class="date-panel-demo-card">
          <div class="date-header-demo">
            <PlatformDateHeaderIcon direction="super-prev" label="上一年" />
            <PlatformDateHeaderIcon direction="prev" label="上一月" />
            <PlatformDateHeaderIcon direction="next" label="下一月" />
            <PlatformDateHeaderIcon direction="super-next" label="下一年" />
          </div>
        </div>

        <div class="date-panel-demo-card">
          <div class="picker-cell-demo">
            <PlatformPickerCell type="month" label="6月" selected today />
            <PlatformPickerCell type="month" label="7月" />
            <PlatformPickerCell type="month" label="8月" disabled />
          </div>
        </div>

        <div class="date-panel-demo-card">
          <div class="picker-cell-demo">
            <PlatformPickerCell type="year" label="2025" />
            <PlatformPickerCell type="year" label="2026" selected today />
            <PlatformPickerCell type="year" label="2027" :in-view="false" />
          </div>
        </div>
      </div>
    </div>

    <div class="showcase-panel template-panel">
      <div class="panel-title">
        <h3>页面模板组合样例</h3>
        <p>后续 PRD 到原型时优先调用这些模板，再向下填充表单项、表格列、状态标签和反馈组件。</p>
      </div>

      <PlatformListPageTemplate title="活动列表" subtitle="运营中心 / 活动管理" :actions="templateActions">
        <template #filters>
          <a-form :model="{}" layout="inline" class="template-filter-form">
            <PlatformFormItem label="活动名称" field="campaignName">
              <PlatformInput placeholder="请输入活动名称" />
            </PlatformFormItem>
            <PlatformFormItem label="状态" field="campaignStatus">
              <PlatformSelect placeholder="请选择状态" :options="options" />
            </PlatformFormItem>
            <PlatformButton type="primary">查询</PlatformButton>
          </a-form>
        </template>
        <PlatformDataTable :columns="tableColumns" :data="tableData">
          <template #name="{ record }">
            <PlatformTableTextCell :text="record.name" secondary="模板列表项" />
          </template>
          <template #status>
            <PlatformStatusTag status="processing" label="处理中" />
          </template>
          <template #action>
            <PlatformActionLinkGroup :actions="rowActions" />
          </template>
        </PlatformDataTable>
        <template #pagination>
          <PlatformPagination :total="86" :current="1" :page-size="10" />
        </template>
      </PlatformListPageTemplate>

      <div class="template-demo-grid">
        <PlatformDetailPageTemplate title="活动详情" subtitle="展示基础信息、流程记录和操作区" :actions="templateActions">
          <template #summary>
            <div class="detail-summary-grid">
              <div>
                <span>当前状态</span>
                <PlatformStatusTag status="success" label="已上线" />
              </div>
              <div>
                <span>负责人</span>
                <strong>运营中心</strong>
              </div>
              <div>
                <span>更新时间</span>
                <strong>2026-06-05</strong>
              </div>
            </div>
          </template>
          <PlatformTimeline :items="timelineItems" pending="等待归档" />
        </PlatformDetailPageTemplate>

        <PlatformResultPageTemplate
          status="success"
          title="提交成功"
          subtitle="平台已生成审批记录，可继续查看详情或返回列表。"
          :actions="resultActions"
        />
      </div>

      <div class="template-launch-row">
        <PlatformButton type="primary" @click="templateModalVisible = true">打开表单弹窗模板</PlatformButton>
        <PlatformButton @click="templateDrawerVisible = true">打开详情抽屉模板</PlatformButton>
      </div>

      <PlatformFormModalTemplate v-model:visible="templateModalVisible" title="表单弹窗模板" width="560">
        <a-form :model="{}" layout="vertical" class="modal-form-demo">
          <PlatformFormItem label="活动名称" field="templateName" required>
            <PlatformInput placeholder="请输入活动名称" />
          </PlatformFormItem>
          <PlatformFormItem label="活动状态" field="templateStatus">
            <PlatformSelect placeholder="请选择状态" :options="options" />
          </PlatformFormItem>
        </a-form>
      </PlatformFormModalTemplate>

      <PlatformDetailDrawerTemplate v-model:visible="templateDrawerVisible" title="详情抽屉模板" width="460">
        <div class="drawer-demo-content">
          <PlatformStatusTag status="processing" label="处理中" />
          <PlatformTableTextCell text="活动配置复核" secondary="DRAWER-20260605" />
          <PlatformTimeline :items="timelineItems" pending="等待复核" />
        </div>
      </PlatformDetailDrawerTemplate>
    </div>

    <PlatformModal v-model:visible="modalVisible" title="新建项目" width="520">
      <a-form :model="{}" layout="vertical" class="modal-form-demo">
        <PlatformFormItem label="项目名称" field="projectName" required>
          <PlatformInput placeholder="请输入项目名称" />
        </PlatformFormItem>
        <PlatformFormItem label="项目状态" field="projectStatus">
          <PlatformSelect placeholder="请选择状态" :options="options" />
        </PlatformFormItem>
      </a-form>
    </PlatformModal>

    <PlatformDrawer v-model:visible="drawerVisible" title="工单详情" width="420">
      <div class="drawer-demo-content">
        <PlatformBadge label="处理中" status="processing" />
        <PlatformTableTextCell text="发票无法下载" secondary="客服工单 / TK202606050091" />
        <PlatformSteps :items="stepItems" :current="2" direction="vertical" />
      </div>
    </PlatformDrawer>
  </section>
</template>

<style scoped>
.showcase {
  margin: 28px 0;
}

.showcase header p {
  color: var(--ac-color-text-2);
}

.implemented-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin: 16px 0;
}

.implemented-grid article,
.showcase-panel {
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  background: var(--ac-color-bg-1);
}

.implemented-grid article {
  display: grid;
  gap: 6px;
  padding: 12px;
}

.implemented-grid span,
.implemented-grid code {
  color: var(--ac-color-text-2);
}

.showcase-panel {
  display: grid;
  gap: 18px;
  padding: 18px;
}

.structure-panel,
.form-control-panel,
.table-cell-panel,
.feedback-panel,
.adjunct-panel,
.date-panel,
.template-panel,
.foundation-panel,
.micro-panel {
  margin-top: 18px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.form-demo {
  max-width: 520px;
}

.panel-title {
  display: grid;
  gap: 4px;
}

.panel-title h3,
.panel-title p {
  margin: 0;
}

.panel-title p {
  color: var(--ac-color-text-2);
}

.form-control-demo {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2px;
  max-width: 680px;
}

.form-control-demo :deep(.arco-form-item) {
  margin-bottom: 18px;
}

.form-control-demo :deep(.arco-form-item-content-wrapper) {
  min-width: 0;
}

.wide-control {
  width: 100%;
  min-width: 320px;
}

.medium-control {
  width: 100%;
  min-width: 220px;
}

.form-inline-row {
  display: flex;
  flex-wrap: wrap;
  grid-column: 1 / -1;
  align-items: center;
  gap: 18px;
  padding-top: 2px;
}

.table-demo {
  display: grid;
  gap: 12px;
}

.table-cell-demo-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 12px;
}

.table-cell-demo-item {
  display: grid;
  min-width: 0;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  background: var(--ac-color-fill-1);
}

.table-cell-demo-item > span {
  color: var(--ac-color-text-3);
  font-size: 12px;
}

.feedback-demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 14px;
}

.feedback-demo-card {
  display: flex;
  min-width: 0;
  min-height: 96px;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  background: var(--ac-color-fill-1);
}

.feedback-demo-card > * {
  min-width: 0;
}

.feedback-demo-card :deep(.platform-progress) {
  width: min(100%, 260px);
  min-width: 0;
}

.result-demo-card {
  align-items: flex-start;
}

.adjunct-demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 14px;
}

.adjunct-demo-card {
  display: flex;
  min-width: 0;
  min-height: 82px;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  background: var(--ac-color-fill-1);
}

.adjunct-demo-card--wide {
  align-items: stretch;
}

.adjunct-demo-card--wide :deep(.platform-input-addon),
.adjunct-demo-card--wide :deep(.platform-select) {
  width: 100%;
  min-width: 240px;
}

.foundation-demo-grid,
.micro-demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 14px;
}

.foundation-demo-grid > *,
.micro-demo-card {
  min-width: 0;
  padding: 14px;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  background: var(--ac-color-fill-1);
}

.micro-demo-card {
  display: grid;
  align-content: start;
  gap: 12px;
}

.micro-demo-card > span {
  color: var(--ac-color-text-3);
  font-size: 12px;
}

.date-panel-demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  gap: 14px;
}

.date-panel-demo-card {
  display: flex;
  min-width: 0;
  min-height: 82px;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  background: var(--ac-color-fill-1);
}

.date-panel-demo-card--wide {
  grid-column: 1 / -1;
}

.date-panel-demo-card--wide :deep(.platform-date-picker-dropdown) {
  width: 100%;
  min-width: 360px;
}

.date-header-demo,
.picker-cell-demo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.template-panel :deep(.platform-list-page-template),
.template-panel :deep(.platform-detail-page-template),
.template-panel :deep(.platform-result-page-template) {
  width: 100%;
}

.template-filter-form {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px;
}

.template-filter-form :deep(.platform-input),
.template-filter-form :deep(.platform-select) {
  width: 220px;
}

.template-demo-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 16px;
  align-items: stretch;
}

.detail-summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 12px;
}

.detail-summary-grid > div {
  display: grid;
  gap: 6px;
}

.detail-summary-grid span {
  color: var(--ac-color-text-3);
  font-size: 12px;
}

.template-launch-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.navigation-demo-grid {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.navigation-demo-main,
.drawer-demo-content {
  display: grid;
  gap: 18px;
}

.modal-form-demo {
  margin-top: 4px;
}

@media (max-width: 760px) {
  .navigation-demo-grid,
  .table-cell-demo-grid,
  .feedback-demo-grid,
  .adjunct-demo-grid,
  .foundation-demo-grid,
  .micro-demo-grid,
  .date-panel-demo-grid,
  .template-demo-grid,
  .detail-summary-grid {
    grid-template-columns: 1fr;
  }

  .wide-control,
  .medium-control,
  .date-panel-demo-card--wide :deep(.platform-date-picker-dropdown) {
    min-width: min(100%, 280px);
  }
}
</style>
