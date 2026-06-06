<script setup lang="ts">
import { colors, shadows, typography } from '@platform/tokens';
import '@platform/tokens/theme.css';

const colorRows = [
  { name: 'brand.6', value: colors.brand[6], usage: '主色、选中态、主按钮' },
  { name: 'text.1', value: colors.text[1], usage: '一级文字' },
  { name: 'text.2', value: colors.text[2], usage: '二级文字' },
  { name: 'border.2', value: colors.border[2], usage: '默认边框' },
  { name: 'success.1', value: colors.success[1], usage: '成功浅背景' },
  { name: 'successAlt.1', value: colors.successAlt[1], usage: '冲突值保留，需复核' },
  { name: 'warning.6', value: colors.warning[6], usage: '警告主色' },
  { name: 'danger.6', value: colors.danger[6], usage: '危险主色' }
];

const typographyRows = [
  { name: 'body', ...typography.body },
  { name: 'bodyStrong', ...typography.bodyStrong },
  { name: 'titleSmall', ...typography.titleSmall },
  { name: 'titleMedium', ...typography.titleMedium },
  { name: 'titleLarge', ...typography.titleLarge }
];

const shadowRows = [
  { name: 'dropdown1', value: shadows.dropdown1 },
  { name: 'dropdown2', value: shadows.dropdown2 },
  { name: 'left1', value: shadows.left1 }
];
</script>

<template>
  <section class="token-section">
    <h2>颜色</h2>
    <div class="color-grid">
      <article v-for="item in colorRows" :key="item.name" class="color-card">
        <span class="swatch" :style="{ backgroundColor: item.value }" />
        <div>
          <strong>{{ item.name }}</strong>
          <code>{{ item.value }}</code>
          <p>{{ item.usage }}</p>
        </div>
      </article>
    </div>
  </section>

  <section class="token-section">
    <h2>字体</h2>
    <div class="type-list">
      <div v-for="item in typographyRows" :key="item.name" class="type-row">
        <span>{{ item.name }}</span>
        <p :style="{ fontFamily: item.fontFamily, fontWeight: item.fontWeight, fontSize: `${item.fontSize}px`, lineHeight: `${item.lineHeight}px` }">
          务实的组件规范
        </p>
      </div>
    </div>
  </section>

  <section class="token-section">
    <h2>阴影</h2>
    <div class="shadow-grid">
      <article v-for="item in shadowRows" :key="item.name" class="shadow-card" :style="{ boxShadow: item.value }">
        <strong>{{ item.name }}</strong>
        <code>{{ item.value }}</code>
      </article>
    </div>
  </section>
</template>

<style scoped>
.token-section {
  margin: 28px 0;
}

.color-grid,
.shadow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.color-card,
.shadow-card,
.type-row {
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
  padding: 14px;
  background: var(--ac-color-bg-1);
}

.color-card {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
}

.swatch {
  width: 40px;
  height: 40px;
  border: 1px solid var(--ac-color-border-2);
  border-radius: 6px;
}

.color-card strong,
.shadow-card strong,
.type-row span {
  display: block;
  color: var(--ac-color-text-1);
}

code {
  display: inline-block;
  margin-top: 4px;
  color: var(--ac-color-text-2);
}

p {
  margin: 6px 0 0;
  color: var(--ac-color-text-2);
}

.type-list {
  display: grid;
  gap: 10px;
}
</style>
