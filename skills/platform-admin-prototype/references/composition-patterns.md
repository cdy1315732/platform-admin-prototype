# 后台模块组合模式

本文件描述组件如何组成后台业务模块。后续生成原型时，优先使用这些模式，不创建展示板式的组件堆叠页面。

## 筛选区

使用 `PlatformFilterPanel`。

规则：

- 筛选区是独立模块，但不能层层套卡片。
- 筛选项左对齐，间距一致。
- 搜索/重置与筛选项对齐，不要被推到远处。
- 下拉筛选必须有默认项，例如“全部状态”“全部角色”。
- 日期区间必须有稳定最小宽度，不能挤压到不可读。
- 搜索按钮为主按钮，重置为灰色按钮。

推荐结构：

```vue
<PlatformFilterPanel @search="handleSearch" @reset="handleReset">
  <PlatformFormItem label="状态">
    <PlatformSelect v-model="filters.status" :options="statusOptions" />
  </PlatformFormItem>
  <PlatformFormItem label="创建时间">
    <PlatformDatePicker v-model="filters.range" range />
  </PlatformFormItem>
  <PlatformFormItem label="关键词">
    <PlatformInput v-model="filters.keyword" placeholder="请输入关键词" />
  </PlatformFormItem>
</PlatformFilterPanel>
```

## 表格卡片

使用 `PlatformTableCard` + `PlatformDataTable` + `PlatformPagination`。

规则：

- 表格标题放在表格卡片左上。
- 导出、创建等页面级按钮放在表格卡片标题行右侧。
- 批量操作只有勾选后出现。
- 批量操作和“已选择 N 项”在同一行。
- 表格排序使用 `PlatformTableSortCell`，默认不选中。
- 行操作使用 `PlatformActionLinkGroup`。
- 表格内头像必须保持正圆。
- 普通长文本列使用表格列级实际溢出省略与完整值 Tooltip；头像 + 主副文本等复合单元格分别处理每段文本，不能挤压头像、图标和行操作。

推荐结构：

```vue
<PlatformTableCard
  title="数据列表"
  :actions="tableActions"
  :selected-count="selectedKeys.length"
  :bulk-actions="bulkActions"
  @action="handleTableAction"
  @bulk-action="handleBulkAction"
>
  <PlatformDataTable :columns="columns" :data="rows" />
  <template #pagination>
    <PlatformPagination :total="total" :current="page" />
  </template>
</PlatformTableCard>
```

## 表单卡片

使用 `PlatformFormCard`。

规则：

- 创建/编辑页面如果是二级页面，不放左侧导航。
- 表单标题和表单字段在同一张白色卡片中。
- 标题下方内容到卡片顶部保留足够间距。
- 操作按钮放在表单底部右侧。
- 上传默认无文件，使用灰色上传按钮。
- 取消/重置用灰色按钮，提交/保存用主按钮。

推荐结构：

```vue
<PlatformFormCard title="创建记录" description="按 PRD 字段填写基础信息。" :actions="formActions">
  <a-form layout="vertical">
    <PlatformFormItem label="标题">
      <PlatformInput v-model="form.title" />
    </PlatformFormItem>
    <PlatformFormItem label="附件">
      <PlatformUpload v-model:file-list="files" action="/" />
    </PlatformFormItem>
  </a-form>
</PlatformFormCard>
```

## 详情摘要

使用 `PlatformDetailSummary`。

规则：

- 详情摘要用于快速展示对象核心字段。
- 状态优先使用圆点 + 文案，不使用撑满空间的大标签。
- 优先级使用紧凑标签。
- 4 项以内可一行展示；字段较多时允许换行。
- 卡片高度要克制，避免空白过多。
- 紧凑摘要中的普通长文本可单行省略并在真实溢出时显示完整值；状态、金额、数量、日期时间和关键业务编号默认完整展示。

推荐结构：

```vue
<PlatformDetailSummary
  :items="[
    { key: 'status', label: '状态', value: '处理中', kind: 'status', status: 'processing' },
    { key: 'priority', label: '优先级', value: '紧急', kind: 'tag', color: 'red' },
    { key: 'category', label: '分类', value: '硬件故障' },
    { key: 'owner', label: '负责人', value: '负责人A' }
  ]"
/>
```

## 详情页头部

使用 `PlatformDetailPageTemplate` 或 `PlatformPageHeader`。

规则：

- 详情页如果从列表进入，属于二级页面，左侧导航仍高亮列表页。
- 详情页头部可以不显示返回箭头，由业务按钮提供“返回列表”。
- 标题和按钮一行放不下时，按钮换行，和标题区保持 12px 间距。
- 不要让头部组件内部再产生额外左缩进；保留外层卡片 padding。
- `业务编号 · 业务标题` 等复合标题必须拆分处理：业务编号和分隔符完整展示且不收缩，业务标题使用剩余宽度，实际溢出后单行省略。
- 复合标题只在弹性业务标题真实溢出时显示完整标题 Tooltip；不得把编号与标题拼成一个字符串后整体截断。
- 字段允许输入或保存的最大字符数属于数据长度限制，详情页头部显示多少属于展示长度限制，两者必须分别定义。

## 弹窗与抽屉

规则：

- 小型确认、创建、编辑使用 `PlatformModal` 或 `PlatformFormModalTemplate`。
- 侧边查看、较长编辑、辅助详情使用 `PlatformDrawer` 或 `PlatformDetailDrawerTemplate`。
- 弹窗标题左对齐，不居中。
- 抽屉从右侧打开。
- 不把弹窗/抽屉内容做成独立页面。

## 列表、卡片摘要与操作日志

规则：

- 先按 `long-text-display.md` 的任务分级判断当前完整展示、历史三行展开/收起或快速识别省略，不按字段名称机械套用同一种策略。
- 快速识别字段和短摘要仅在真实溢出时显示完整原始值 Tooltip；长段业务记录在原位置展开/收起，不使用 Tooltip 承载全文。
- 时间、操作者、状态、图标和操作区保持可读，不能被长正文挤压。
- 树节点名称使用节点插槽显式实现单行省略和真实溢出 Tooltip，展开图标和节点操作保持固定可用。
