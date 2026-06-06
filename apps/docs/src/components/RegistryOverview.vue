<script setup lang="ts">
import { computed } from 'vue';
import { componentRegistry, type ComponentLevel } from '@platform/registry';

const levels: ComponentLevel[] = ['foundation', 'atom', 'molecule', 'organism', 'template'];

const groupedComponents = computed(() =>
  levels.map((level) => ({
    level,
    items: componentRegistry.filter((item) => item.level === level)
  }))
);
</script>

<template>
  <div class="registry-groups">
    <section v-for="group in groupedComponents" :key="group.level" class="registry-group">
      <h2>{{ group.level }}</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>组件</th>
              <th>Figma</th>
              <th>Arco Vue</th>
              <th>状态</th>
              <th>模板</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in group.items" :key="item.name">
              <td>
                <strong>{{ item.name }}</strong>
                <p>{{ item.description }}</p>
              </td>
              <td><code>{{ item.figmaNodeId || '-' }}</code></td>
              <td>{{ item.arcoVueComponent || '-' }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.templates?.join(', ') || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.registry-groups {
  display: grid;
  gap: 28px;
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid #E5E6EB;
  border-radius: 6px;
}

table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  border-bottom: 1px solid #E5E6EB;
  text-align: left;
  vertical-align: top;
}

th {
  color: #1D2129;
  background: #F7F8FA;
  font-weight: 600;
}

td {
  color: #4E5969;
}

td strong {
  color: #1D2129;
}

td p {
  margin: 4px 0 0;
  color: #86909C;
}
</style>
