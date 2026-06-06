# PC 后台组件目录

本目录是后续生成 PC 端后台交互原型的本地组件规范。生成原型时以 `@platform/components` 的导出组件和本目录规则为准，不再把 Arco 官网作为主规范来源。Arco Design Vue 只作为底层依赖和 API 排错参考。

## 使用原则

- 优先使用 `@platform/components` 中已经封装的组件。
- 不直接拼裸 Arco 组件，除非当前 Platform 组件没有覆盖该能力。
- 不临时创造新的视觉样式；先检查本目录组件和组合模式。
- 组件内容允许替换，结构和交互规则优先复用。
- PC 后台原型默认使用 Vue 3 + Arco Design Vue + `@platform/components`。

## 官网使用限制

后续生成原型时不要默认访问或照搬 Arco 官网。组件表现已经基于设计规范、Arco 底层能力和已确认的交互偏好完成定制，优先级如下：

1. 本目录规范文档。
2. `@platform/components` 组件源码与导出元数据。
3. 当前 playground 已实现页面的交互与样式。
4. Arco 官网或源码仅用于排查底层 API、事件名称、插槽名称，不用于覆盖本地定制规则。

如果本地规范与官网不一致，以本地规范为准。只有在本地组件缺失能力、且必须理解 Arco API 才能实现时，才临时查官方资料。

## 基础组件

| 组件 | 用途 | 关键规则 |
| --- | --- | --- |
| `PlatformButton` | 普通操作、主操作、危险操作 | 主按钮用于确定/提交/创建；灰色按钮用于取消/重置/次级操作；危险操作使用 `type: danger` 或红色状态。 |
| `PlatformInput` | 单行文本输入 | 必须可回显输入值；用于关键词、标题、名称等。 |
| `PlatformSelect` | 单选下拉 | 筛选项默认要有“全部...”选项；表单字段默认要有业务默认值或占位。 |
| `PlatformDatePicker` | 日期/日期区间 | 时间区间要有稳定最小宽度，不能挤压到不可读。 |
| `PlatformTextarea` | 长文本 | 用于描述、备注、说明；显示字数计数时不要压住内容。 |
| `PlatformCheckbox` | 表格勾选、选项勾选 | 勾选后才显示批量操作。 |
| `PlatformRadio` | 少量互斥选项 | 配置项明确二选一/三选一时使用。 |
| `PlatformSwitch` | 启用/禁用 | 使用官方开关行为但以本地样式为准；小号开关圆点必须上下居中。 |
| `PlatformTag` / `PlatformTableTagCell` | 优先级、分类、轻量状态 | 优先级使用紧凑标签，避免标签横向撑满空白。 |
| `PlatformUpload` | 附件上传 | 默认无已上传文件；使用普通灰色上传按钮，不使用大面积蓝色拖拽区。 |

## 表格组件

| 组件 | 用途 | 关键规则 |
| --- | --- | --- |
| `PlatformDataTable` | 后台列表数据表 | 列表页主数据承载；配合 `PlatformTableCard` 使用。 |
| `PlatformPagination` | 分页 | 放在表格卡片底部右侧。 |
| `PlatformTableSortCell` | 可排序表头 | 创建时间等时间列支持上下排序；默认上下都不选中。 |
| `PlatformTableAvatarTextCell` | 头像 + 主副文本 | 头像必须保持正圆，不能被压扁。 |
| `PlatformTableStatusCell` | 状态列 | 优先用于表格状态；详情摘要中优先使用圆点 + 文案。 |
| `PlatformTableTagCell` | 标签列 | 用于优先级、分类等紧凑标签。 |
| `PlatformActionLinkGroup` | 表格行操作 | 详情、编辑、分配、日志、关闭等行级操作。 |

## 导航与页面结构组件

| 组件 | 用途 | 关键规则 |
| --- | --- | --- |
| `PlatformMenu` | 左侧导航 | 只放一级业务页面；按钮触发的创建页、详情页不放左侧导航。 |
| `PlatformBreadcrumb` | 顶部面包屑 | 只保留必要层级，例如 `工作台 / 数据列表 / 详情页`。 |
| `PlatformPageHeader` | 页面头部 | 标题左对齐；按钮换行时与标题区保持 12px 行间距。 |
| `PlatformTabs` | 页面内分组切换 | 设置页、详情页内部模块切换时使用。 |
| `PlatformSteps` | 流程节点 | 状态流转、审批流程、进度节点使用流程节点样式。 |

## 反馈组件

| 组件 | 用途 | 关键规则 |
| --- | --- | --- |
| `PlatformModal` | 弹窗 | 弹窗居中；标题左对齐；左右 padding 20；不要居中标题。 |
| `PlatformDrawer` | 抽屉 | 右侧详情、编辑、补充信息使用抽屉。 |
| `PlatformResult` | 结果反馈 | 用于弹窗内或明确结果页；不要随意创建独立大结果页。 |
| `PlatformTimeline` | 操作记录 | 详情页处理记录、日志、状态变化。 |
| `PlatformTooltip` / `PlatformPopover` | 辅助说明 | 只在字段解释或轻量提示需要时使用。 |
| `showPlatformMessage` | 全局提示 | 保存、提交、删除成功等轻提示。 |

## 组合组件

这些组件是后续 PRD 生成原型的优先入口。需要替换内容时替换 props、slots、children，不改整体结构。

| 组件 | 场景 | 内容替换方式 |
| --- | --- | --- |
| `PlatformFilterPanel` | 筛选区 | 默认提供搜索/重置；筛选字段通过默认插槽放入 `PlatformFormItem`、输入框、下拉、日期区间。 |
| `PlatformTableCard` | 表格主卡片 | `title` 写表格标题；`actions` 放导出/创建；`selectedCount > 0` 时显示批量操作。 |
| `PlatformFormCard` | 创建/编辑表单页 | 标题、说明、表单字段、底部按钮可替换；按钮默认放底部右侧。 |
| `PlatformDetailSummary` | 详情摘要 | 支持普通字段、状态圆点、紧凑标签；状态优先使用圆点 + 文案。 |

## 页面模板组件

| 组件 | 场景 | 关键规则 |
| --- | --- | --- |
| `PlatformListPageTemplate` | 列表页 | 列表页由筛选区、表格卡片、分页、批量操作组成。 |
| `PlatformDetailPageTemplate` | 详情页 | 标题、辅助信息、操作按钮、摘要、流程、详情模块。 |
| `PlatformFormModalTemplate` | 表单弹窗 | 新增/编辑小表单；标题左对齐。 |
| `PlatformDetailDrawerTemplate` | 详情抽屉 | 表格行点详情、辅助查看时使用。 |
| `PlatformResultPageTemplate` | 结果页 | 仅在 PRD 明确需要结果页时使用。 |

## 元数据来源

组件导出与元数据位于：

- `packages/components/src/index.ts`
- `packages/components/src/organisms/PlatformAdminCompositions.ts`
- `packages/components/src/styles.css`
