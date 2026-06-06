---
name: platform-admin-prototype
description: Use when the user provides a PRD, requirements, screenshots, product notes, or document content and asks for an interactive PC backend/admin/B-end prototype, including management-console dashboards, charts, lists, filters, tables, forms, detail pages, secondary pages, modals, drawers, settings, workflows, or upload/switch/table interactions.
---

# Platform Admin Prototype

## Core Rule

Generate interactive PC backend/admin prototypes from the local customized platform component system. Do not use the Arco website as the primary design source. The bundled references and `@platform/components` implementation are the source of truth.

## Scope

Use this skill only for PC backend, B-end, admin, management-console, dashboard, list, form, detail, settings, modal, drawer, and workflow prototypes.

Do not use it for mobile, dark mode, marketing pages, landing pages, consumer frontends, mini-programs, or pure documentation deliverables.

## References To Load

Read only what is needed:

- `references/source-of-truth.md`: source priority and user-approved preferences.
- `references/prd-to-prototype-workflow.md`: PRD extraction and prototype workflow.
- `references/component-catalog.md`: available components and use cases.
- `references/page-patterns.md`: backend page architecture.
- `references/composition-patterns.md`: filter, table, form, detail, modal, drawer composition.
- `references/interaction-states.md`: required interactivity and states.
- `references/visual-rules.md`: layout, topbar, spacing, table, upload, and detail rules.
- `references/chart-rules.md`: load only when the PRD explicitly includes chart, trend, distribution, ranking, metric visualization, or dashboard visualization requirements.
- `references/usage-examples.md`: minimal Vue examples.
- `references/component-code-map.md`: local implementation entrypoints and bundled source snapshot.

## Implementation Stack

Default to the existing component platform:

- Vue 3
- Arco Design Vue as the lower-level dependency
- `@platform/components` as the actual component source
- `apps/playground` in a `platform-admin-prototype` repository checkout as the default prototype target

Prefer local wrappers and composition components over raw Arco components. Use raw Arco only when the platform package has no wrapper for a required behavior, and keep the visual result consistent with the local specs.

## Workflow

1. Extract from the PRD or input: pages, fields, tables, filters, actions, states, permissions, flows, modals, drawers, and required feedback.
2. Separate primary navigation pages from secondary pages. Button-triggered create/edit/detail pages are secondary pages and must not be added to the sidebar.
3. Pick page patterns from the local docs: dashboard, list, form, detail, settings, tree management, people/permission management, modal, drawer, or result feedback.
4. If the input includes charts or data visualization, load `references/chart-rules.md` and use ECharts examples only for chart pattern selection.
5. Compose with local components first: `PlatformFilterPanel`, `PlatformTableCard`, `PlatformFormCard`, `PlatformDetailSummary`, `PlatformDataTable`, `PlatformPagination`, `PlatformModal`, `PlatformDrawer`, `PlatformResult`, and `PlatformSteps`.
6. Implement real interactions: navigation, input echo, filter/reset feedback, row selection, bulk actions, sortable time columns, pagination, modal/drawer open-close, upload states, switch states, and form submit/cancel.
7. Verify in the browser unless the user explicitly says not to verify.

## Non-Negotiable Preferences

- Build a real backend workflow, not a one-page component showcase.
- Keep card gaps consistent, usually 16px, and avoid nested cards.
- Do not duplicate page titles or helper text in extra title cards.
- Topbar uses concise breadcrumbs and right-side search/notification/user affordances.
- Breadcrumbs omit unnecessary system names and show secondary pages only when appropriate.
- Create/detail/edit pages triggered by buttons or table rows are secondary pages; keep the parent sidebar item highlighted.
- Filters are left aligned; search and reset align with the filter row and keep consistent spacing.
- Filter selects default to “全部...” options.
- Table-level actions belong on the table card heading right side.
- Bulk actions show only after row selection, next to selected count.
- Date/time table sorting defaults to unselected and toggles on click.
- Detail status uses colored dot plus text; priority uses compact tag.
- Detail page header has no unnecessary back arrow; if actions wrap to a new line, add 12px vertical gap.
- Modal titles are left aligned with 20px horizontal padding; modals are centered.
- Upload defaults to no files and uses a gray upload button with clickable and disabled states.
- Small switches must have a vertically centered knob.

## Source Priority

Use this order when there is ambiguity:

1. This skill's bundled references.
2. A checked-out `platform-admin-prototype` repository if present locally.
3. This skill's bundled `assets/component-source` snapshot.
4. ECharts examples only when `chart-rules.md` says the PRD has a real chart/data-visualization need; use them for chart pattern selection, never to override local page/component styling.
5. Arco documentation only for low-level API troubleshooting, never to override local visual or interaction rules.

## Fallbacks

If the input is not clearly a PC backend/admin request, ask a short clarification before using this skill.

If business data is missing but the page structure is clear, make conservative sample data and state the assumption in the final response.

If local docs and local code disagree, prefer local code plus `visual-rules.md`; do not override user-approved customizations with official Arco examples.
