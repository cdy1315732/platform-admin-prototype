# PRD 到可交互原型工作流

本工作流用于把 PRD、需求描述、截图、飞书文档内容转成 PC 后台可交互原型。

## 1. 判断适用范围

只在以下情况使用本规范：

- PC 端后台。
- B 端业务系统。
- Admin 管理台。
- 列表、表单、详情、弹窗、抽屉、设置、仪表盘等后台页面。

不适用：

- 移动端。
- 官网、营销页、活动页。
- 小程序前台页面。
- C 端消费产品页面。

## 2. 抽取 PRD 信息

从输入中提取：

- 页面清单。
- 字段清单。
- 表格列。
- 筛选项。
- 操作按钮。
- 状态枚举。
- 权限规则。
- 流程节点。
- 弹窗/抽屉/结果反馈。
- 可能超长的业务字段及其当前任务场景；详细分类和展示决策遵循 `long-text-display.md`。
- 缺失但生成原型必须假设的信息。

## 3. 规划页面架构

先确定：

- 哪些是一级导航页面。
- 哪些是二级页面。
- 哪些是弹窗。
- 哪些是抽屉。
- 哪些交互改变页面状态。

必须避免：

- 把所有内容放在一个页面。
- 把创建页、详情页放进左侧导航。
- 用静态展示代替真实交互。

## 4. 选择本地组件

优先按以下方式选择：

- 筛选：`PlatformFilterPanel`
- 表格：`PlatformTableCard` + `PlatformDataTable`
- 表单：`PlatformFormCard`
- 详情摘要：`PlatformDetailSummary`
- 弹窗：`PlatformModal` / `PlatformFormModalTemplate`
- 抽屉：`PlatformDrawer` / `PlatformDetailDrawerTemplate`
- 结果反馈：`PlatformResult`
- 流程：`PlatformSteps`
- 图表：仅当 PRD 明确出现图表、趋势、分布、排行、统计可视化等需求时，读取 `chart-rules.md` 并到 ECharts 示例站点选型。

## 5. PRD 到组件的决策表

当 PRD 出现以下页面或能力时，直接使用对应的本地组合组件。除非业务要求明显不同，不要重新发明结构。

| PRD 需求 | 优先组件 / 模块 | 生成规则 |
| --- | --- | --- |
| 多条件查询、关键词、状态、日期范围 | `PlatformFilterPanel` + `PlatformFormItem` + 表单控件 | 筛选区独立展示，左对齐；下拉默认“全部...”；搜索/重置靠近筛选项。 |
| 数据列表、分页、批量操作、导出、新增 | `PlatformTableCard` + `PlatformDataTable` + `PlatformPagination` | 表格标题左侧，导出/新增右侧；勾选后才显示批量操作。 |
| 表格状态列 | `PlatformTableStatusCell` 或圆点 + 文案 | 状态颜色固定，避免使用撑满空白的大标签。 |
| 表格优先级、分类、轻量枚举 | `PlatformTableTagCell` | 使用紧凑标签，避免横向拉伸。 |
| 表格行操作 | `PlatformActionLinkGroup` | 详情、编辑、分配、日志、关闭等动作以文本链接承载。 |
| 时间列排序 | `PlatformTableSortCell` 或 `PlatformDataTable` sortable | 默认上下都不选中，点击后切换升序/降序。 |
| 创建/编辑二级页面 | `PlatformFormCard` | 不进左侧导航；标题、说明、字段在同一卡片；按钮在底部右侧。 |
| 小型新增/编辑 | `PlatformModal` 或 `PlatformFormModalTemplate` | 弹窗居中，标题左对齐，左右 padding 20。 |
| 侧边详情/长表单 | `PlatformDrawer` 或 `PlatformDetailDrawerTemplate` | 右侧滑出；不要做成独立页面。 |
| 单条数据详情 | `PlatformDetailPageTemplate` + `PlatformDetailSummary` | 状态用圆点 + 文案，优先级用紧凑标签；摘要高度克制。 |
| 流程、审批、生命周期 | `PlatformSteps` | 使用步骤节点，不用普通横向标签条。 |
| 图表、趋势、分布、占比、排行、统计可视化 | `chart-rules.md` + ECharts 示例选型 | 只有出现图表需求时才进入该流程；不提前枚举图表，不为无图表页面强行加图。 |
| 操作记录、日志、状态变化 | `PlatformTimeline` | 放在详情页或抽屉里。 |
| 附件上传 | `PlatformUpload` | 默认无文件；使用灰色上传按钮；需要 disabled/file-list 状态时补齐。 |
| 启用/禁用 | `PlatformSwitch` | 小号开关圆点必须上下居中；禁用态灰色。 |
| 成功/失败/提交反馈 | `showPlatformMessage`、`PlatformResult`、`PlatformModal` | 默认轻提示或弹窗内反馈；只有 PRD 明确要求才生成独立结果页。 |
| 系统配置、通知配置、规则配置 | `PlatformTabs` 或左侧分组 + 表单卡片 | 文案精简，行与标题左对齐，保存按钮只保留一个入口。 |
| 分类树、组织树、权限树 | 主卡片 + 层级节点 + `PlatformSwitch` + 操作链接 | 标题和树内容合并在主卡片；节点操作靠右。 |

如果同一 PRD 同时包含列表、详情、创建、弹窗、抽屉，优先生成真实后台工作流：导航进入列表，按钮进入二级页，行操作打开详情/弹窗/抽屉，而不是把所有组件堆在同一页。

## 6. 生成原型

默认生成到 `platform-admin-prototype` 仓库的 `apps/playground` 中：

- Vue 3
- Arco Design Vue
- `@platform/components`
- 可点击、可输入、可切换

如果用户要求独立文件，可以生成 HTML，但仍需遵守本地组件规范的布局和交互。

## 7. 验证

默认需要验证：

- 页面能打开。
- 导航能切换。
- 表单可输入。
- 筛选和重置有反馈。
- 表格排序/分页/勾选可交互。
- 弹窗/抽屉可打开关闭。
- 不出现明显溢出、错位、重叠。
- 长文本符合 `long-text-display.md` 的任务分级，完整原始值、展开内容和数据长度限制不受展示省略影响。

如果用户明确说“不用验证”，则改完后停止。
