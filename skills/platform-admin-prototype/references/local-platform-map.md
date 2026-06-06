# Local Platform Map

Use this reference when the skill needs exact file locations. Prefer bundled references first, then live local files.

## Bundled Skill Files

Skill root:

The directory containing this `SKILL.md`.

Bundled references:

- `references/source-of-truth.md`
- `references/prd-to-prototype-workflow.md`
- `references/component-catalog.md`
- `references/page-patterns.md`
- `references/composition-patterns.md`
- `references/interaction-states.md`
- `references/visual-rules.md`
- `references/chart-rules.md`
- `references/usage-examples.md`
- `references/component-code-map.md`

Bundled component source snapshot:

- `assets/component-source/packages/components/src/index.ts`
- `assets/component-source/packages/components/src/styles.css`
- `assets/component-source/packages/components/src/atoms/`
- `assets/component-source/packages/components/src/molecules/`
- `assets/component-source/packages/components/src/organisms/`
- `assets/component-source/packages/tokens/src/`
- `assets/component-source/packages/registry/src/`

## Repository Checkout

Locate the repository root by finding `pnpm-workspace.yaml`. All paths below are relative to that root.

## Component Specs

`docs/platform-admin-spec/`

- `prd-to-prototype-workflow.md`
- `component-catalog.md`
- `page-patterns.md`
- `composition-patterns.md`
- `interaction-states.md`
- `visual-rules.md`
- `chart-rules.md`
- `usage-examples.md`

## Component Entrypoints

- `packages/components/src/index.ts`
- `packages/components/src/styles.css`
- `packages/components/src/organisms/PlatformAdminCompositions.ts`
- `packages/components/src/organisms/PlatformPageTemplates.ts`
- `packages/components/src/organisms/PlatformFeedback.ts`
- `packages/components/src/organisms/PlatformDataTable.ts`
- `packages/components/src/organisms/PlatformBreadcrumb.ts`
- `packages/components/src/organisms/PlatformPageHeader.ts`

## Default Prototype Target

Use the existing Vue playground under `apps/playground`.

The prototype should stay interactive and should use `@platform/components` before raw Arco components.

Do not copy the existing ticket/work-order playground page data into this skill as a business template. It was an implementation sample, not the reusable PRD content source.
