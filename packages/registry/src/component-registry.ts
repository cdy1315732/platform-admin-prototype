import type { ComponentLevel, ComponentPropSpec, ComponentSpec } from './schemas';

const propNames = (names: string[]): ComponentPropSpec[] =>
  names.map((name) => ({
    name,
    type: 'unknown',
    description: name
  }));

const component = (
  input: Omit<ComponentSpec, 'id' | 'props' | 'examples' | 'status'> & {
    figmaNodeId: string;
    props?: string[];
    templates?: string[];
    status?: ComponentSpec['status'];
  }
): ComponentSpec => ({
  id: input.name,
  name: input.name,
  level: input.level,
  figmaNodeId: input.figmaNodeId,
  arcoVueComponent: input.arcoVueComponent,
  description: input.description,
  props: propNames(input.props ?? []),
  tokens: input.tokens,
  templates: input.templates,
  examples: [],
  status: input.status ?? 'planned',
  source: input.source ?? 'figma'
});

export const componentRegistry = [
  component({ name: 'Color', level: 'foundation', figmaNodeId: '1:3863', description: '颜色规范区', tokens: ['color.brand.6', 'color.text.1'], status: 'implemented' }),
  component({ name: 'Fonts', level: 'foundation', figmaNodeId: '1:3523', description: '字体规范区', tokens: ['font.cn.14.regular'], status: 'implemented' }),
  component({ name: 'Shadows', level: 'foundation', figmaNodeId: '1:3701', description: '阴影规范区', tokens: ['shadow.dropdown1'], status: 'implemented' }),
  component({ name: 'Icons', level: 'foundation', figmaNodeId: '1:4404', description: '图标参考区', tokens: ['icon.registry'], status: 'implemented' }),

  component({ name: 'Button', level: 'atom', figmaNodeId: '1:4398', arcoVueComponent: 'Button', description: '按钮。Figma 当前是参考 Frame，平台默认封装 Arco Button。', props: ['type', 'size', 'disabled', 'loading'], templates: ['ListPageTemplate', 'FormModalTemplate'], source: 'platform-rule', status: 'implemented' }),
  component({ name: '.checkbox-input', level: 'atom', figmaNodeId: '1:18576', arcoVueComponent: 'Checkbox', description: '复选框内部输入控件。', props: ['选中', '半选', '禁用', '悬停'], status: 'implemented' }),
  component({ name: 'input', level: 'atom', figmaNodeId: '1:23077', arcoVueComponent: 'Input', description: '输入框', props: ['前缀图标', '后缀图标', '替换文本', '尺寸', '状态', '填充'], templates: ['ListPageTemplate', 'FormModalTemplate'], status: 'implemented' }),
  component({ name: '.input-addon', level: 'molecule', figmaNodeId: '1:23366', arcoVueComponent: 'Input', description: '输入框前后缀扩展区。', props: ['位置', '下拉', '仅图标'], templates: ['ListPageTemplate', 'FormModalTemplate'], status: 'implemented' }),
  component({ name: 'password', level: 'atom', figmaNodeId: '1:23385', arcoVueComponent: 'Input.Password', description: '密码输入框', props: ['尺寸', '填充', '可见'], templates: ['FormModalTemplate'], status: 'implemented' }),
  component({ name: 'select', level: 'atom', figmaNodeId: '1:24197', arcoVueComponent: 'Select', description: '选择器', props: ['尺寸', '填充', '多选', '悬停', '聚焦', '禁用'], templates: ['ListPageTemplate', 'FormModalTemplate'], status: 'implemented' }),
  component({ name: 'cascader', level: 'atom', figmaNodeId: '1:18040', arcoVueComponent: 'Cascader', description: '级联选择器', props: ['填充'], templates: ['FormModalTemplate'], status: 'implemented' }),
  component({ name: 'datepicker', level: 'atom', figmaNodeId: '1:18803', arcoVueComponent: 'DatePicker', description: '日期选择器', props: ['尺寸', '填充', '范围', '悬停', '禁用'], templates: ['ListPageTemplate', 'FormModalTemplate'], status: 'implemented' }),
  component({ name: 'datepicker-dropdown', level: 'molecule', figmaNodeId: '1:19116', arcoVueComponent: 'DatePicker', description: '日期选择器浮层面板。', props: ['类型', '范围', '预设范围'], status: 'implemented' }),
  component({ name: '.header-icon', level: 'atom', figmaNodeId: '1:18754', arcoVueComponent: 'DatePicker', description: '日期面板头部切换图标。', props: ['纬度', '上一个', '下一个', '悬停'], status: 'implemented' }),
  component({ name: 'picker-cell/month', level: 'atom', figmaNodeId: '1:18690', arcoVueComponent: 'DatePicker', description: '日期面板月份单元格。', props: ['本月内', '今天', '选中', '悬停', '禁用'], status: 'implemented' }),
  component({ name: 'picker-cell/year', level: 'atom', figmaNodeId: '1:18735', arcoVueComponent: 'DatePicker', description: '日期面板年份单元格。', props: ['选中', '悬停', '本月'], status: 'implemented' }),
  component({ name: 'checkbox', level: 'atom', figmaNodeId: '1:18604', arcoVueComponent: 'Checkbox', description: '复选框', props: ['替换文本', '显示标签', '选中', '半选', '禁用', '悬停'], status: 'implemented' }),
  component({ name: 'components/radio', level: 'atom', figmaNodeId: '1:24139', arcoVueComponent: 'Radio', description: '单选框', props: ['替换文本', '选中', '禁用', '悬停'], status: 'implemented' }),
  component({ name: 'Tag', level: 'atom', figmaNodeId: '1:16391', arcoVueComponent: 'Tag', description: '标签', props: ['显示图标', '可关闭', '替换文本', '尺寸', '颜色', '填充', '边框'], templates: ['ListPageTemplate', 'DetailPageTemplate'], status: 'implemented' }),
  component({ name: 'tag-deletion', level: 'atom', figmaNodeId: '1:17096', arcoVueComponent: 'Tag', description: '标签删除态。', props: ['尺寸'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'badge/dot', level: 'atom', figmaNodeId: '1:5420', arcoVueComponent: 'Badge', description: '圆点徽标。', props: ['颜色'], templates: ['ListPageTemplate', 'DetailPageTemplate'], status: 'implemented' }),
  component({ name: 'badge/status', level: 'atom', figmaNodeId: '1:5517', arcoVueComponent: 'Badge', description: '状态徽标', props: ['替换文本', '类型'], templates: ['ListPageTemplate', 'DetailPageTemplate'], status: 'implemented' }),
  component({ name: 'badge/count', level: 'atom', figmaNodeId: '1:5533', arcoVueComponent: 'Badge', description: '计数徽标。', props: ['置灰'], templates: ['ListPageTemplate', 'DetailPageTemplate'], status: 'implemented' }),
  component({ name: 'badge-avatar', level: 'molecule', figmaNodeId: '1:5542', arcoVueComponent: 'Badge', description: '头像徽标组合。', props: ['圆点', '字符', '自定义'], templates: ['ListPageTemplate', 'DetailPageTemplate'], status: 'implemented' }),
  component({ name: 'textarea', level: 'atom', figmaNodeId: '1:23450', arcoVueComponent: 'Textarea', description: '文本域', props: ['字数统计', '替换文本', '状态', '填充'], templates: ['FormModalTemplate'], status: 'implemented' }),
  component({ name: 'inputtag', level: 'atom', figmaNodeId: '1:23570', arcoVueComponent: 'InputTag', description: '标签输入框', props: ['尺寸', '状态', '填充', '禁用'], templates: ['FormModalTemplate'], status: 'implemented' }),
  component({ name: 'InputNumber', level: 'atom', figmaNodeId: '1:24086', arcoVueComponent: 'InputNumber', description: '数字输入框', props: ['前缀', '后缀', '尺寸', '状态', '按钮模式'], templates: ['FormModalTemplate'], status: 'implemented' }),
  component({ name: 'switch', level: 'atom', figmaNodeId: '1:24392', arcoVueComponent: 'Switch', description: '开关', props: ['类型', '尺寸', '开启', '禁用'], status: 'implemented' }),
  component({ name: 'timepicker', level: 'atom', figmaNodeId: '1:24418', arcoVueComponent: 'TimePicker', description: '时间选择器', props: ['尺寸', '填充', '范围', '悬停', '禁用'], templates: ['FormModalTemplate'], status: 'implemented' }),
  component({ name: 'treeselect', level: 'atom', figmaNodeId: '1:50194', arcoVueComponent: 'TreeSelect', description: '树选择器', props: ['尺寸', '聚焦'], templates: ['FormModalTemplate'], status: 'implemented' }),
  component({ name: 'components/Link', level: 'atom', figmaNodeId: '1:51230', arcoVueComponent: 'Link', description: '链接', props: ['显示图标', '替换文本', '当前状态'], templates: ['ListPageTemplate', 'DetailPageTemplate'], status: 'implemented' }),

  component({ name: 'form-item', level: 'molecule', figmaNodeId: '1:22531', arcoVueComponent: 'Form.Item', description: '表单项', props: ['提示', '辅助文字', '替换文本', '必填', '冒号', '布局', '类型'], templates: ['FormModalTemplate', 'ListPageTemplate'], status: 'implemented' }),
  component({ name: '.sorter', level: 'molecule', figmaNodeId: '1:12067', arcoVueComponent: 'Table', description: '表头排序控件。', props: ['排序'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: '.filter', level: 'molecule', figmaNodeId: '1:12083', arcoVueComponent: 'Table', description: '表头筛选控件。', props: ['悬停', '激活'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: '.search', level: 'molecule', figmaNodeId: '1:12092', arcoVueComponent: 'Table', description: '表头搜索控件。', props: ['悬停', '激活'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/header', level: 'molecule', figmaNodeId: '1:12101', arcoVueComponent: 'Table', description: '表格表头单元格', props: ['尺寸', '排序', '激活', '筛选', '搜索'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/text', level: 'molecule', figmaNodeId: '1:12370', arcoVueComponent: 'Table', description: '表格文本单元格', props: ['替换文本', '尺寸'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/text+icon', level: 'molecule', figmaNodeId: '1:12379', arcoVueComponent: 'Table', description: '表格文本加图标单元格。', props: ['尺寸', '图标位置'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/avatar+text', level: 'molecule', figmaNodeId: '1:12404', arcoVueComponent: 'Table', description: '表格头像加文本单元格。', props: ['尺寸'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/tag', level: 'molecule', figmaNodeId: '1:12417', arcoVueComponent: 'Table', description: '表格标签单元格。', props: ['尺寸'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/status', level: 'molecule', figmaNodeId: '1:12426', arcoVueComponent: 'Table', description: '表格状态单元格。', props: ['尺寸'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/sort', level: 'molecule', figmaNodeId: '1:12435', arcoVueComponent: 'Table', description: '表格排序单元格。', props: ['尺寸'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/checkbox', level: 'molecule', figmaNodeId: '1:12444', arcoVueComponent: 'Table', description: '表格选择单元格。', props: ['尺寸', '类型', '选中'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/expand icon', level: 'molecule', figmaNodeId: '1:12477', arcoVueComponent: 'Table', description: '表格展开图标单元格。', props: ['尺寸', '可展开', '展开'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/switch', level: 'molecule', figmaNodeId: '1:12502', arcoVueComponent: 'Table', description: '表格开关单元格。', props: ['尺寸'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/action', level: 'molecule', figmaNodeId: '1:12511', arcoVueComponent: 'Table', description: '表格操作单元格', props: ['尺寸', '数量'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'components/table-cell/link', level: 'molecule', figmaNodeId: '1:12548', arcoVueComponent: 'Table', description: '表格链接单元格。', props: ['尺寸'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'selection-item', level: 'molecule', figmaNodeId: '1:24243', arcoVueComponent: 'Select.Option', description: '选择器选项', props: ['可关闭', '尺寸', '禁用', '悬停', '聚焦'], templates: ['FormModalTemplate'], status: 'implemented' }),
  component({ name: 'components/steps-item-icon', level: 'molecule', figmaNodeId: '1:53148', arcoVueComponent: 'Steps', description: '步骤条节点图标。', props: ['状态'], templates: ['DetailPageTemplate'], status: 'implemented' }),
  component({ name: 'vertical-menu-item/Put away', level: 'molecule', figmaNodeId: '1:52605', arcoVueComponent: 'Menu', description: '收起态垂直菜单项。', props: ['悬停', '选中', '禁用'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'StatusTag', level: 'molecule', figmaNodeId: '1:16391', arcoVueComponent: 'Tag', description: '平台状态标签，由 Tag 语义化封装。', props: ['status', 'label'], templates: ['ListPageTemplate', 'DetailPageTemplate'], source: 'platform-rule', status: 'implemented' }),
  component({ name: 'ActionLinkGroup', level: 'molecule', figmaNodeId: '1:12511', arcoVueComponent: 'Link', description: '平台操作链接组。', props: ['actions', 'size'], templates: ['ListPageTemplate'], source: 'platform-rule', status: 'implemented' }),

  component({ name: 'table', level: 'organism', figmaNodeId: '1:12557', arcoVueComponent: 'Table', description: '表格', props: ['分页', '列数量', '尺寸', '边框'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'pagination', level: 'organism', figmaNodeId: '1:52918', arcoVueComponent: 'Pagination', description: '分页', props: ['跳转', '展示条目', '展示总数', '尺寸', '禁用'], templates: ['ListPageTemplate'], status: 'implemented' }),
  component({ name: 'Modal', level: 'organism', figmaNodeId: 'platform-rule:modal', arcoVueComponent: 'Modal', description: '对话框。Figma 当前未提供 component set，平台按 Arco 官方 Modal 行为封装。', props: ['visible', 'title', 'width', 'okText', 'cancelText', 'okLoading'], templates: ['FormModalTemplate'], source: 'platform-rule', status: 'implemented' }),
  component({ name: 'menu', level: 'organism', figmaNodeId: '1:52489', arcoVueComponent: 'Menu', description: '菜单', props: ['类型', '数量', '收起'], templates: ['ListPageTemplate', 'DetailPageTemplate'], status: 'implemented' }),
  component({ name: 'breadcrumb', level: 'organism', figmaNodeId: '1:51239', arcoVueComponent: 'Breadcrumb', description: '面包屑导航。', props: ['分隔符', '数量'], templates: ['DetailPageTemplate', 'ListPageTemplate'], status: 'implemented' }),
  component({ name: 'tabs/line', level: 'organism', figmaNodeId: '1:16158', arcoVueComponent: 'Tabs', description: '线性标签页', props: ['布局', '图标', '附加', '滚动'], templates: ['DetailPageTemplate'], status: 'implemented' }),
  component({ name: 'PageHeader', level: 'organism', figmaNodeId: 'platform-rule:page-header', arcoVueComponent: 'PageHeader', description: '页头。Figma 当前未提供 component set，平台按 Arco 官方 PageHeader 行为封装。', props: ['title', 'subtitle', 'showBack'], templates: ['DetailPageTemplate', 'ListPageTemplate'], source: 'platform-rule', status: 'implemented' }),
  component({ name: 'Dropdown', level: 'organism', figmaNodeId: 'platform-rule:dropdown', arcoVueComponent: 'Dropdown', description: '下拉菜单。Figma 当前未提供 component set，平台按 Arco 官方 Dropdown 行为封装。', props: ['trigger', 'position', 'options'], templates: ['ListPageTemplate', 'DetailPageTemplate'], source: 'platform-rule', status: 'implemented' }),
  component({ name: 'components/steps-item', level: 'organism', figmaNodeId: '1:53161', arcoVueComponent: 'Steps', description: '步骤条条目组合。', props: ['链接线', '描述', '替换图标', '布局', '小型', '状态', '图标'], templates: ['DetailPageTemplate', 'FormModalTemplate'], status: 'implemented' }),
  component({ name: 'Message', level: 'organism', figmaNodeId: '1:51040', arcoVueComponent: 'Message', description: '全局提示', props: ['可关闭', '文本', '类型'], templates: ['ListPageTemplate', 'FormModalTemplate'], status: 'implemented' }),
  component({ name: 'Tooltip', level: 'organism', figmaNodeId: '1:17834', arcoVueComponent: 'Tooltip', description: '文字气泡提示。', props: ['位置', '迷你'], status: 'implemented' }),
  component({ name: 'popover', level: 'organism', figmaNodeId: '1:7449', arcoVueComponent: 'Popover', description: '气泡卡片', props: ['位置'], status: 'implemented' }),
  component({ name: 'timeline', level: 'organism', figmaNodeId: '1:17367', arcoVueComponent: 'Timeline', description: '时间轴。', props: ['布局', '双向'], templates: ['DetailPageTemplate'], status: 'implemented' }),
  component({ name: 'progress-line', level: 'organism', figmaNodeId: '1:51069', arcoVueComponent: 'Progress', description: '线性进度条。', props: ['尺寸', '状态'], status: 'implemented' }),
  component({ name: 'Result', level: 'organism', figmaNodeId: '1:51158', arcoVueComponent: 'Result', description: '结果页反馈。', props: ['成功提示', '信息提示', '警告提示', '错误提示'], templates: ['ResultPageTemplate'], status: 'implemented' }),
  component({ name: 'upload', level: 'organism', figmaNodeId: '1:50739', arcoVueComponent: 'Upload', description: '上传', props: ['类型', '触发器'], templates: ['FormModalTemplate'], status: 'implemented' }),
  component({ name: 'Drawer', level: 'organism', figmaNodeId: '1:50985', arcoVueComponent: 'Drawer', description: '抽屉。Figma 当前是 instance，平台默认封装 Arco Drawer。', props: ['visible', 'title', 'width'], templates: ['DetailDrawerTemplate'], source: 'platform-rule', status: 'implemented' }),

  component({ name: 'ListPageTemplate', level: 'template', figmaNodeId: '1:12557', description: '列表页模板：筛选表单 + 表格 + 分页。', props: ['title', 'filters', 'columns', 'actions'], templates: ['ListPageTemplate'], source: 'platform-rule', status: 'implemented' }),
  component({ name: 'DetailPageTemplate', level: 'template', figmaNodeId: '1:6837', description: '详情页模板：标题 + 描述区 + 操作区。', props: ['title', 'sections', 'actions'], templates: ['DetailPageTemplate'], source: 'platform-rule', status: 'implemented' }),
  component({ name: 'FormModalTemplate', level: 'template', figmaNodeId: '1:22531', description: '表单弹窗模板。', props: ['title', 'fields', 'actions'], templates: ['FormModalTemplate'], source: 'platform-rule', status: 'implemented' }),
  component({ name: 'DetailDrawerTemplate', level: 'template', figmaNodeId: '1:50985', description: '详情抽屉模板。', props: ['title', 'sections', 'actions'], templates: ['DetailDrawerTemplate'], source: 'platform-rule', status: 'implemented' }),
  component({ name: 'ResultPageTemplate', level: 'template', figmaNodeId: '1:51158', description: '结果页模板：Result 反馈 + 操作区。', props: ['status', 'title', 'subtitle', 'actions'], templates: ['ResultPageTemplate'], source: 'platform-rule', status: 'implemented' })
] satisfies ComponentSpec[];

export const getComponentByName = (name: string): ComponentSpec | undefined =>
  componentRegistry.find((item) => item.name === name);

export const getComponentsByLevel = (level: ComponentLevel): ComponentSpec[] =>
  componentRegistry.filter((item) => item.level === level);

export const getComponentsForTemplate = (template: string): ComponentSpec[] =>
  componentRegistry.filter((item) => item.templates?.includes(template));

const catalogLevels: ComponentLevel[] = ['foundation', 'atom', 'molecule', 'organism', 'template'];

export interface ComponentCatalogGroup {
  level: ComponentLevel;
  items: ComponentSpec[];
  implemented: number;
  planned: number;
  total: number;
}

export const getComponentCatalogGroups = (): ComponentCatalogGroup[] =>
  catalogLevels.map((level) => {
    const items = getComponentsByLevel(level);
    const implemented = items.filter((item) => item.status === 'implemented').length;

    return {
      level,
      items,
      implemented,
      planned: items.length - implemented,
      total: items.length
    };
  });
