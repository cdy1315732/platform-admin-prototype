<script setup lang="ts">
import '@platform/tokens/theme.css';
import '@platform/components/styles.css';
import {
  PlatformActionLinkGroup,
  PlatformBadge,
  PlatformButton,
  PlatformDataTable,
  PlatformFormItem,
  PlatformInput,
  PlatformPagination,
  PlatformSelect,
  PlatformTableTextCell,
  PlatformTag
} from '@platform/components';
import { componentRegistry, getComponentCatalogGroups, type ComponentLevel, type ComponentSpec } from '@platform/registry';

const groups = getComponentCatalogGroups();
const total = componentRegistry.length;
const implementedTotal = componentRegistry.filter((item) => item.status === 'implemented').length;
const plannedTotal = total - implementedTotal;

const levelLabels: Record<ComponentLevel, string> = {
  foundation: '基础规范',
  atom: '原子组件',
  molecule: '分子组件',
  organism: '组织组件',
  template: '页面模板'
};

const selectOptions = [
  { label: '启用', value: 'enabled' },
  { label: '停用', value: 'disabled' }
];

const tableColumns = [
  { title: '名称', dataIndex: 'name', slotName: 'name' },
  { title: '状态', dataIndex: 'status', slotName: 'status' },
  { title: '操作', dataIndex: 'action', slotName: 'action' }
];
const tableData = [
  { key: '1', name: '组件规范平台', status: '启用' },
  { key: '2', name: '原型生成页', status: '停用' }
];
const rowActions = [
  { key: 'detail', label: '详情' },
  { key: 'edit', label: '编辑' }
];

const statusText = (status: ComponentSpec['status']) => (status === 'implemented' ? '已实现' : '纳入规范');
const statusClass = (status: ComponentSpec['status']) =>
  status === 'implemented' ? 'status-implemented' : 'status-planned';
</script>

<template>
  <section class="catalog">
    <header class="catalog-summary">
      <div>
        <h2>完整组件目录</h2>
        <p>所有从 Figma 组件规范文件沉淀出来的组件都会在这里呈现，不再只展示已封装组件。</p>
      </div>
      <dl>
        <div>
          <dt>总数</dt>
          <dd>{{ total }}</dd>
        </div>
        <div>
          <dt>已实现</dt>
          <dd>{{ implementedTotal }}</dd>
        </div>
        <div>
          <dt>待封装</dt>
          <dd>{{ plannedTotal }}</dd>
        </div>
      </dl>
    </header>

    <section v-for="group in groups" :key="group.level" class="catalog-group">
      <div class="group-heading">
        <div>
          <h3>{{ levelLabels[group.level] }}</h3>
          <p>{{ group.implemented }} 个已实现，{{ group.planned }} 个待封装</p>
        </div>
        <span>{{ group.total }} 项</span>
      </div>

      <div class="catalog-grid">
        <article v-for="item in group.items" :key="item.name" class="catalog-card">
          <header class="card-heading">
            <div>
              <strong>{{ item.name }}</strong>
              <small>{{ item.arcoVueComponent || item.source }}</small>
            </div>
            <span class="status-pill" :class="statusClass(item.status)">
              {{ statusText(item.status) }}
            </span>
          </header>

          <p class="description">{{ item.description }}</p>

          <dl class="meta-list">
            <div>
              <dt>Figma</dt>
              <dd><code>{{ item.figmaNodeId || '-' }}</code></dd>
            </div>
            <div>
              <dt>模板</dt>
              <dd>{{ item.templates?.join(' / ') || '-' }}</dd>
            </div>
          </dl>

          <div v-if="item.props.length" class="prop-list">
            <span v-for="prop in item.props.slice(0, 6)" :key="prop.name">{{ prop.name }}</span>
          </div>

          <div class="preview-surface">
            <template v-if="item.name === 'Color'">
              <div class="swatches">
                <span style="background: #165DFF" />
                <span style="background: #00B42A" />
                <span style="background: #F53F3F" />
                <span style="background: #F7F8FA" />
              </div>
            </template>

            <template v-else-if="item.name === 'Fonts'">
              <div class="font-preview">
                <strong>标题 / 16 Semibold</strong>
                <span>正文 / 14 Regular</span>
              </div>
            </template>

            <template v-else-if="item.name === 'Shadows'">
              <div class="shadow-preview">
                <span />
                <span />
              </div>
            </template>

            <template v-else-if="item.name === 'Icons'">
              <div class="icon-preview">
                <span>+</span>
                <span>?</span>
                <span>i</span>
              </div>
            </template>

            <template v-else-if="item.name === 'Button'">
              <div class="inline-preview">
                <PlatformButton type="primary">主按钮</PlatformButton>
                <PlatformButton>默认</PlatformButton>
              </div>
            </template>

            <template v-else-if="item.name === 'input'">
              <PlatformInput placeholder="请输入内容" model-value="已输入内容" />
            </template>

            <template v-else-if="item.name === 'select'">
              <PlatformSelect placeholder="请选择状态" :options="selectOptions" />
            </template>

            <template v-else-if="item.name === 'datepicker'">
              <div class="mock-input">2026-06-05</div>
            </template>

            <template v-else-if="item.name === 'checkbox'">
              <div class="checkbox-preview">
                <span class="box checked" />已选中
                <span class="box" />未选中
              </div>
            </template>

            <template v-else-if="item.name === 'Tag'">
              <div class="inline-preview">
                <PlatformTag label="标签" color="arcoblue" />
                <PlatformTag label="关闭" color="green" closable />
              </div>
            </template>

            <template v-else-if="item.name === 'badge/status'">
              <div class="inline-preview">
                <PlatformBadge label="启用" status="success" />
                <PlatformBadge label="停用" status="normal" />
              </div>
            </template>

            <template v-else-if="item.name === 'textarea'">
              <div class="textarea-preview">多行文本输入区域</div>
            </template>

            <template v-else-if="item.name === 'InputNumber'">
              <div class="number-preview">
                <button>-</button>
                <span>128</span>
                <button>+</button>
              </div>
            </template>

            <template v-else-if="item.name === 'switch'">
              <div class="switch-preview">
                <span class="switch-on" />
                <span class="switch-off" />
              </div>
            </template>

            <template v-else-if="item.name === 'components/Link'">
              <button class="text-link">查看详情</button>
            </template>

            <template v-else-if="item.name === 'form-item'">
              <PlatformFormItem label="用户名称" field="name" required>
                <PlatformInput placeholder="请输入" />
              </PlatformFormItem>
            </template>

            <template v-else-if="item.name === 'components/table-cell/header'">
              <div class="header-cell-preview">
                <strong>创建时间</strong>
                <span>排序 / 筛选</span>
              </div>
            </template>

            <template v-else-if="item.name === 'components/table-cell/text'">
              <PlatformTableTextCell text="示例用户 A" secondary="普通用户" />
            </template>

            <template v-else-if="item.name === 'components/table-cell/action' || item.name === 'ActionLinkGroup'">
              <PlatformActionLinkGroup :actions="rowActions" />
            </template>

            <template v-else-if="item.name === 'selection-item'">
              <div class="selection-preview">
                <span>启用</span>
                <small>已选择</small>
              </div>
            </template>

            <template v-else-if="item.name === 'StatusTag'">
              <div class="inline-preview">
                <PlatformTag label="成功" color="green" />
                <PlatformTag label="异常" color="red" />
              </div>
            </template>

            <template v-else-if="item.name === 'table'">
              <PlatformDataTable :columns="tableColumns" :data="tableData">
                <template #name="{ record }">
                  <PlatformTableTextCell :text="record.name" secondary="系统页面" />
                </template>
                <template #status="{ record }">
                  <PlatformBadge :label="record.status" :status="record.status === '启用' ? 'success' : 'normal'" />
                </template>
                <template #action>
                  <PlatformActionLinkGroup :actions="rowActions" />
                </template>
              </PlatformDataTable>
            </template>

            <template v-else-if="item.name === 'pagination'">
              <PlatformPagination :total="48" :current="1" :page-size="10" />
            </template>

            <template v-else-if="item.name === 'menu'">
              <div class="menu-preview">
                <span class="active">用户管理</span>
                <span>权限配置</span>
                <span>系统设置</span>
              </div>
            </template>

            <template v-else-if="item.name === 'tabs/line'">
              <div class="tabs-preview">
                <span class="active">基础信息</span>
                <span>操作记录</span>
                <span>配置项</span>
              </div>
            </template>

            <template v-else-if="item.name === 'Message'">
              <div class="message-preview">操作成功，数据已保存</div>
            </template>

            <template v-else-if="item.name === 'popover'">
              <div class="popover-preview">
                <button>悬浮触发</button>
                <span>气泡内容</span>
              </div>
            </template>

            <template v-else-if="item.name === 'upload'">
              <div class="upload-preview">点击或拖拽上传文件</div>
            </template>

            <template v-else-if="item.name === 'Drawer' || item.name === 'DetailDrawerTemplate'">
              <div class="drawer-preview">
                <span />
                <aside>详情抽屉</aside>
              </div>
            </template>

            <template v-else-if="item.name === 'ListPageTemplate'">
              <div class="template-preview list-template">
                <span />
                <span />
                <strong />
              </div>
            </template>

            <template v-else-if="item.name === 'DetailPageTemplate'">
              <div class="template-preview detail-template">
                <strong />
                <span />
                <span />
              </div>
            </template>

            <template v-else-if="item.name === 'FormModalTemplate'">
              <div class="modal-preview">
                <strong />
                <span />
                <span />
              </div>
            </template>

            <template v-else>
              <div class="planned-preview">
                <strong>已纳入规范</strong>
                <span>待进入组件封装批次</span>
              </div>
            </template>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<style scoped>
.catalog {
  display: grid;
  gap: 32px;
  margin: 28px 0 36px;
}

.catalog-summary,
.catalog-card,
.catalog-group {
  border: 1px solid var(--ac-color-border-2);
  background: var(--ac-color-bg-1);
}

.catalog-summary {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 22px;
  border-radius: 8px;
}

.catalog-summary h2,
.group-heading h3 {
  margin: 0;
}

.catalog-summary p,
.group-heading p,
.description,
.meta-list dt,
.meta-list dd,
.card-heading small,
.planned-preview span {
  color: var(--ac-color-text-2);
}

.catalog-summary dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(72px, 1fr));
  gap: 12px;
  margin: 0;
}

.catalog-summary dl div {
  min-width: 76px;
  padding: 12px;
  border-radius: 6px;
  background: var(--ac-color-bg-2);
}

.catalog-summary dt,
.catalog-summary dd {
  margin: 0;
}

.catalog-summary dt {
  color: var(--ac-color-text-2);
  font-size: 12px;
}

.catalog-summary dd {
  margin-top: 2px;
  color: var(--ac-color-text-1);
  font-size: 22px;
  font-weight: 600;
}

.catalog-group {
  display: grid;
  gap: 16px;
  padding: 20px;
  border-radius: 8px;
}

.group-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.group-heading > span {
  color: var(--ac-color-text-2);
  font-size: 13px;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
}

.catalog-card {
  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
  gap: 12px;
  min-height: 300px;
  padding: 16px;
  border-radius: 8px;
}

.card-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card-heading > div {
  display: grid;
  gap: 4px;
}

.card-heading strong {
  color: var(--ac-color-text-1);
  font-size: 15px;
}

.status-pill {
  flex: 0 0 auto;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  line-height: 20px;
}

.status-implemented {
  color: #00B42A;
  background: #E8FFEA;
}

.status-planned {
  color: #4E5969;
  background: #F2F3F5;
}

.description {
  min-height: 42px;
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
}

.meta-list {
  display: grid;
  gap: 6px;
  margin: 0;
}

.meta-list div {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 8px;
}

.meta-list dt,
.meta-list dd {
  margin: 0;
  overflow-wrap: anywhere;
  font-size: 12px;
}

.prop-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.prop-list span {
  padding: 2px 7px;
  border-radius: 4px;
  color: var(--ac-color-text-2);
  background: var(--ac-color-bg-2);
  font-size: 12px;
}

.preview-surface {
  display: grid;
  align-content: center;
  min-height: 96px;
  padding: 12px;
  overflow: hidden;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  background: #FBFCFD;
}

.inline-preview,
.swatches,
.shadow-preview,
.icon-preview,
.switch-preview,
.checkbox-preview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.swatches span {
  width: 34px;
  height: 34px;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
}

.font-preview,
.planned-preview {
  display: grid;
  gap: 6px;
}

.font-preview strong {
  color: var(--ac-color-text-1);
  font-size: 16px;
}

.font-preview span {
  color: var(--ac-color-text-2);
  font-size: 14px;
}

.shadow-preview span {
  width: 48px;
  height: 42px;
  border-radius: 6px;
  background: #FFFFFF;
  box-shadow: var(--ac-shadow-dropdown1);
}

.shadow-preview span:last-child {
  box-shadow: var(--ac-shadow-card);
}

.icon-preview span {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  color: var(--ac-color-text-1);
  font-weight: 600;
}

.mock-input,
.textarea-preview,
.number-preview,
.selection-preview,
.message-preview,
.upload-preview,
.header-cell-preview {
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  background: #FFFFFF;
}

.mock-input {
  padding: 8px 10px;
  color: var(--ac-color-text-1);
}

.checkbox-preview {
  color: var(--ac-color-text-1);
  font-size: 13px;
}

.box {
  width: 14px;
  height: 14px;
  border: 1px solid var(--ac-color-border-3);
  border-radius: 3px;
}

.box.checked {
  border-color: #165DFF;
  background: #165DFF;
}

.textarea-preview {
  min-height: 68px;
  padding: 10px;
  color: var(--ac-color-text-2);
}

.number-preview {
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  max-width: 160px;
  overflow: hidden;
}

.number-preview button,
.number-preview span {
  display: grid;
  place-items: center;
  min-height: 32px;
  border: 0;
  background: #FFFFFF;
  color: var(--ac-color-text-1);
}

.number-preview span {
  border-right: 1px solid var(--ac-color-border-2);
  border-left: 1px solid var(--ac-color-border-2);
}

.switch-preview span {
  position: relative;
  width: 38px;
  height: 20px;
  border-radius: 999px;
  background: #C9CDD4;
}

.switch-preview span::after {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #FFFFFF;
  content: '';
}

.switch-preview .switch-on {
  background: #165DFF;
}

.switch-preview .switch-on::after {
  left: 21px;
}

.text-link {
  width: fit-content;
  padding: 0;
  border: 0;
  color: #165DFF;
  background: transparent;
  cursor: pointer;
}

.header-cell-preview,
.selection-preview {
  display: grid;
  gap: 4px;
  padding: 10px;
}

.header-cell-preview strong,
.selection-preview span {
  color: var(--ac-color-text-1);
}

.header-cell-preview span,
.selection-preview small {
  color: var(--ac-color-text-2);
  font-size: 12px;
}

.menu-preview,
.tabs-preview {
  display: grid;
  gap: 6px;
}

.menu-preview span,
.tabs-preview span {
  padding: 7px 10px;
  border-radius: 4px;
  color: var(--ac-color-text-2);
}

.menu-preview .active,
.tabs-preview .active {
  color: #165DFF;
  background: #E8F3FF;
}

.message-preview {
  padding: 10px 12px;
  color: #00B42A;
  background: #E8FFEA;
}

.popover-preview {
  display: flex;
  align-items: center;
  gap: 12px;
}

.popover-preview button {
  padding: 6px 10px;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  background: #FFFFFF;
}

.popover-preview span {
  padding: 8px 10px;
  border-radius: 6px;
  color: var(--ac-color-text-1);
  background: #FFFFFF;
  box-shadow: var(--ac-shadow-dropdown1);
}

.upload-preview {
  display: grid;
  place-items: center;
  min-height: 72px;
  border-style: dashed;
  color: var(--ac-color-text-2);
}

.drawer-preview {
  position: relative;
  min-height: 96px;
  overflow: hidden;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  background: #F7F8FA;
}

.drawer-preview > span {
  position: absolute;
  inset: 0;
  background: rgb(29 33 41 / 8%);
}

.drawer-preview aside {
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  place-items: center;
  width: 52%;
  height: 100%;
  border-left: 1px solid var(--ac-color-border-2);
  color: var(--ac-color-text-1);
  background: #FFFFFF;
}

.template-preview,
.modal-preview {
  display: grid;
  gap: 8px;
}

.template-preview span,
.template-preview strong,
.modal-preview span,
.modal-preview strong {
  display: block;
  border-radius: 5px;
  background: #E5E6EB;
}

.list-template {
  grid-template-columns: 1fr 1fr;
}

.list-template strong {
  grid-column: 1 / -1;
  height: 40px;
}

.list-template span {
  height: 28px;
}

.detail-template strong {
  width: 55%;
  height: 18px;
}

.detail-template span {
  height: 24px;
}

.modal-preview {
  max-width: 220px;
  padding: 12px;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 8px;
  background: #FFFFFF;
}

.modal-preview strong {
  width: 54%;
  height: 18px;
}

.modal-preview span {
  height: 28px;
}

@media (max-width: 720px) {
  .catalog-summary {
    display: grid;
  }

  .catalog-summary dl {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
