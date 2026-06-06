# 使用示例

本文件给后续生成原型时提供最小代码模式。示例不是固定业务模板，字段和数据应根据 PRD 替换。

## 导入

```ts
import {
  PlatformButton,
  PlatformDataTable,
  PlatformDatePicker,
  PlatformDetailSummary,
  PlatformFilterPanel,
  PlatformFormCard,
  PlatformFormItem,
  PlatformInput,
  PlatformPagination,
  PlatformSelect,
  PlatformTableCard,
  PlatformUpload
} from '@platform/components';
```

## 列表页核心结构

```vue
<section class="page-view">
  <PlatformFilterPanel @search="handleSearch" @reset="handleReset">
    <PlatformFormItem label="状态">
      <PlatformSelect v-model="filters.status" :options="statusOptions" />
    </PlatformFormItem>
    <PlatformFormItem label="关键词">
      <PlatformInput v-model="filters.keyword" placeholder="请输入关键词" />
    </PlatformFormItem>
  </PlatformFilterPanel>

  <PlatformTableCard
    title="数据列表"
    :actions="tableActions"
    :selected-count="selectedKeys.length"
    :bulk-actions="bulkActions"
  >
    <PlatformDataTable :columns="columns" :data="rows" />
    <template #pagination>
      <PlatformPagination :total="total" :current="page" />
    </template>
  </PlatformTableCard>
</section>
```

## 表单页核心结构

```vue
<PlatformFormCard title="创建记录" description="填写基础信息后提交。">
  <a-form layout="vertical">
    <PlatformFormItem label="标题" field="title">
      <PlatformInput v-model="form.title" placeholder="请输入标题" />
    </PlatformFormItem>
    <PlatformFormItem label="完成时间" field="date">
      <PlatformDatePicker v-model="form.date" />
    </PlatformFormItem>
    <PlatformFormItem label="附件" field="attachments">
      <PlatformUpload v-model:file-list="files" action="/" />
    </PlatformFormItem>
  </a-form>
  <template #actions>
    <PlatformButton @click="goBack">取消</PlatformButton>
    <PlatformButton type="primary" @click="submit">提交</PlatformButton>
  </template>
</PlatformFormCard>
```

## 详情摘要

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

## 二级页面导航

```ts
const secondaryPageParentMap = {
  create: 'list',
  detail: 'list'
};

const activeMenuKey = computed(() => secondaryPageParentMap[activePage.value] ?? activePage.value);
```

规则：

- `create`、`detail` 这类二级页面不进入左侧导航。
- 左侧导航高亮父级 `list`。
- 面包屑显示父级和当前页。
