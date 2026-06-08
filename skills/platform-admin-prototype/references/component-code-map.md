# Component Code Map

Use this file to find the local component implementation and the bundled snapshot.

## Repository Checkout

When a repository checkout is available, locate its root by finding `pnpm-workspace.yaml`, then use these repository-relative paths:

- Prototype target: `apps/playground`
- Component package: `packages/components`
- Token package: `packages/tokens`
- Registry package: `packages/registry`

## Bundled Snapshot

If the live project is unavailable, use the bundled code snapshot:

- `assets/component-source/packages/components/src/index.ts`
- `assets/component-source/packages/components/src/styles.css`
- `assets/component-source/packages/components/src/atoms/`
- `assets/component-source/packages/components/src/molecules/`
- `assets/component-source/packages/components/src/organisms/`
- `assets/component-source/packages/tokens/src/`
- `assets/component-source/packages/registry/src/`

The snapshot is for reference and bootstrapping. If a repository checkout exists, edit repository files rather than editing the snapshot.

## Main Imports

Use `@platform/components` before raw Arco components:

```ts
import {
  PlatformActionLinkGroup,
  PlatformBreadcrumb,
  PlatformButton,
  PlatformDataTable,
  PlatformDatePicker,
  PlatformDetailDrawerTemplate,
  PlatformDetailPageTemplate,
  PlatformDetailSummary,
  PlatformDrawer,
  PlatformFilterPanel,
  PlatformFormCard,
  PlatformFormItem,
  PlatformFormModalTemplate,
  PlatformInput,
  PlatformModal,
  PlatformPageHeader,
  PlatformPagination,
  PlatformResult,
  PlatformSelect,
  PlatformSteps,
  PlatformSwitch,
  PlatformTableCard,
  PlatformTableSortCell,
  PlatformTag,
  PlatformTextarea,
  PlatformUpload
} from '@platform/components';
```

When the platform package does not expose the required icon, import the official Arco Icon directly:

```ts
import { IconSearch } from '@arco-design/web-vue/es/icon';
```

Do not use Emoji, Unicode symbols, text characters, improvised SVG/CSS drawings, or unknown image assets as UI icon substitutes. See `icon-rules.md`.

## Composition Entrypoints

- Filters: `PlatformFilterPanel`
- Tables: `PlatformTableCard` + `PlatformDataTable` + `PlatformPagination`
- Forms: `PlatformFormCard` + `PlatformFormItem` + platform form controls. Center page-level form cards with a page-specific `max-width: 960px; margin-inline: auto` class; do not globally center `.platform-form-card`.
- Details: `PlatformDetailPageTemplate` + `PlatformDetailSummary` + `PlatformSteps`
- Modals: `PlatformModal` or `PlatformFormModalTemplate`
- Drawers: `PlatformDrawer` or `PlatformDetailDrawerTemplate`
- Feedback: `PlatformResult`, `showPlatformMessage`, `PlatformTimeline`

## Generated Prototype Rule

When a PRD is provided, generate or update real Vue pages in the prototype target. Replace labels, fields, columns, sample data, actions, and flow states from the PRD. Keep the component structure and interaction rules from this skill.
