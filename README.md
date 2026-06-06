# Platform Admin Prototype

一套用于生成 PC 端后台交互原型的 Vue 3 组件平台和 Codex Skill。它把后台常见的筛选、表格、表单、详情、弹窗、抽屉、步骤流转、上传、开关和反馈组件做成本地规范，后续拿到 PRD 或需求描述时可以直接拼装可交互原型。

## What Is Included

- `packages/components`: 本地定制的后台组件封装，基于 Arco Design Vue。
- `apps/playground`: 可交互后台原型示例，用来展示组件组合效果。
- `apps/docs`: 组件规范与示例文档。
- `docs/platform-admin-spec`: 页面模式、组件规则、交互状态和图表规则。
- `skills/platform-admin-prototype`: 可读的 Skill 源码。
- `dist/skills/platform-admin-prototype.skill`: 可安装的 Skill 包。

## Preview

### Dashboard

![Dashboard preview](docs/screenshots/dashboard.png)

### List Page

![List page preview](docs/screenshots/ticket-list.png)

### Create Form

![Create form preview](docs/screenshots/ticket-create.png)

### Detail Page

![Detail page preview](docs/screenshots/ticket-detail.png)

### Category Management

![Category management preview](docs/screenshots/category-management.png)

## Local Development

```bash
pnpm install
pnpm dev:playground
```

The playground runs as a Vite app. The docs site can be started separately:

```bash
pnpm dev:docs
```

## Validation

```bash
pnpm test
pnpm typecheck
pnpm build
```

The Skill source can be validated with Codex's skill validator:

```bash
python3 /path/to/skill-creator/scripts/quick_validate.py skills/platform-admin-prototype
```

## Skill Usage

Use this Skill when the input is a PC backend/admin PRD, product requirement, workflow description, or screenshot-derived requirement. It is intended for:

- dashboards and workbenches
- list pages with filters, tables, pagination, row actions, and bulk actions
- create/edit forms and form modals
- detail pages and detail drawers
- settings, category/tree management, people/role management
- modal, drawer, upload, switch, result, steps, status, and feedback interactions
- chart modules when the PRD explicitly includes chart or data visualization needs

The Skill should not be used for mobile apps, dark mode, marketing pages, landing pages, mini-programs, or C-end consumer pages.

## Component Preference

The local component rules are the source of truth. Do not default to copying official component website examples when generating prototypes. The Skill and component docs preserve the custom preferences already captured in this repository, including:

- real backend workflows instead of one-page component showcases
- sidebar only for first-level business pages
- secondary create/detail/edit pages triggered by buttons or table rows
- concise top breadcrumb
- left-aligned filters and table actions
- compact table status and priority presentation
- left-aligned modal titles with 20px horizontal padding
- gray upload button with empty default file list
- centered small switch knobs

## License

MIT
